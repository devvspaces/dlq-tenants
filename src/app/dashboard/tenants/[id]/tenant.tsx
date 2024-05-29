"use client";

import Loading from "@/components/Loading";
import { DASHBOARD } from "@/constants/path";
import { GetTenantsMutation } from "@/services/tenants";
import { GetCampaignsQuery } from "@/services/campaign";
import { Tenant } from "@/utils/types";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Api from "@/utils/api";
import { AxiosResponse } from "axios";

const TenantDetails = ({ id }: { id: string }) => {
  const [convoIndex, setConvoIndex] = useState(-1);

  const { data: tenants, isLoading: isLoadingTenants } = GetTenantsMutation();
  const { data: campaigns, isLoading: isLoadingCampaigns } =
    GetCampaignsQuery(id);

  const { data: conversation, isLoading: isLoadingConversation } = useQuery(
    ["conversation", campaigns?.data[convoIndex]?.id],
    () =>
      Api.get(`campaigns/detail/${campaigns?.data[convoIndex]?.id}`).then(
        (res: AxiosResponse) => res.data
      ),
    { enabled: convoIndex > -1 }
  );

  const tenant = tenants?.data.find(
    (tenant: Tenant) => tenant.id === parseInt(id)
  );

  if (isLoadingTenants) {
    return <Loading color="#232555" />;
  }

  return (
    <>
      <div className="flex gap-5 items-center">
        <Link href={DASHBOARD}>Back</Link>
        <p>Tenant {id}</p>
      </div>

      <div className="mt-10">
        <p className="font-bold">Full name</p>
        <p>
          {tenant?.first_name} {tenant?.last_name}
        </p>
      </div>
      <div className="mt-5">
        <p className="font-bold">Amount</p>
        <p>{tenant?.amount}</p>
      </div>
      <div className="mt-5">
        <p className="font-bold">Amount Paid</p>
        <p>{tenant?.amount_paid}</p>
      </div>
      <div className="mt-5">
        <p className="font-bold">Phone Number</p>
        <p>{tenant?.phone}</p>
      </div>
      <div className="mt-5">
        <p className="font-bold">Summary</p>
        <p>
          {campaigns?.data[convoIndex]
            ? campaigns.data[convoIndex]?.conversation.summary
            : "-"}
        </p>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="font-bold">Transcript</p>
          <select onChange={(e) => setConvoIndex(parseInt(e.target.value))}>
            {isLoadingCampaigns ? (
              <option hidden selected defaultChecked>
                Loading...
              </option>
            ) : !campaigns.data.length ? (
              <option hidden selected defaultChecked>
                No convo yet
              </option>
            ) : (
              campaigns.data.map((campaign: any, index: number) => (
                <>
                  <option hidden selected defaultChecked>
                    Select Convo
                  </option>
                  <option value={index}>Convo {index + 1}</option>
                </>
              ))
            )}
          </select>
        </div>

        <div className="pb-20">
          {isLoadingConversation ? (
            <Loading color="#000" />
          ) : conversation?.data?.id ? (
            conversation?.data?.conversation?.transcript.map(
              (convo: { role: string; content: string }, index: number) => {
                return (
                  <p key={index} className="mt-3">
                    <span className="font-bold">{convo.role}</span>:{" "}
                    {convo.content}
                  </p>
                );
              }
            )
          ) : (
            <p className="text-center">No conversation yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TenantDetails;
