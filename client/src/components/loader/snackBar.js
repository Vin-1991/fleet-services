import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@mui/material/";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { clearSnackbar } from "../../store/actions/index";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LRPSnackbar() {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen, severity } = useSelector(
    (state) => state.snackBar || {}
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
      autoHideDuration={3000}
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
                <p key={elem} sx={{ margin: 0 }}>
                  {elem}
                </p>
              );
            })
          : ""}
      </Alert>
    </Snackbar>
  );
}
