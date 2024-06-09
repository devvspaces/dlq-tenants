"use client";

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { DeleteTenantMutation } from "@/services/tenants";

const DeleteTenant = ({ id, refetch }: { id: number, refetch: () => void }) => {
  const { mutate, isLoading } = DeleteTenantMutation(id);

  const { toast } = useToast();

  const handleDeleteTenant = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast({
          title: "Tenant deleted",
          description: "Tenant has been deleted",
        });
        refetch();
      },
      onError: (error) => {
        toast({
          title: "Failed to delete tenant",
          description: "Tenant could not be deleted",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="">
      <button
        className={`px-8 py-2 rounded-lg text-sm cursor-pointer text-white bg-red-600`}
        onClick={handleDeleteTenant}
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteTenant;
