import axios from "axios";

export const baseURL = "https://flis-backend-prod.onrender.com/api/v1";

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default apiClient;
