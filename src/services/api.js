import axios from "axios";
import { APP_API_URL, APP_LOGIN_URL } from "../constants";

export const createAxios = (iniBaseUrl = "") => {
  return axios.create({
    baseURL: iniBaseUrl,
  });
};

const client = createAxios();

const parseUrl = (url) => {
  let result = url.startsWith("/") ? url : `/${url}`;

  if (url.startsWith("/auth")) {
    return `${APP_LOGIN_URL}${result}`;
  }

  return `${APP_API_URL}${result}`;
};

const api = {
  get: (url, config) => client.get(parseUrl(url), config),
  post: (url, data, config) => client.post(parseUrl(url), data, config),
  put: (url, data, config) => client.put(parseUrl(url), data, config),
  delete: (url, config) => client.delete(parseUrl(url), config),
  axios: client,
};

export default api;
