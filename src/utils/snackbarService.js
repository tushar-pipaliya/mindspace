let snackbarHandler = null;

export const registerSnackbar = (handler) => {
  snackbarHandler = handler;
};

export const showSnackbar = ({
  message,
  severity = "success",
  vertical = "top",
  horizontal = "right",
}) => {
  if (snackbarHandler) {
    snackbarHandler({
      message,
      severity,
      vertical,
      horizontal,
    });
  }
};
