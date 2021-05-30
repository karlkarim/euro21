/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
axios.defaults.baseURL = "https://app.yawe.dev/api/1/ce/soccer";
axios.defaults.params = { key: "1196a6ce29f64d32a2db32b88b8004f8" };

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error("Logging the error", error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
