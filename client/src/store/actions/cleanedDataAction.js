import { getFleetServicesProcessedData } from "../../api/DataAcquisition";
import { PROCESSED_DATA_ACTIONS } from "../actionTypes/cleanedDataActionTypes";

export function dataLoading() {
  return {
    type: PROCESSED_DATA_ACTIONS.PROCESSED_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: PROCESSED_DATA_ACTIONS.PROCESSED_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: PROCESSED_DATA_ACTIONS.PROCESSED_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchFleetServicesProcessedDataAction(queryDatasetName) {
  return (dispatch) => {
    dispatch(dataLoading());
    getFleetServicesProcessedData(queryDatasetName)
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
