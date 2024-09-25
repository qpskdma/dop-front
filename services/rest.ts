import axios from "axios";

const rest = axios.create({ baseURL: "https://api.dopserver.ru" });

export default rest;
