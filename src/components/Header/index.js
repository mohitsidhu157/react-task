import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Header() {
  return (
    <Box sx={styles.container}>
      <h1>UMS</h1>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/user/signup">User</Link>
        </li>
        <li style={styles.li}>
          <Link to="/admin/signup">Admin</Link>
        </li>
      </ul>
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
  },
  a: {},
};
