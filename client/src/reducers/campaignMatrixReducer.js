import * as actionTypes from '../actions/types';

const initialState = [];

const campaignMatrixReducer = (campaignMatrix = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CAMPAIGN_MATRIX:
      return payload.data;

    default:
      return campaignMatrix;
  }
};

export default campaignMatrixReducer;
