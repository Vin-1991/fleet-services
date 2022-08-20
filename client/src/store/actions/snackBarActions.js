import { SNACKBAR_ACTIONS } from "../actionTypes/snackBarActionTypes";

function showSnackbar_(data) {
  return {
    type: SNACKBAR_ACTIONS.SHOW_SNACKBAR,
    payload: data,
  };
}

function clearSnackbar_() {
  return {
    type: SNACKBAR_ACTIONS.CLEAR_SNACKBAR,
    payload: {},
  };
}

export function showSnackbar(data) {
  return (disptach) => {
    disptach(showSnackbar_(data));
  };
}

export function clearSnackbar() {
  return (disptach) => {
    disptach(clearSnackbar_());
  };
}
