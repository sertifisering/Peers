import axios from "axios";

// Create an Axios instance with default configurations
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  // Do not include credentials such as cookies in requests
  withCredentials: false,
});
