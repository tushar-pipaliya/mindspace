import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { registerSnackbar } from "../../utils/snackbarService";

const CommonSnackbar = () => {
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });

  useEffect(() => {
    registerSnackbar((data) => {
      setState({
        open: true,
        message: data.message,
        severity: data.severity,
        vertical: data.vertical,
        horizontal: data.horizontal,
      });
    });
  }, []);

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: state.vertical,
        horizontal: state.horizontal,
      }}
    >
      <Alert severity={state.severity} variant="filled" onClose={handleClose}>
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
