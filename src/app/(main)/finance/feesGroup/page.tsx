"use client";

import { FinanceColumnFeeGroups } from "@/app/data-table-components/columns";
import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  CreateNewFinanceGroup,
  DeleteGroup,
  GetAllFinanceGroups,
} from "@/lib/actions/finance.action";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import AlertDialogComponent from "@/components/Alart";

interface FinanceGroup {
  id: string;
  name: string;
  groupCode: string;
  description?: string;
}

const FinancePageGroups = () => {
  const [data, setData] = useState<FinanceGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    groupCode: "",
    description: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [headerIdToDelete, setHeaderIdToDelete] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllFinanceGroups();
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    const { name, groupCode } = formData;
    if (!name || !groupCode) {
      alert("Please fill in all required fields.");
      return;
    }

    // console.log(formData);

    // Call API to create new finance group
    const result = await CreateNewFinanceGroup(formData);
    if (result.error) {
      setError(result.error);
      alert("Error creating new group: " + result.error);
      window.location.reload();
    } else {
      setData(result);
      setModalOpen(false);
      window.location.reload();
    }

    // Reset form data
    setFormData({
      name: "",
      groupCode: "",
      description: "",
    });
  };

  const handleDeleteGroup = async (feeGroupId: string) => {
    setHeaderIdToDelete(feeGroupId);
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const confirmDeleteHeader = async () => {
    const result = await DeleteGroup(headerIdToDelete);

    if (result.error) {
      setError(result.error);
      alert("Error deleting group: " + result.error);
      setDeleteDialogOpen(false);
    } else {
      toast.success("Header deleted successfully!"); // Show success toast
      setDeleteDialogOpen(false);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PageLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-red-600 text-lg">
          Failed to load finance data. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-screen my-auto">
      <div className="sub-container px-4">
        <div>
          <div className="grid grid-cols-2">
            <h1 className="font-bold underline text-lg mb-8">Fee Groups</h1>
            <div className="flex gap-4 mb-4 justify-self-end">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Fee Group</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new finance group.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="col-span-3 border-2"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="groupCode" className="text-right">
                        Group Code
                      </Label>
                      <Input
                        id="groupCode"
                        name="groupCode"
                        value={formData.groupCode}
                        onChange={handleInputChange}
                        className="col-span-3 border-2"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="col-span-3 border-2"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Group</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <FinanceDataTable
            columns={FinanceColumnFeeGroups(handleDeleteGroup)}
            data={data}
          />
        </div>
      </div>

      {/* Alert Dialog for Deleting Header */}
      <div className="hidden">
        <AlertDialogComponent
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteHeader}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete this group."
        />
      </div>

      {/* Toast Notifications */}
      <Toaster richColors />
    </div>
  );
};

export default FinancePageGroups;
