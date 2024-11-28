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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DynamicBreadcrumb } from "@/components/StudentBreadcrumb";

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
    <div className="w-full h-full my-auto">
      <div className="sub-container px-4">
        <div className="flex justify-between items-center my-10">
          <div>
            <h1 className="font-bold text-lg mb-1.5">
              Counselling Student List
            </h1>
            <DynamicBreadcrumb currentPage="Under Counseling Application" />
          </div>
          <div className="flex gap-2">
            <Link href="/student/pending">
              <Button>Pending List</Button>
            </Link>
            <Link href="/student/reject">
              <Button>Archived List</Button>
            </Link>
            <Link href="/student/all-admitted-student">
              <Button>All Students</Button>
            </Link>
          </div>
        </div>
        <StudentListDataTable
          columns={columns(handleReject)}
          data={data ? data : []}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}
