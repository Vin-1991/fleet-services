import { DOWNLOAD_FILE_ACTIONS } from "../actionTypes/downloadFileActionTypes";

let defaultState = {
  pending: false,
  successful: false,
  rejected: false,
  data: [],
};

const DownloadFileAction = (state = defaultState, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_ON_HOLD:
      return {
        ...state,
        successful: false,
        rejected: false,
        data: [],
        pending: action.payload.pending,
      };

    case DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_FAILED:
      return {
        ...state,
        pending: false,
        successful: false,
        data: [],
        rejected: action.payload.rejected,
      };

    case DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        pending: false,
        rejected: false,
        data: action.payload.data,
        successful: action.payload.successful,
      };

    case DOWNLOAD_FILE_ACTIONS.DOWNLOAD_FILE_RESET:
      return {
        ...defaultState,
      };

    default:
      return { ...state };
  }
};

export default DownloadFileAction;
