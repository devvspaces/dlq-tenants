"use client";

import { conversation, tenants } from "@/constants/data";
import { DASHBOARD } from "@/constants/path";
import Link from "next/link";
import React from "react";

const TenantDetails = () => {
  if (typeof window !== "undefined") {
    const tenantId = parseInt(window.location.pathname.split("/").pop() || "");

    const tenant = tenants.find((tenant) => tenant.id === tenantId);

    return (
      <>
        <div className="flex gap-5 items-center">
          <Link href={DASHBOARD}>Back</Link>
          <p>Tenant {tenantId}</p>
        </div>

        <div className="mt-10">
          <p className="font-bold">Full name</p>
          <p>{tenant?.name}</p>
        </div>
        <div className="mt-5">
          <p className="font-bold">Phone Number</p>
          <p>{tenant?.phoneNumber}</p>
        </div>
        <div className="mt-5">
          <p className="font-bold">Note</p>
          <p>{tenant?.note}</p>
        </div>
        <div className="mt-5">
          <p className="font-bold">Transcript</p>
          <div className="">
            {conversation.map((convo, index) => {
              return (
                <p key={index} className="mt-3">
                  <span className="font-bold">{convo.speaker}</span>:{" "}
                  {convo.message}
                </p>
              );
            })}
          </div>
          <p>{tenant?.note}</p>
        </div>
      </>
    );
  }
};

export default TenantDetails;
