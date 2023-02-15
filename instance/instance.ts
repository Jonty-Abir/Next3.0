import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://authentication-with-next-auth.vercel.app",
});

export { instance };
