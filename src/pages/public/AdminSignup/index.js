import { Typography, Link, Snackbar, Alert } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { globalActions, GlobalContext } from "src/context";

import { UserDetailsForm } from "src/components";
import { postRequest } from "src/helpers/api";
import { routes } from "src/constants/routes";

const AdminSignup = () => {
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
      const res = await postRequest("/admin", values);

      const isError = !res.id;
      setSnackbarState({
        open: true,
        message: isError
          ? "Admin created successfully"
          : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        navigate(routes.ADMIN_DASHBOARD);
        globalDispatch({
          type: globalActions.SET_ADMIN,
          payload: res,
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
      <UserDetailsForm
        title="Admin Sign up"
        btnTitle="Sign up"
        handleSubmit={handleSubmit}
        renderFooter={() => (
          <Typography color="textSecondary" variant="body1">
            Already Have an account?{" "}
            <Link component={RouterLink} to={routes.ADMIN_LOGIN} variant="h6">
              Login
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

export default AdminSignup;
