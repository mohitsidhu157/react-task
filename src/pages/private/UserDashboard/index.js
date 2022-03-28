import { Alert, Button, Container, Snackbar } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModal } from "src/components";
import { routes } from "src/constants/routes";
import { GlobalContext } from "src/context";
import { putRequest } from "src/helpers/api";
import { SET_USER } from "src/context/actions";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!globalState.isLoggedIn) {
      navigate(routes.USER_LOGIN, {
        replace: true,
      });
    }
  }, [globalState.isLoggedIn]);

  const user = globalState.user;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const handleUpdateClick = (user) => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleUpdateUser = async (newDetails) => {
    try {
      const res = await putRequest(
        "/user/" + newDetails.id,
        newDetails,
        user?.token
      );
      const isError = !res;

      setSnackbarState({
        open: true,
        message: !isError
          ? "User Updated successfully"
          : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        setOpen(false);
        globalDispatch({
          type: SET_USER,
          payload: newDetails,
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
      <Container>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={handleUpdateClick}
        >
          Edit User
        </Button>
        <div style={styles.container}>
          <div>
            <strong>ID:</strong> {user.id}
          </div>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
      </Container>
      <UserModal
        open={open}
        handleClose={handleModalClose}
        user={user}
        handleSubmit={handleUpdateUser}
        title={"Update User"}
        btnTitle={"Update"}
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
}

const styles = {
  container: {
    marginTop: "1rem",
    fontSize: "20px",
    textAlign: "center",
  },
};
