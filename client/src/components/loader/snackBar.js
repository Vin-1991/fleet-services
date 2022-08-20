import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@mui/material";
import { clearSnackbar } from "../../store/actions/snackBarActions";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbars = () => {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen, severity } = useSelector(
    (state) => state.lrpSnackbar || {}
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={snackbarOpen}
      autoHideDuration={7000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {snackbarMessage
          ? snackbarMessage.split("<br/>").map((elem) => {
              return (
                <p key={elem} style={{ margin: 0 }}>
                  {elem}
                </p>
              );
            })
          : ""}
      </Alert>
    </Snackbar>
  );
};

export default Snackbars;
