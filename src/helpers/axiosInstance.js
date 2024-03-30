import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogburst-backend-974c.onrender.com",
  withCredentials: true,
});

export { axiosInstance };
