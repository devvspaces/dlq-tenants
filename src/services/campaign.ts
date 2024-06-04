import { useMutation, useQuery } from "react-query";
import Api from "@/utils/api";

export const StartAllCampaignsMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/start_all", data);
  });
};

export const StopAllCampaignsMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/stop_all", data);
  });
};

export const StartCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/start", data);
  });
};

export const EndCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/stop", data);
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
