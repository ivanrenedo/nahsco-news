import axios from "axios";

const baseURL = "https://server.egtourismawards.com";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: `${baseURL}/api`
});

export {
  baseURL,
  apiClient
};