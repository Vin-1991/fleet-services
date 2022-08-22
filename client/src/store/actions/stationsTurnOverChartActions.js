import { getStationsTurnOverChartData } from "../../api/Dashboard";
import { STATIONS_TURNOVER_CHART_DATA_ACTIONS } from "../actionTypes/stationsTurnOverChartActionTypes";

export function dataLoading() {
  return {
    type: STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchStationsTurnOverChartDataAction() {
  return (dispatch) => {
    dispatch(dataLoading());
    getStationsTurnOverChartData()
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
