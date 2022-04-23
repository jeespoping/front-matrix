import axios from "axios";
import { getToken } from "../utils/token";

const baseURL = process.env.REACT_APP_API_URL;

const httpSinToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

const token = getToken() || "";

const httpConToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export { httpSinToken, httpConToken };
