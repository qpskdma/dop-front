import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const rest = axios.create({ baseURL: "https://dopserver.ru/api" });

rest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

rest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default rest;
