import axios from "axios";

const get = (url, headers) => {
  return axios.get(url, {
    headers: {
      ...headers,
    },
  });
};

const post = (url, data = {}, headers = {}) => {
  return axios.post(url, data, {
    headers: {
      ...headers,
    },
  });
};

const put = (url, data = {}, headers = {}) => {
  return axios.put(url, data, {
    headers: {
      ...headers,
    },
  });
};

const patch = (url, data = {}, headers = {}) => {
  return axios.patch(url, data, {
    headers: {
      ...headers,
    },
  });
};

export const httpMethods = { get, post, put, patch };
