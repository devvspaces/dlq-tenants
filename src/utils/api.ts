import axios from "axios";
import Auth from "./auth";

export const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    if (Auth.isAuthenticated()) {
      config.headers["x-api-key"] = `${Auth.getToken()}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      // Token is invalid or expired, redirect to login page
      Auth.logOut();
    }
    return Promise.reject(error);
  }
);

export default Api;
