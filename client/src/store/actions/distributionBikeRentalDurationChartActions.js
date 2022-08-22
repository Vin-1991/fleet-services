import { getDistributionBikeRentalDurationChartData } from "../../api/Dashboard";
import { RENTAL_DISTRIBUTION_DURATION_CHART_DATA_ACTIONS } from "../actionTypes/distributionBikeRentalDurationChartActionTypes";

export function dataLoading() {
  return {
    type: RENTAL_DISTRIBUTION_DURATION_CHART_DATA_ACTIONS.RENTAL_DISTRIBUTION_DURATION_CHART_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: RENTAL_DISTRIBUTION_DURATION_CHART_DATA_ACTIONS.RENTAL_DISTRIBUTION_DURATION_CHART_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: RENTAL_DISTRIBUTION_DURATION_CHART_DATA_ACTIONS.RENTAL_DISTRIBUTION_DURATION_CHART_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchDistributionBikeRentalDurationChartDataAction() {
  return (dispatch) => {
    dispatch(dataLoading());
    getDistributionBikeRentalDurationChartData()
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
