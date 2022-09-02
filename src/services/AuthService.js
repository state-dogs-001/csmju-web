import axios from "axios";

const AuthService = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: "application/json",
  },
});

export default AuthService;
