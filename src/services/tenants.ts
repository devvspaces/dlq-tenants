import { useMutation, useQuery } from "react-query";
import Api from "@/utils/api";

export const UploadTenantsMutation = () => {
  return useMutation((data) => {
    return Api.post("user/tenants", data);
  });
};

export const GetTenantsMutation = () => {
  return useQuery("tenants", () => {
    return Api.get("user/tenants").then((res) => res.data);
  });
};
