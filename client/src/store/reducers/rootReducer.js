import { combineReducers } from "redux";
import uploadedFileData from "./uploadFileReducer";
import snackBar from "./snackBarReducer";
import downloadFileData from "./downloadFileReducer";
import processedData from "./cleanedDataReducer";
import dataSetList from "./dataSetListReducer";
import popularStationsChartData from "./popularStationChartDataReducer";
import stationsTurnOverChartData from "./stationsTurnOverChartReducer";
import distributionBikeRentalDurationChartData from "./distributionBikeRentalDurationChartReducer";

const rootReducer = combineReducers({
  uploadedFileData,
  snackBar,
  downloadFileData,
  processedData,
  dataSetList,
  popularStationsChartData,
  stationsTurnOverChartData,
  distributionBikeRentalDurationChartData,
});

export default rootReducer;
