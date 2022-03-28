import * as React from "react";
import Modal from "@mui/material/Modal";
import UserDetailsForm from "../UserDetailsForm";

export default function UserModal({
  open,
  handleClose,
  handleSubmit = () => {},
  user = {},
  title = "",
  btnTitle = "",
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={styles.div}>
          <UserDetailsForm
            title={title}
            btnTitle={btnTitle}
            handleSubmit={handleSubmit}
            values={user}
          />
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  div: {
    width: "80%",
    padding: "2rem",
    margin: "auto",
    background: "#fff",
    marginTop: "2rem",
  },
};
