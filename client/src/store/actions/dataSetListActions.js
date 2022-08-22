import { getDataSetList } from "../../api/DataAcquisition";
import { DATA_ACTIONS } from "../actionTypes/dataSetListActionTypes";

export function dataLoading() {
  return {
    type: DATA_ACTIONS.DATA_FETCH_ON_HOLD,
    payload: {
      pending: true,
    },
  };
}

export function dataLoaded(data) {
  return {
    type: DATA_ACTIONS.DATA_FETCH_SUCCESS,
    payload: {
      successful: true,
      data: data,
    },
  };
}

export function dataNotLoaded() {
  return {
    type: DATA_ACTIONS.DATA_FETCH_FAILED,
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
