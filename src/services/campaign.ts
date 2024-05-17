import { useMutation, useQuery } from "react-query";
import Api from "@/utils/api";

export const StartCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/start", data);
  });
};

export const EndCampaignMutation = () => {
  return useMutation((data) => {
    return Api.post("campaigns/start", data);
  });
};
