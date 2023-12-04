import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

import { getToken, serverUrl } from "./tools";

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.token = getToken();
    nProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    nProgress.done();
    return Promise.reject(error);
  }
);

export const get = (url: string, params = {}) =>
  instance.get(url, { params }).then((res) => res.data);

export const post = (url: string, data = {}) =>
  instance.post(url, data).then((res) => res.data);

export const put = (url: string, data = {}) =>
  instance.put(url, data).then((res) => res.data);

export const del = (url: string) =>
  instance.delete(url).then((res) => res.data);
