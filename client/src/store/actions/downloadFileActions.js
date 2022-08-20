import { fleetServicesDownloadFile } from "../../api/DataAcquisition";
import { DOWNLOAD_FILE_ACTIONS } from "../actionTypes/downloadFileActionTypes";

export function dataLoading() {
  return {
    type: DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function dataReset() {
  return {
    type: DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_RESET,
  };
}

export function fleetServicesDownloadFileAction(file) {
  return (dispatch) => {
    dispatch(dataLoading());
    fleetServicesDownloadFile(file)
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch(() => {
        dispatch(dataNotLoaded());
      });
  };
}

export function fleetServicesDownloadFileActionReset() {
  return (dispatch) => {
    dispatch(dataReset());
  };
}
