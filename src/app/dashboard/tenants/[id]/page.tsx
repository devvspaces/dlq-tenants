import { Tenant } from "@/utils/types";
import TenantDetails from "./tenant";
import Auth from "@/utils/auth";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Tenant ID", id);
  return <TenantDetails id={id} />;
}
