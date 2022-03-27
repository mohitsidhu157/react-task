import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { globalActions, GlobalContext } from "src/context";
import { routes } from "src/constants/routes";

export default function Header() {
  const { globalDispatch, globalState } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    globalDispatch({
      type: globalActions.LOGOUT,
    });
    navigate(routes.USER_LOGIN);
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Box sx={styles.container}>
          <h1>UMS</h1>
          {globalState.isLoggedIn ? (
            <Box sx={{ py: 2, my: 1 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <ul style={styles.ul}>
              <li style={styles.li}>
                <Link to={routes.USER_LOGIN}>User</Link>
              </li>
              <li style={styles.li}>
                <Link to={routes.ADMIN_LOGIN}>Admin</Link>
              </li>
            </ul>
          )}
        </Box>
      </Container>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  ul: {
    listStyleType: "none",
  },
  li: {
    display: "inline-block",
    marginLeft: "1rem",
    marginTop: "1rem",
  },
  a: {},
};
