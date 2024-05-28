import { Tenant } from "@/utils/types";
import TenantDetails from "./tenant";
import { fetchTenantsData } from "@/utils/auth";

export async function generateStaticParams() {
  const res = await fetchTenantsData();

  const tenants = await res.json();

  return tenants.data?.map((tenant: Tenant) => ({
    id: tenant.id.toString(),
  }));
}

export const dynamicParams = true;

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <TenantDetails id={id} />;
}
