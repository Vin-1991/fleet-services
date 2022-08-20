import { fleetServicesUploadFile } from "../../api/DataAcquisition";
import { UPLOAD_FILE_ACTIONS } from "../actionTypes/uploadActionTypes";

export function dataLoading() {
  return {
    type: UPLOAD_FILE_ACTIONS.UPLOAD_FILE_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded() {
  return {
    type: UPLOAD_FILE_ACTIONS.UPLOAD_FILE_SUCCESS,
    payload: {
      successful: true,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: UPLOAD_FILE_ACTIONS.UPLOAD_FILE_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function dataReset() {
  return {
    type: UPLOAD_FILE_ACTIONS.UPLOAD_FILE_RESET,
  };
}

export function fleetServicesUploadFileAction(file) {
  return (dispatch) => {
    dispatch(dataLoading());
    fleetServicesUploadFile(file)
      .then(() => {
        dispatch(dataLoaded());
      })
      .catch(() => {
        dispatch(dataNotLoaded());
      });
  };
}

export function fleetServicesUploadFileActionReset() {
  return (dispatch) => {
    dispatch(dataReset());
  };
}
