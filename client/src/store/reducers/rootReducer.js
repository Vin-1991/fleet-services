import { combineReducers } from "redux";
import uploadedFileData from "./uploadFileReducer";
import snackBar from "./snackBarReducer";
import downloadFileData from "./downloadFileReducer";
import processedData from "./cleanedDataReducer";

const rootReducer = combineReducers({
  uploadedFileData,
  snackBar,
  downloadFileData,
  processedData,
});

export default rootReducer;
