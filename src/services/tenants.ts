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

export const UpdateTenantMutation = (id: string) => {
  return useMutation((data: any) => {
    return axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants/${id}`,
      data,
      {
        headers: {
          "x-api-key": Auth.getToken(),
        },
      }
    );
  });
};

export const GetTenantsMutation = (month: string, year: number) => {
  return useQuery("tenants", () => {
    return Api.get(`user/tenants/${month}/${year}`).then((res) => res.data);
  });
};

export const GetTenantQuery = (id: string) => {
  return useQuery(
    "tenant",
    () => {
      return Api.get(`user/tenants/${id}`).then((res) => res.data);
    },
    { cacheTime: 0, refetchOnMount: true }
  );
};

export const DeleteTenantMutation = (id: number) => {
  return useMutation(() => {
    return axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": Auth.getToken(),
        },
      }
    );
  });
};

export const DeleteTenantsMutation = (ids: number[]) => {
  return useMutation(() => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants`, {
      method: "DELETE",
      body: JSON.stringify({
        ids,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Auth.getToken() as string,
      },
    });
  });
};
