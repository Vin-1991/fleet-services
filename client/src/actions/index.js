import * as actionTypes from './types';
import axios from 'axios';

const token = 'Bearer randomToken1212';
const client = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export const getCalendarsData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_CALENDARS_DATA,
      payload: await client.get('calendars'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCampaignMatrixData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_CAMPAIGN_MATRIX,
      payload: await client.get('campaign-matrix'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCalendarRefData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_REF_CALENDARS_DATA,
      payload: await client.get('reference-calendars'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRefCalendarsData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_REF_CALENDARS_DATA,
      payload: await client.get('reference-calendars'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_PRODUCTS,
      payload: await client.get('products'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailedData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_DETAILED_DATA,
      payload: await client.get('detailed-table'),
    });
  } catch (err) {
    console.log(err);
  }
};
