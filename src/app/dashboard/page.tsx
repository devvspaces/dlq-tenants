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
import { tenants } from "@/constants/data";
import Papa from "papaparse";
import RetellCall from "@/components/RetellCall";
import Button from "@/components/Button";
import Link from "next/link";

const Dashboard = () => {
  const [data, setData] = useState([]);

  //   maximum file size that can be uploaded
  const maxSize = 2 * 1024 * 1024;

  const handleFileChange = (file: File) => {
    // Extract data from uploaded file
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // @ts-ignore
        setData(results.data);
        console.log(results.data);
      },
    });
  };

  return (
    <div>
      <div className="flex gap-10">
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
              <TableHead className="w-1/6">Name</TableHead>
              <TableHead className="2/6">Address</TableHead>
              <TableHead className="w-1/6">Phone Number</TableHead>
              <TableHead className="w-2/6">Note Summary</TableHead>
              <TableHead className="w-1/6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant, index) => (
              <TableRow
                key={tenant.name}
                onClick={() =>
                  (window.location.href = `/dashboard/tenants/${index + 1}`)
                }
              >
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{tenant.address}</TableCell>
                <TableCell>{tenant.phoneNumber}</TableCell>
                <TableCell className="">{tenant.note}</TableCell>
                <TableCell className="">
                  <RetellCall />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
