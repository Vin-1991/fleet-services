import * as actionTypes from '../actions/types';

const initialState = [];

const detailedDataReducer = (detailedData = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_DETAILED_DATA:
      return payload.data;

    default:
      return detailedData;
  }
};

export default detailedDataReducer;
