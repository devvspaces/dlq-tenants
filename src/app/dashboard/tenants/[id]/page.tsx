"use client";
import { Tenant } from "@/utils/types";
import TenantDetails from "./tenant";
import Auth from "@/utils/auth";
import EditTenant from "./update";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [screen, setScreen] = useState(0);
  const { id } = params;
  return (
    <>
      {screen === 0 ? (
        <TenantDetails id={id} setScreen={setScreen} />
      ) : (
        <EditTenant id={id} setScreen={setScreen} />
      )}
    </>
  );
}
