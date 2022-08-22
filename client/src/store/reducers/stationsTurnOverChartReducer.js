import { STATIONS_TURNOVER_CHART_DATA_ACTIONS } from "../actionTypes/stationsTurnOverChartActionTypes";

let defaultState = {
  pending: false,
  successful: false,
  rejected: false,
  data: [],
};

const FetchStationsTurnOverChartData = (state = defaultState, action) => {
  switch (action.type) {
    case STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_ON_HOLD:
      return {
        ...state,
        successful: false,
        rejected: false,
        pending: action.payload.pending,
        data: [],
      };

    case STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_FAILED:
      return {
        ...state,
        pending: false,
        successful: false,
        rejected: action.payload.rejected,
        data: [],
      };

    case STATIONS_TURNOVER_CHART_DATA_ACTIONS.STATIONS_TURNOVER_CHART_DATA_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        rejected: false,
        successful: action.payload.successful,
        data: action.payload.data,
      };

    default:
      return { ...state };
  }
};

export default FetchStationsTurnOverChartData;
