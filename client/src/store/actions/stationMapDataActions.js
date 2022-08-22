import { getStationsMapChartData } from "../../api/Dashboard";
import { STATIONS_MAP_CHART_DATA_ACTIONS } from "../actionTypes/stationsMapChartDataActionTypes";

export function dataLoading() {
  return {
    type: STATIONS_MAP_CHART_DATA_ACTIONS.STATIONS_MAP_CHART_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: STATIONS_MAP_CHART_DATA_ACTIONS.STATIONS_MAP_CHART_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: STATIONS_MAP_CHART_DATA_ACTIONS.STATIONS_MAP_CHART_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchStationsMapChartDataAction() {
  return (dispatch) => {
    dispatch(dataLoading());
    getStationsMapChartData()
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
