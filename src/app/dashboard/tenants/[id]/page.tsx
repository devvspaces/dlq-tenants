import { Tenant } from "@/utils/types";
import TenantDetails from "./tenant";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import Auth from "@/utils/auth";

const getToken = () => {
  const cookieStore = getCookies();
  // const hCookies = cookies();
  console.log(cookieStore);
  const token = Auth.getToken() || "";

  return token;
};

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbWlsYXJldG9sdWxvcGUxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MTY5MzA5MTZ9.pvuaxzkrQgQgiM42jAkyWt8FNr_kOEn-gT5QTtnZCZA",
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
