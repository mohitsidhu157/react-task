import { Typography, Link, Snackbar, Alert } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { globalActions, GlobalContext } from "src/context";

import { UserDetailsForm } from "src/components";
import { postRequest } from "src/helpers/api";
import { routes } from "src/constants/routes";

const UserSignup = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { globalDispatch } = useContext(GlobalContext);

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
      const res = await postRequest("/user", values);

      const isError = !res.id;
      setSnackbarState({
        open: true,
        message: isError ? "User created successfully" : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        navigate(routes.USER_DASHBOARD);
        globalDispatch({
          type: globalActions.SET_USER,
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
        title="User Sign up"
        btnTitle="Sign up"
        handleSubmit={handleSubmit}
        renderFooter={() => (
          <Typography color="textSecondary" variant="body1">
            Already Have an account?{" "}
            <Link component={RouterLink} to={routes.USER_LOGIN} variant="h6">
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

export default UserSignup;
