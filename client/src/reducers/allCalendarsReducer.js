import * as actionTypes from '../actions/types';

const initialState = [];

const allCalendarsReducer = (calendars = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CALENDARS_DATA:
      return payload.data;

    default:
      return calendars;
  }
};

export default allCalendarsReducer;
