"use client";

import { useState, useEffect } from "react";
import { columns } from "@/app/data-table-components/columns";
import { StudentListDataTable } from "@/app/data-table-components/data-table";
import {
  GetAllApplication,
  RejectApplication,
} from "@/lib/actions/student.action";
import { studentTableFilter } from "@/constant";
import PageLoader from "@/components/ui-components/PageLoading";
import { Toaster, toast } from "sonner";

export default function CounselingStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetAllApplication("UNDER-COUNSELLING");
        // console.log("Fetched data:", result);
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } catch (err: any) {
        // console.error("Error fetching data:", err);
        toast.error("Failed to fetch data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReject = async (studentId: string) => {
    try {
      const response = await RejectApplication(studentId);
      if (response && !response.error) {
        // Reload the data after rejection
        const result = await GetAllApplication("UNDER-COUNSELLING");
        toast.success("Application rejected successfully");
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } else {
        // console.error("Error rejecting application:", response.error);
        toast.error("Failed to reject application");
      }
    } catch (err) {
      // console.error("Error rejecting application:", err);
      toast.error("Failed to reject application");
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
          Failed to load pending students. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-screen my-auto">
      <div className="sub-container px-4">
        <h1 className="font-bold text-lg mb-8">All Students List</h1>
        <StudentListDataTable
          columns={columns(handleReject)}
          data={data ? data : []}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}
