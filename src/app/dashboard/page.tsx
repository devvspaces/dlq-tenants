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
        </div>
        <div className="w-full">
          <h1>Tenants Details</h1>
          <p>Upload tenant details</p>
          <FileInput maxSize={maxSize} onFileChange={handleFileChange} />
          <button>Solve</button>
        </div>
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
            {tenants.map((tenant) => (
              <TableRow key={tenant.name}>
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
