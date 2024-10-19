"use client";

import { FinanceColumnFeeMasters } from "@/app/data-table-components/columns";
import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  CreateNewFinanceHeader,
  DeleteHeader,
  GetAllFinanceMaster,
  GetHeaderById,
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
import Link from "next/link";

interface FinanceHeader {
  header: string;
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

interface FinanceMaster {
  header: string;
  group: string;
  headers: FinanceHeader[];
}

const FinancePageMaster = () => {
  const [master, setAllMaster] = useState<FinanceMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    feesCode: "",
    occurrence: "",
    dueDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllFinanceMaster();
      // console.log("GetAllFinanceMaster Result:", result);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Fetch headers for each finance master
      const headersPromises = result.flatMap((master: FinanceMaster) =>
        master.headers.map(
          (header: FinanceHeader) => GetHeaderById(header.header) // Call the function for each header ID
        )
      );

      const headersData = await Promise.all(headersPromises); // Wait for all promises to resolve
      // console.log("GetHeaderById Result:", headersData);

      const updatedMasters = result.map(
        (item: FinanceMaster, index: number) => ({
          ...item,
          headers:
            headersData.slice(
              index * item.headers.length,
              (index + 1) * item.headers.length
            ) || [],
        })
      );

      setAllMaster(updatedMasters);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("master: ", master);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOccurrenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      occurrence: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, feesCode, occurrence, dueDate } = formData;
    if (!name || !feesCode || !occurrence || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const result = await CreateNewFinanceHeader(formData);
    if (result.error) {
      setError(result.error);
      alert("Error creating new header: " + result.error);
    } else {
      setAllMaster((prev) => [...prev]); // Update state - re-render
      setModalOpen(false);
      alert("Header created successfully");
    }

    setFormData({
      name: "",
      feesCode: "",
      occurrence: "",
      dueDate: "",
      description: "",
    });
  };

  const handleEdit = async (id: number) => {
    console.log("Edit header with id:", id);
  };

  const handleDeleteHeader = async (headerId: string) => {
    const result = await DeleteHeader(headerId);
    if (result.error) {
      setError(result.error);
      alert("Error deleting header: " + result.error);
    } else {
      setAllMaster((prevMasters) =>
        prevMasters.map((master) => ({
          ...master,
          headers: master.headers.filter(
            (header) => header.header !== headerId
          ),
        }))
      );
      alert("Header was deleted successfully");
    }
  };

  const handleDeleteMaster = async (masterId: string) => {
    // if (window.confirm("Are you sure you want to delete this master?")) {
    //   const result = await DeleteMaster(masterId);
    //   if (result.error) {
    //     setError(result.error);
    //     alert("Error deleting master: " + result.error);
    //   } else {
    //     setAllMaster((prevMasters) =>
    //       prevMasters.filter((master) => master.id !== masterId)
    //     );
    //     alert("Master deleted successfully");
    //   }
    // }
    console.log("Delete Clicked");
  };

  const handleAddHeader = () => {
    setModalOpen(true); // Open the modal to create a new header
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
            <h1 className="font-bold underline text-lg mb-8">Fee Masters</h1>
            <div className="flex gap-4 mb-4 justify-self-end">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Fee Masters</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                  <DialogHeader>
                    <DialogTitle>Create New Master</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new master.
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
                      <Label htmlFor="feesCode" className="text-right">
                        Fees Code
                      </Label>
                      <Input
                        id="feesCode"
                        name="feesCode"
                        value={formData.feesCode}
                        onChange={handleInputChange}
                        className="col-span-3 border-2"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Occurrence</Label>
                      <div className="col-span-3 flex gap-4">
                        {["Monthly", "Quarterly", "Half Yearly", "Annual"].map(
                          (option) => (
                            <label
                              key={option}
                              className="flex items-center text-sm">
                              <Input
                                type="radio"
                                name="occurrence"
                                value={option}
                                checked={formData.occurrence === option}
                                onChange={handleOccurrenceChange}
                                className="mr-2 radio-small"
                                required
                              />
                              {option}
                            </label>
                          )
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dueDate" className="text-right">
                        Due Date
                      </Label>
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
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
                      <Button type="submit">Create Header</Button>
                      <Button
                        variant="outline"
                        onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <FinanceDataTable
            columns={FinanceColumnFeeMasters(
              handleEdit,
              handleDeleteHeader,
              handleAddHeader,
              handleDeleteMaster
            )}
            data={master}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancePageMaster;

// -------------------------------------------------------------------
