import { combineReducers } from "redux";
import uploadedFileData from "./uploadFileReducer";
import snackBar from "./snackBarReducer";
import downloadFileData from "./downloadFileReducer";
import processedData from "./cleanedDataReducer";
import dataSetList from "./dataSetListReducer";
import popularStationsChartData from "./popularStationChartDataReducer";
import stationsTurnOverChartData from "./stationsTurnOverChartReducer";
import distributionBikeRentalDurationChartData from "./distributionBikeRentalDurationChartReducer";
import stationsMapOverChartData from "./stationsMapChartDataReducer";
import stationsDistanceChartData from "./stationsDistanceChartDataReducer";

const rootReducer = combineReducers({
  uploadedFileData,
  snackBar,
  downloadFileData,
  processedData,
  dataSetList,
  popularStationsChartData,
  stationsTurnOverChartData,
  distributionBikeRentalDurationChartData,
  stationsMapOverChartData,
  stationsDistanceChartData,
});

export default rootReducer;
