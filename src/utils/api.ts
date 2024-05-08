import axios from "axios";
import Auth from "./auth";

export const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Api = axios.create({
  baseURL: base_url,
});

Api.interceptors.request.use(
  (config) => {
    if (Auth.isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error)
);

export default Api;
