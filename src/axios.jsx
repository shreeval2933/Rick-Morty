import axios from "axios";

const API = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export default API;
