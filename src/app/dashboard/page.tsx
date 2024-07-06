"use client";

import FileInput from "@/components/FileInput";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Papa from "papaparse";
import RetellCall from "@/components/RetellCall";
import Button from "@/components/Button";
import {
  DeleteTenantsMutation,
  GetTenantsMutation,
  UploadTenantsMutation,
} from "@/services/tenants";
import { Tenant } from "@/utils/types";
import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  StartAllCampaignsMutation,
  StopAllCampaignsMutation,
} from "@/services/campaign";
import { months, years } from "@/constants/data";
import DeleteTenant from "@/components/DeleteTenant";

const Dashboard = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [uploadedFile, setUploadedFile] = useState<File>();
  const [month, setMonth] = useState(months[currentMonth]);
  const [year, setYear] = useState(currentYear);

  const [filterMonth, setFilterMonth] = useState(months[currentMonth]);
  const [filterYear, setFilterYear] = useState(currentYear);
  const [amountBalance, setAmountBalance] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const {
    data: tenants,
    isLoading: isLoadingTenants,
    refetch,
    isFetching,
  } = GetTenantsMutation(filterMonth, filterYear);
  const { mutate: mutateUploadTenant, isLoading: isLoadingUploadTenant } =
    UploadTenantsMutation();
  const { mutate: mutateStartAll, isLoading: isLoadingStartAll } =
    StartAllCampaignsMutation();
  const { mutate: mutateStopAll, isLoading: isLoadingStopAll } =
    StopAllCampaignsMutation();
  const { mutate: mutateDeleteAll, isLoading: isDeletingAll } =
    DeleteTenantsMutation(tenants?.data?.map((tenant: Tenant) => tenant.id));

  useEffect(() => {
    if (!isLoadingTenants && tenants.data) {
      const summedUpBalance = tenants.data.reduce(
        (accumulator: number, tenant: any) => {
          return (accumulator += parseInt(tenant.amount_receivable));
        },
        0
      );

      setAmountBalance(summedUpBalance);
    }
  }, [tenants, isLoadingTenants]);

  const handleUploadTenant = () => {
    console.log("MONTH", month);
    if (!month) {
      return toast({
        title: "Please select the month",
        variant: "destructive",
      });
    }
    if (!year) {
      return toast({
        title: "Please enter the year",
        variant: "destructive",
      });
    }
    if (!uploadedFile) {
      return toast({
        title: "Please upload tenant details",
        variant: "destructive",
      });
    }

    // append file to a form
    const data = new FormData();
    data.append("tenants", uploadedFile);
    data.append("year", year.toString());
    data.append("month", month);

    // @ts-ignore
    mutateUploadTenant(data, {
      onSuccess: (data) => {
        toast({ title: "Tenant uploaded successfully" });

        // Refetch tenants
        refetch();
      },
      onError: () =>
        toast({
          title: "Error",
          description: "Unable to upload tenant",
          variant: "destructive",
        }),
    });
  };

  const handleStartAll = () => {
    const campaignsToStart = [{ tenant_id: 1, agent_id: 1 }];
    // tenants?.forEach((tenant) => {
    //   campaignsToStart.push(tenant.id);
    //   });

    //@ts-ignore
    mutateStartAll(campaignsToStart, {
      onSuccess: () => {
        toast({ title: "All campaigns started successfully" });
        refetch();
      },
      onError: () =>
        toast({ title: "Error", description: "Unable to start campaigns" }),
    });
  };

  const handleDeleteAll = () => {
    mutateDeleteAll(undefined, {
      onSuccess: () => {
        toast({ title: "Campaigns deleted successfully" });
        refetch();
      },
      onError: () => {
        toast({ title: "Error", description: "Unable to delete campaigns" });
      },
    });
  };

  const handleStopAll = () => {
    const campaignsToStop = [{ tenant_id: 1, call_sid: "" }];
    // tenants?.forEach((tenant) => {
    //   campaignsToStop.push(tenant.id);
    //   });

    //@ts-ignore
    mutateStopAll(campaignsToStop, {
      onSuccess: () => {
        toast({ title: "All campaigns started successfully" });
        refetch();
      },
      onError: () =>
        toast({ title: "Error", description: "Unable to start campaigns" }),
    });
  };

  const handleSingleTenant = (id: number) => {
    router.push(`/dashboard/tenants/${id}`);
  };

  //   maximum file size that can be uploaded
  const maxSize = 2 * 1024 * 1024;

  const handleFileChange = (file: File) => {
    // Extract data from uploaded file
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const heading = results.meta.fields?.map((res) =>
          res.toLocaleLowerCase()
        );

        // check if the file contains the required fields
        if (
          heading?.some((h) => h.includes("unit")) &&
          heading?.some((h) => h.includes("name")) &&
          heading?.some((h) => h.includes("phone")) &&
          heading?.some((h) => h.includes("move in")) &&
          heading?.some((h) => h.includes("delinquency")) &&
          heading?.some((h) => h.includes("amount receivable")) &&
          heading?.some((h) => h.includes("delinquent subsidy amount")) &&
          heading?.some((h) => h.includes("0-30")) &&
          heading?.some((h) => h.includes("30+")) &&
          heading?.some((h) => h.includes("last payment")) &&
          heading?.some((h) => h.includes("payment amount")) &&
          heading?.some((h) => h.includes("late count"))
        ) {
          return setUploadedFile(file);
        } else {
          return toast({
            title: "Error",
            description:
              "File should contain Unit, Name, Phone number, Move in, Delinquency, Amount receivable, Delinquent subsidy amount, 0-30, 30+, Last payment, Payment amount and Late Count fields",
            variant: "destructive",
          });
        }
      },
    });
  };

  const handleCallTenant = () => {
    refetch();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full">
          <h1>Overview</h1>

          <div className="mb-5 flex items-center justify-between w-full">
            <p>Amount Receivable</p>
            <p>
              ${amountBalance === "" ? "0" : amountBalance.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="w-full">
          <h1>Add new Campaign</h1>
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <p>Select month</p>
              <select
                className="border mb-4"
                onChange={(e) => setMonth(e.target.value)}
                defaultValue={month}
              >
                <option hidden defaultChecked>
                  Select Month
                </option>
                {months.map((m) => (
                  <option key={m} value={m} className="capitalize">
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p>Year</p>
              <input
                type=""
                value={year}
                onChange={(e) => {
                  if (isNaN(parseInt(e.target.value))) {
                    setYear(currentYear);
                    return;
                  }
                  setYear(parseInt(e.target.value));
                }}
                className="border border-black outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p>Upload tenant details</p>
            <FileInput maxSize={maxSize} onFileChange={handleFileChange} />
          </div>
          <Button
            className="my-5"
            isDisabled={isLoadingUploadTenant}
            onClick={handleUploadTenant}
          >
            {isLoadingUploadTenant ? <Loading /> : "Upload Tenant"}
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-5">
        <Button className="!w-auto" onClick={handleStartAll}>
          Start All
        </Button>
        <button
          className="!w-auto px-8 py-2 rounded-full text-sm cursor-pointer text-white bg-red-600"
          onClick={handleDeleteAll}
        >
          {isDeletingAll ? "Deleting..." : "Delete All"}
        </button>
      </div>

      <div className="">
        <div className="flex flex-col md:flex-row gap-5">
          <select
            className="border mb-4"
            onChange={(e) => setFilterMonth(e.target.value)}
            defaultValue={filterMonth}
          >
            <option hidden defaultChecked>
              Select month
            </option>
            {months.map((m) => (
              <option key={m} value={m} className="capitalize">
                {m}
              </option>
            ))}
          </select>
          <select
            className="border mb-4"
            onChange={(e) => setFilterYear(parseInt(e.target.value))}
            defaultValue={filterYear}
          >
            <option hidden defaultChecked>
              Select year
            </option>
            {years.map((y) => (
              <option key={y} value={y} className="capitalize">
                {y}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleCallTenant} className="w-auto">
          View
        </Button>
      </div>

      {/* Tenants details table */}
      <div className="mt-10">
        <Table>
          <TableCaption>Tenants details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Name</TableHead>
              <TableHead className="w-1/6">Phone Number</TableHead>
              <TableHead className="1/6">Rent Balance</TableHead>
              <TableHead className="2/6">Note</TableHead>
              <TableHead className="w-1/6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // check if data is loading
              isLoadingTenants || isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loading color="#232555" />
                  </TableCell>
                </TableRow>
              ) : // check if data is present
              tenants?.data.length ? (
                tenants?.data.map((tenant: Tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => handleSingleTenant(tenant.id)}
                    >
                      {tenant.name}
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => handleSingleTenant(tenant.id)}
                    >
                      {tenant.phone}
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => handleSingleTenant(tenant.id)}
                    >
                      ${tenant.amount_receivable}
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => handleSingleTenant(tenant.id)}
                    >
                      {tenant.delinquency_notes}
                    </TableCell>
                    <TableCell className="">
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <RetellCall id={tenant.id} />
                        <DeleteTenant id={tenant.id} refetch={refetch} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No Tenants!
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
