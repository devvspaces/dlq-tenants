import { useMutation, useQuery } from "react-query";
import Api from "@/utils/api";

export const StartCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/start", data);
  });
};

export const EndCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/end", data);
  });
};

//campaigns/tenant id
export const GetCampaignsQuery = (id: string) => {
  return useQuery("campaigns", () => {
    return Api.get(`campaigns/${id}`).then((res) => res.data);
  });
};

//campaigns/detail/campaign id
export const GetACampaignQuery = (id: string) => {
  return useQuery("campaigns", () => {
    return Api.get(`campaigns/detail/${id}`).then((res) => res.data);
  });
};


