"use client";

import FileInput from "@/components/FileInput";
import React, { useState } from "react";
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
import Link from "next/link";
import { GetTenantsMutation, UploadTenantsMutation } from "@/services/tenants";
import { Tenant } from "@/utils/types";
import Loading from "@/components/Loading";
import { StartCampaignMutation } from "@/services/campaign";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isRunningCampaign, setIsRunningCampaign] = useState(false);

  const { toast } = useToast();

  const {
    data: tenants,
    isLoading: isLoadingTenants,
    refetch,
  } = GetTenantsMutation();
  const { mutate, isLoading } = StartCampaignMutation();
  const { mutate: mutateUploadTenant, isLoading: isLoadingUploadTenant } =
    UploadTenantsMutation();

  const handleStartCampaign = () => {
    const values = {
      agent_id: "12345",
    };

    // @ts-ignore
    mutate(values, {
      onSuccess: (data) => {
        console.log(data);
        setIsRunningCampaign(true);
        toast({ title: "Campaign started successfully" });
      },
      onError: () =>
        toast({
          title: "Error",
          description: "Unable to start campaign",
          variant: "destructive",
        }),
    });
  };

  const handleEndCampaign = () => {
    // @ts-ignore
    mutate(null, {
      onSuccess: (data) => {
        console.log(data);
        setIsRunningCampaign(false);
        toast({ title: "Campaign stopped successfully" });
      },
      onError: () =>
        toast({
          title: "Error",
          description: "Unable to end campaign",
          variant: "destructive",
        }),
    });
  };

  const handleUploadTenant = () => {
    if (!uploadedFile) {
      return toast({
        title: "Please upload tenant details",
        variant: "destructive",
      });
    }

    // append file to a form
    const data = new FormData();
    data.append("tenants", uploadedFile);

    // @ts-ignore
    mutateUploadTenant(data, {
      onSuccess: (data) => {
        console.log(data);
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

        // check if the data has first_name, last_name, phone and address
        if (
          heading?.some((h) => h.includes("first")) &&
          heading?.some((h) => h.includes("last")) &&
          heading?.some((h) => h.includes("phone")) &&
          heading?.some((h) => h.includes("address"))
        ) {
          return setUploadedFile(file);
        } else {
          return toast({
            title: "Error",
            description:
              "File should contain first name, last name, phone and address fields",
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full">
          <h1>Overview</h1>

          <div className="flex items-center justify-between w-full">
            <p>Balance</p>
            <p>&#8358; {(123455).toLocaleString()}</p>
          </div>
        </div>
        <div className="w-full">
          <h1>Campaigns</h1>
          <p>Upload tenant details</p>
          <FileInput maxSize={maxSize} onFileChange={handleFileChange} />
          <Button
            className="my-5"
            isDisabled={isLoadingUploadTenant}
            onClick={handleUploadTenant}
          >
            {isLoadingUploadTenant ? <Loading /> : "Upload Tenant"}
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button className="!w-auto">Start All</Button>
      </div>

      {/* Tenants details table */}
      <div className="mt-10">
        <Table>
          <TableCaption>Tenants details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">First Name</TableHead>
              <TableHead className="w-1/6">Last Name</TableHead>
              <TableHead className="2/6">Address</TableHead>
              <TableHead className="w-1/6">Phone Number</TableHead>
              <TableHead className="w-1/6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // check if data is loading
              isLoadingTenants ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loading color="#232555" />
                  </TableCell>
                </TableRow>
              ) : // check if data is present
              tenants?.data.length ? (
                tenants?.data.map((tenant: Tenant) => (
                  <TableRow
                    key={tenant.id}
                    onClick={() =>
                      (window.location.href = `/dashboard/tenants/${tenant.id}`)
                    }
                  >
                    <TableCell className="font-medium">
                      {tenant.first_name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {tenant.last_name}
                    </TableCell>
                    <TableCell>{tenant.address}</TableCell>
                    <TableCell>{tenant.phone}</TableCell>
                    <TableCell className="">
                      {/* <RetellCall /> */}
                      {isRunningCampaign ? (
                        <Button
                          className="bg-red-800"
                          onClick={handleEndCampaign}
                          isDisabled={isLoading}
                        >
                          End
                        </Button>
                      ) : (
                        <Button
                          onClick={handleStartCampaign}
                          isDisabled={isLoading}
                        >
                          Start
                        </Button>
                      )}
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
