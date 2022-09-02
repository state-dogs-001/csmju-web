import axios from "axios";

const APIService = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: "application/json",
  },
});

APIService.interceptors.request.use(
  (config) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default APIService;
