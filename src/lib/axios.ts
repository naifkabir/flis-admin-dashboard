import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:1250/api/v1",
  withCredentials: true,
});

export default apiClient;
