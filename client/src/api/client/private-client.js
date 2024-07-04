import axios from "axios";
import queryString from "query-string";
const baseURL = "http://localhost:5000/api/v1/";
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
//manipulate outgoing request configurations before they are sent
privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});
// modify responses or handle errors globally for all requests, 1st callback(onFullfilled) if response have status code 2xx,
// 2nd callback (onRejected) if response with status code outside range 2xx
privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);
export default privateClient;
