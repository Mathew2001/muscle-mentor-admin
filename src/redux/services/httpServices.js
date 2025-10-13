import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const response = (res) => res.data;

const requests = {
  get: (url, body, headers) => instance.get(url, body, headers).then(response),
  post: (url, body) => instance.post(url, body).then(response),
  put: (url, body, headers) => instance.put(url, body, headers).then(response),
  patch: (url, body) => instance.patch(url, body).then(response),
  delete: (url) => instance.delete(url).then(response),
};
export default  requests;
