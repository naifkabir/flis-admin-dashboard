"use client";

import { FinanceColumnFeeGroups } from "@/app/data-table-components/columns";
import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  CreateNewFinanceGroup,
  DeleteHeader,
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

    console.log(formData);

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

  // Handle edit Header
  const handleEdit = async (id: number) => {
    // Implement edit functionality here if needed
  };

  // Handle Delete Header
  const handleDeleteHeader = async (headerId: string) => {
    console.log(headerId);
    const result = await DeleteHeader(headerId);

    if (result.error) {
      setError(result.error);
      alert("Error deleting header: " + result.error);
      window.location.reload();
    } else {
      alert("Header was deleted successfully");
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
            columns={FinanceColumnFeeGroups(handleEdit, handleDeleteHeader)}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancePageGroups;
