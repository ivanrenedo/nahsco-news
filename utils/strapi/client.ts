import axios from "axios";

const baseURL = "https://146.190.33.138:1337";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: `${baseURL}/api`
});

export {
  baseURL,
  apiClient
};