import { Alert, Button, Container, Snackbar } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserList, UserModal } from "src/components";
import { routes } from "src/constants/routes";
import { GlobalContext } from "src/context";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "src/helpers/api";

export default function AdminDashboard() {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [search, setSearch] = useState("");

  const [action, setAction] = useState("");

  const navigate = useNavigate();
  const { globalState } = useContext(GlobalContext);

  useEffect(() => {
    if (!globalState.isLoggedIn) {
      navigate(routes.USER_LOGIN, {
        replace: true,
      });
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

  const getUsers = async () => {
    try {
      const res = await getRequest(
        "/user?_page=0&_limit=15&_sort=name&_order=asc&q=" + search
      );
      const isError = !res.length;

      setSnackbarState({
        open: true,
        message: !isError
          ? "User fetched successfully"
          : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        setUsers(res);
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteRequest("/user/" + id);
      const isError = !res;

      setSnackbarState({
        open: true,
        message: !isError
          ? "User Deleted successfully"
          : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        const currentUsers = [...users];
        const newUsers = currentUsers.filter((user) => user.id !== id);
        setUsers(newUsers);
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  const handleUpdateUser = async (newDetails) => {
    try {
      const res = await putRequest(
        "/user/" + newDetails.id,
        newDetails,
        globalState?.admin?.token
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
        setUserDetails({
          email: "",
          name: "",
          password: "",
        });
        getUsers();
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  const handleAddUser = async (userDetails) => {
    try {
      const res = await postRequest(
        "/user/",
        userDetails,
        globalState?.admin?.token
      );
      const isError = !res;

      setSnackbarState({
        open: true,
        message: !isError ? "User Added successfully" : "Something went wrong",
        severity: isError ? "error" : "success",
      });
      if (!isError) {
        setOpen(false);
        setUserDetails({
          email: "",
          name: "",
          password: "",
        });
        getUsers();
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  const handleUpdateClick = (user) => {
    setAction("update");
    setUserDetails(user);
    setOpen(true);
  };

  const handleModalClose = () => {
    setAction("");
    setOpen(false);
    setUserDetails({
      email: "",
      name: "",
      password: "",
    });
  };

  const handleAddClick = () => {
    setAction("add");
    setOpen(true);
  };

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <>
      <Container>
        <div style={styles.div}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleAddClick}
          >
            Add User
          </Button>
          <div>
            <input
              placeholder="Search"
              name="Search"
              onChange={handleSearchChange}
              type="text"
              value={search}
              style={styles.search}
            />
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={() => getUsers()}
            >
              Search
            </Button>
          </div>
        </div>
        <UserList
          users={users}
          handleDelete={handleDelete}
          handleUpdateClick={handleUpdateClick}
        />
      </Container>
      <UserModal
        open={open}
        handleClose={handleModalClose}
        user={userDetails}
        handleSubmit={action === "add" ? handleAddUser : handleUpdateUser}
        title={action === "add" ? "Add user" : "Update User"}
        btnTitle={action === "add" ? "Add" : "Update"}
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
  div: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    padding: 5,
    marginRight: "1rem",
  },
};
