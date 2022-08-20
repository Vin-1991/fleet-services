import ThunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { middleware as fetchMiddleware } from "react-redux-fetch";
import rootReducer from "./reducers/rootReducer";

const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [fetchMiddleware, ThunkMiddleware];
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
