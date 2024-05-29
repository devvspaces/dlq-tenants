import { Tenant } from "@/utils/types";
import TenantDetails from "./tenant";
import Auth from "@/utils/auth";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Auth.getToken() as string,
      },
    }
  );
  const tenants = await res.json();

  return tenants.data?.map((tenant: Tenant) => ({
    id: tenant.id.toString(),
  }));
}

export const dynamicParams = true;

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <TenantDetails id={id} />;
}
