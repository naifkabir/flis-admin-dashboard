"use client";

import { useState, useEffect } from "react";
import { pendingAndRejectedTableColumns } from "@/app/data-table-components/columns";
import { StudentListDataTable } from "@/app/data-table-components/data-table";
import { GetAllApplication } from "@/lib/actions/student.action";
import { studentTableFilter } from "@/constant";
import PageLoader from "@/components/ui-components/PageLoading";
import { RejectApplication } from "@/lib/actions/student.action";
import { DynamicBreadcrumb } from "@/components/StudentBreadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function PendingStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetAllApplication("PENDING");
        // console.log("Fetched data:", result);
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // New function to handle rejection
  const handleReject = async (studentId: string) => {
    // console.log("studentId: ", studentId);
    const response = await RejectApplication(studentId);
    // console.log("After Call");
    if (response && !response.error) {
      // Reload the data after rejection
      const result = await GetAllApplication("PENDING");
      const filteredData = studentTableFilter(result);
      setData(filteredData);
    } else {
      toast.error("Failed to reject application.");
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
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-bold text-lg mb-1.5">Pending Student List</h1>
            <DynamicBreadcrumb currentPage="Pending Applications" />
          </div>
          <div className="flex gap-2">
            <Link href="/student/counseling">
              <Button>Counselling List</Button>
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
          columns={pendingAndRejectedTableColumns(handleReject)}
          data={data ? data : []}
        />
      </div>
    </div>
  );
}
