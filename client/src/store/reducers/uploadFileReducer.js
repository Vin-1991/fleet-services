import { UPLOAD_FILE_ACTIONS } from "../actionTypes/uploadActionTypes";

let defaultState = {
  pending: false,
  successful: false,
  rejected: false,
};

const UploadFileAction = (state = defaultState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_ACTIONS.UPLOAD_FILE_ON_HOLD:
      return {
        ...state,
        successful: false,
        rejected: false,
        pending: action.payload.pending,
      };

    case UPLOAD_FILE_ACTIONS.UPLOAD_FILE_FAILED:
      return {
        ...state,
        pending: false,
        successful: false,
        rejected: action.payload.rejected,
      };

    case UPLOAD_FILE_ACTIONS.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        pending: false,
        rejected: false,
        successful: action.payload.successful,
      };

    case UPLOAD_FILE_ACTIONS.UPLOAD_FILE_RESET:
      return {
        ...defaultState,
      };

    default:
      return { ...state };
  }
};

export default UploadFileAction;
