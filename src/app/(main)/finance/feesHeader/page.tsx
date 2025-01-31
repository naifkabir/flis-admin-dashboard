"use client";

import { FinanceColumnFeeHeaders } from "@/app/data-table-components/columns";
import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  GetAllFinanceHeaders,
  CreateNewFinanceHeader,
  DeleteHeader,
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
import { IoIosArrowRoundForward } from "react-icons/io";
import { DynamicBreadcrumb } from "@/components/StudentBreadcrumb";

interface FinanceHeader {
  id: string;
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
  createdAt: string;
}

interface FormData {
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

const FinancePage = () => {
  const [data, setData] = useState<FinanceHeader[]>([]);
  const [filteredData, setFilteredData] = useState<FinanceHeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    feesCode: "",
    occurrence: "",
    dueDate: "",
    description: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [headerIdToDelete, setHeaderIdToDelete] = useState<string>("");
  const [createNewHeaderLoading, setCreateNewHeaderLoading] =
    useState<boolean>(false);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllFinanceHeaders();
        if (result?.error) {
          setError(result.error);
        } else {
          setData(result);
          extractUniqueYears(result);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractUniqueYears = (headers: FinanceHeader[]) => {
    const years = Array.from(
      new Set(headers.map((header) => new Date(header.createdAt).getFullYear()))
    );
    setYears(years.sort((a, b) => b - a));
  };

  const filterByYear = (year: number | null) => {
    setSelectedYear(year);
    if (year) {
      setFilteredData(
        data.filter(
          (header) => new Date(header.createdAt).getFullYear() === year
        )
      );
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOccurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      occurrence: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateNewHeaderLoading(true);

    const { name, feesCode, occurrence, dueDate } = formData;
    if (!name || !feesCode || !occurrence || !dueDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const result = await CreateNewFinanceHeader(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        setModalOpen(false);
        toast.success("Header created successfully!");
        window.location.reload();

        setFormData({
          name: "",
          feesCode: "",
          occurrence: "",
          dueDate: "",
          description: "",
        });
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreateNewHeaderLoading(false);
    }
  };

  const handleDeleteHeader = async (headerId: string) => {
    setHeaderIdToDelete(headerId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteHeader = async () => {
    const result = await DeleteHeader(headerIdToDelete);

    if (result.error) {
      setError(result.error);
      toast.error("Error deleting header: " + result.error);
      setDeleteDialogOpen(false);
    } else {
      setData((prevData) =>
        prevData.filter((header) => header.id !== headerIdToDelete)
      );
      toast.success("Header deleted successfully!");
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
    <div className="w-full min-h-full my-auto">
      <div className="sub-container px-4">
        <div>
          <div className="grid grid-cols-2">
            <div className="mb-10">
              <h1 className="font-bold text-lg mb-1.5">Fees Headers</h1>
              <DynamicBreadcrumb currentPage="Fees Headers" />
            </div>
            <div className="flex gap-4 mb-4 justify-self-end">
              <section className="mr-20">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={selectedYear === null ? "default" : "outline"}
                    onClick={() => filterByYear(null)}>
                    All Years
                  </Button>
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      onClick={() => filterByYear(year)}>
                      {year}
                    </Button>
                  ))}
                </div>
              </section>

              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Fee Header</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                  <DialogHeader>
                    <DialogTitle>Create New Header</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new finance header.
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
                        className="col-span-3 border-2 text-sm"
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
                        className="col-span-3 border-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Occurrence</Label>
                      <div className="col-span-3">
                        <select
                          name="occurrence"
                          value={formData.occurrence}
                          onChange={handleOccurrenceChange}
                          className="w-full py-2 bg-transparent border-2 rounded-lg px-3 text-sm"
                          required>
                          <option value="" disabled>
                            Select Occurrence
                          </option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Half Yearly">Half Yearly</option>
                          <option value="Annual">Annual</option>
                        </select>
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
                        className="col-span-3 border-2 text-sm"
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
                        className="col-span-3 border-2 text-sm"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        {createNewHeaderLoading ? (
                          <span className="flex justify-center items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.659l1.304 1.304C15.375 21.5 13.75 22 12 22c-4.418 0-8-3.582-8-8z"></path>
                            </svg>
                            Creating...
                          </span>
                        ) : (
                          <>
                            Create Header
                            <span className="-rotate-45">
                              <IoIosArrowRoundForward />
                            </span>
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <FinanceDataTable
            columns={FinanceColumnFeeHeaders(handleDeleteHeader)}
            data={filteredData ? filteredData : []}
          />
        </div>
      </div>

      <div className="hidden">
        <AlertDialogComponent
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteHeader}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete this header."
        />
      </div>

      <Toaster richColors />
    </div>
  );
};

export default FinancePage;
