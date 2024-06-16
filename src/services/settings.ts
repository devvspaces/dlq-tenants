import Api from "@/utils/api";
import { useMutation, useQuery } from "react-query";

export const GetProfile = () => {
  return useQuery("profile", () =>
    Api.get("user").then((res) => res.data)
  );
};
export const GetSettingsQuery = () => {
  return useQuery("settings", () =>
    Api.get("user/settings").then((res) => res.data)
  );
};

export const GetVoicesQuery = () => {
  return useQuery("voices", () =>
    Api.get("user/settings/voices").then((res) => res.data)
  );
};

export const UpdateSettingsMutation = () => {
  return useMutation((data) => {
    return Api.patch("user/settings", data);
  });
};
