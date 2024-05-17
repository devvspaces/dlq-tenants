import { useMutation, useQuery } from "react-query";
import Api from "@/utils/api";
import axios from "axios";
import Auth from "@/utils/auth";

export const UploadTenantsMutation = () => {
  return useMutation((data) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": Auth.getToken(),
        },
      }
    );
  });
};

export const GetTenantsMutation = () => {
  return useQuery("tenants", () => {
    return Api.get("user/tenants").then((res) => res.data);
  });
};
