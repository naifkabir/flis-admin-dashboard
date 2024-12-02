import axios from "axios";

export const baseURL = "http://localhost:1250/api/v1";

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default apiClient;
