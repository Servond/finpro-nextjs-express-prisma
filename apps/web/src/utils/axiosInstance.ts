import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
