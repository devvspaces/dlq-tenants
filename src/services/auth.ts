import { useMutation } from "react-query";
import Api from "@/utils/api";

export const LoginApiMutation = () => {
  return useMutation((data) => {
    return Api.post("/auth/login", data);
  });
};

export const RegisterApiMutation = () => {
  return useMutation((data) => {
    return Api.post("/auth/register", data);
  });
};

export const GoogleAuth = () => {
  return useMutation((data) => {
    return Api.post("auth/google", data);
  });
};
