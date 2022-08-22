import { getPopularStationsChartData } from "../../api/Dashboard";
import { POPUALR_STATIONS_CHART_DATA_ACTIONS } from "../actionTypes/popularStationsChartActionTypes";

export function dataLoading() {
  return {
    type: POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchPopularStationsChartDataAction() {
  return (dispatch) => {
    dispatch(dataLoading());
    getPopularStationsChartData()
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
