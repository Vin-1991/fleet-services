import { SNACKBAR_ACTIONS } from "../actionTypes/snackBarActionTypes";

const FetchSnackbar = (state = {}, action) => {
  switch (action.type) {
    case SNACKBAR_ACTIONS.SHOW_SNACKBAR:
      const { message, severity } = action.payload || {};
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: message,
        severity,
      };
    case SNACKBAR_ACTIONS.CLEAR_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return { ...state };
  }
};

export default FetchSnackbar;
