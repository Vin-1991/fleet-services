import { combineReducers } from "redux";
import uploadedFileData from "./uploadFileReducer";
import snackBar from "./snackBarReducer";
import downloadFileData from "./downloadFileReducer";
import processedData from "./cleanedDataReducer";
import dataSetList from "./dataSetListReducer";

const rootReducer = combineReducers({
  uploadedFileData,
  snackBar,
  downloadFileData,
  processedData,
  dataSetList,
});

export default rootReducer;
