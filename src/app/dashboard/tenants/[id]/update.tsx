"use client";

import Loading from "@/components/Loading";
import { DASHBOARD } from "@/constants/path";
import {
  GetTenantQuery,
  GetTenantsMutation,
  UpdateTenantMutation,
} from "@/services/tenants";
import { GetCampaignsQuery } from "@/services/campaign";
import { Tenant } from "@/utils/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Api from "@/utils/api";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useToast } from "@/components/ui/use-toast";

const EditTenant = ({ id, setScreen }: { id: string; setScreen: any }) => {
  const {
    data: tenant,
    isLoading: isLoadingTenant,
    refetch,
  } = GetTenantQuery(id);
  const { mutate: updateTenant, isLoading: isUpdating } =
    UpdateTenantMutation(id);

  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (tenant?.data) {
      setFormData(tenant.data);
    }
  }, [tenant?.data]);

  function convertIsoStringToDate(isoString: string) {
    return moment(isoString).format("YYYY-MM-DD");
  }

  const { toast } = useToast();

  const handleUpdate = () => {
    // Validate form data
    const errors = [];

    if (!formData?.name) {
      errors.push("Full name is required");
    }

    if (!formData?.phone) {
      errors.push("Phone number is required");
    } else {
      // validate phone number international format
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.push("Invalid phone number format");
      }
    }

    if (formData?.amount_receivable === undefined || formData?.amount_receivable === "") {
      errors.push("Amount receivable is required");
    }

    if (formData?.payment_amount === undefined || formData?.payment_amount === "") {
      errors.push("Payment amount is required");
    }

    if (formData?.delinquency_subsidy_amount === undefined || formData?.delinquency_subsidy_amount === "") {
      errors.push("Subsidy amount is required");
    }

    if (formData?.late_count === undefined || formData?.late_count === "") {
      errors.push("Late count is required");
    }

    if (formData?.unit === undefined || formData?.unit === "") {
      errors.push("Unit is required");
    }

    if (!formData?.last_payment) {
      errors.push("Last payment is required");
    }

    if (!formData?.move_in) {
      errors.push("Move in date is required");
    }

    if (errors.length) {
      errors.forEach((error) => {
        toast({
          title: "Error!",
          description: error,
          variant: "destructive",
        });
      });
      return;
    }

    updateTenant({
      unit: parseInt(formData.unit),
      name: formData.name,
      phone: formData.phone,
      move_in: formData.move_in,
      last_payment: formData.last_payment,
      delinquency_notes: formData.delinquency_notes,
      delinquency_subsidy_amount: parseFloat(formData.delinquency_subsidy_amount),
      amount_receivable: parseFloat(formData.amount_receivable),
      payment_amount: parseFloat(formData.payment_amount),
      late_count: parseInt(formData.late_count),
    }, {
      onSuccess: (data) => {
        toast({ title: "Tenant updated successfully" });
        refetch();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Unable to update tenant",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoadingTenant) {
    return <Loading color="#232555" />;
  }

  return (
    <>
      <div className="flex gap-5 items-center justify-between">
        <h3 className="text-lg font-bold">Edit Tenant - ID: {id}</h3>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => {
            setScreen(0);
          }}
        >
          Cancel
        </button>
      </div>

      <div
        className="mt-10 p-5 border rounded flex flex-col gap-5"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <p className="font-bold">Full name</p>
            <input
              type="text"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-2 p-2 border"
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Phone Number</p>
            <input
              type="text"
              value={formData?.phone}
              className="w-full mt-2 p-2 border"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <p className="font-bold">Amount Receivable</p>
            <input
              type="number"
              value={formData?.amount_receivable}
              className="w-full mt-2 p-2 border"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount_receivable: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Subsidy Amount</p>
            <input
              type="number"
              value={formData?.delinquency_subsidy_amount}
              className="w-full mt-2 p-2 border"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  delinquency_subsidy_amount: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <p className="font-bold">Payment Amount</p>
            <input
              type="number"
              value={formData?.payment_amount}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  payment_amount: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Late Count</p>
            <input
              type="number"
              value={formData?.late_count}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  late_count: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                });
              }}
            />
          </div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div className="w-full">
            <p className="font-bold">Unit</p>
            <input
              type="text"
              value={formData?.unit}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  unit: e.target.value ? parseInt(e.target.value) : undefined,
                });
              }}
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Last payment</p>
            <input
              type="date"
              value={convertIsoStringToDate(formData?.last_payment)}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setFormData({
                  ...formData,
                  last_payment: date.toISOString(),
                });
              }}
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Move In</p>
            <input
              type="date"
              value={convertIsoStringToDate(formData?.move_in)}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setFormData({
                  ...formData,
                  move_in: date.toISOString(),
                });
              }}
            />
          </div>
        </div>
        <div className="">
          <div>
            <p className="font-bold">Delinquency Notes</p>
            <textarea
              value={formData?.delinquency_notes}
              className="w-full mt-2 p-2 border h-40 resize-none"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  delinquency_notes: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {isUpdating ? (
          <Loading color="#232555" />
        ) : (
          <button
            className="mt-5 bg-blue-500 text-white p-2 rounded"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        )}
      </div>
    </>
  );
};

export default EditTenant;
