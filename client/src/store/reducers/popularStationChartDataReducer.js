import { POPUALR_STATIONS_CHART_DATA_ACTIONS } from "../actionTypes/popularStationsChartActionTypes";

let defaultState = {
  pending: false,
  successful: false,
  rejected: false,
  data: [],
};

const FetchPopularStationsChartData = (state = defaultState, action) => {
  switch (action.type) {
    case POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_ON_HOLD:
      return {
        ...state,
        successful: false,
        rejected: false,
        pending: action.payload.pending,
        data: [],
      };

    case POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_FAILED:
      return {
        ...state,
        pending: false,
        successful: false,
        rejected: action.payload.rejected,
        data: [],
      };

    case POPUALR_STATIONS_CHART_DATA_ACTIONS.POPUALR_STATIONS_CHART_DATA_FETCH_SUCCESS:
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

export default FetchPopularStationsChartData;
