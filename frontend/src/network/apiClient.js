import axios from "axios";
import { useGlobalContext } from "../context";

const axiosClient = (options = {}) => {
  const { headers = {} } = options;
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export default axiosClient;
