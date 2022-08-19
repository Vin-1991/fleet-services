import { combineReducers } from 'redux';
import allCalendarsReducer from './allCalendarsReducer';
import campaignMatrixReducer from './campaignMatrixReducer';
import detailedDataReducer from './detailedDataReducer';
import calendarRefDataReducer from './calendarRefReducer';

const reducer = combineReducers({
  calendars: allCalendarsReducer,
  campaignMatrix: campaignMatrixReducer,
  detailedData: detailedDataReducer,
  calendarRefData: calendarRefDataReducer,
});

export default reducer;
