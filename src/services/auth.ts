import { useMutation, useQuery } from "react-query";
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

//User Profile
export const GetUserProfile = () => {
  return useQuery("profile", () => {
    return Api.get(`user`).then((res) => res.data);
  });
};
