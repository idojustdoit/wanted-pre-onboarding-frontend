import axios from "axios";

const access_token = localStorage.getItem("access_token");

const AxiosInstance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: { "Content-Type": "application/json" },
});

export default AxiosInstance;

export const AuthAxiosInstance1 = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
});

export const AuthAxiosInstance2 = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
