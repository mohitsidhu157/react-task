import { Typography, Link, Snackbar, Alert } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { globalActions, GlobalContext } from "src/context";

import { LoginForm } from "src/components";
import { getRequest } from "src/helpers/api";
import { routes } from "src/constants/routes";

const UserLogin = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { globalDispatch, globalState } = useContext(GlobalContext);

  useEffect(() => {
    if (!!globalState.isLoggedIn) {
      if (Object.keys(globalState.user).length) {
        navigate(routes.USER_DASHBOARD, {
          replace: true,
        });
      } else {
        navigate(routes.ADMIN_DASHBOARD, {
          replace: true,
        });
      }
    }
  }, [globalState.isLoggedIn]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await getRequest("/userLogin");
      const isError = res.status !== 200;
      setSnackbarState({
        open: true,
        message: isError ? "User Login successfully" : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        navigate(routes.USER_DASHBOARD);
        globalDispatch({
          type: globalActions.SET_USER,
          payload: res.data,
        });
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      <LoginForm
        title="User Login"
        btnTitle="Login"
        handleSubmit={handleSubmit}
        renderFooter={() => (
          <Typography color="textSecondary" variant="body1">
            Don't Have an account?{" "}
            <Link component={RouterLink} to={routes.USER_SIGNUP} variant="h6">
              Sign Up
            </Link>
          </Typography>
        )}
      />
      {snackbarState.open && (
        <Snackbar
          open={snackbarState.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={snackbarState.severity}>
            {snackbarState.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default UserLogin;
