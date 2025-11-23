import axios, { AxiosInstance } from "axios";

//Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

// Set base URL from env
if (import.meta.env.VITE_API_URL) {
  // console.log("Base URL from env:", import.meta.env.VITE_API_URL);
  api.defaults.baseURL = import.meta.env.VITE_API_URL;
} else {
  // console.error("VITE_API_URL is not defined from .env");
}

// Set withCredentials to true
api.defaults.withCredentials = true;