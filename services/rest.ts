import axios, { InternalAxiosRequestConfig } from "axios";

const rest = axios.create({ baseURL: "https://api.dopserver.ru" });

rest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default rest;
