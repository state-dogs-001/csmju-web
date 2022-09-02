import axios from "axios";

const WebpageService = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: "application/json",
  },
});

WebpageService.interceptors.request.use(
  (config) => {
    let token = import.meta.env.VITE_TOKEN_API;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default WebpageService;
