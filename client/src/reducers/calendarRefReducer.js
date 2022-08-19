import * as actionTypes from '../actions/types';

const initialState = [];

const calendarRefDataReducer = (calendarRefData = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_REF_CALENDARS_DATA:
      return payload.data;

    default:
      return calendarRefData;
  }
};

export default calendarRefDataReducer;
