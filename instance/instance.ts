import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://next3-0.vercel.app",
});

export { instance };
