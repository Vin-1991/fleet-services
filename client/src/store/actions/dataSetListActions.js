import { getDataSetList } from "../../api/DataAcquisition";
import { COMMON_DATA_ACTIONS } from "../actionTypes/commonDataActionTypes";

export function dataLoading() {
  return {
    type: COMMON_DATA_ACTIONS.COMMON_DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: COMMON_DATA_ACTIONS.COMMON_DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: COMMON_DATA_ACTIONS.COMMON_DATA_FETCH_FAILED,
    payload: {
      rejected: true,
    },
  };
}

export function fetchDataSetListAction() {
  return (dispatch) => {
    dispatch(dataLoading());
    getDataSetList()
      .then((response) => {
        dispatch(dataLoaded(response.data));
      })
      .catch((ex) => {
        dispatch(dataNotLoaded());
      });
  };
}
