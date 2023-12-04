import { get, post } from "../utils/request";

export const loginAPI = (data: { userName: string; password: string }) =>
  post("/api/v1/auth/manager_login", data);

export const loadManagerInfo = () => get("/api/v1/auth/manager_info");
