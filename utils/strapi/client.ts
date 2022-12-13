import axios from "axios";

const baseURL = "http://localhost:1337";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: `${baseURL}/api`
});

export {
  baseURL,
  apiClient
};