"use client";

import { useState, useEffect } from "react";
import { columns } from "@/app/data-table-components/columns";
import { StudentListDataTable } from "@/app/data-table-components/data-table";
import { GetAllApplication } from "@/lib/actions/student.action";
import { studentTableFilter } from "@/constant";
import PageLoader from "@/components/ui-components/PageLoading";
import { RejectApplication } from "@/lib/actions/student.action";

export default async function CounselingStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetAllApplication("UNDER-COUNSELLING");
        console.log("Fetched data:", result);
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // New function to handle rejection
  const handleReject = async (studentId: string) => {
    const response = await RejectApplication(studentId);
    if (response && !response.error) {
      // Reload the data after rejection
      const result = await GetAllApplication("UNDER-COUNSELLING");
      const filteredData = studentTableFilter(result);
      setData(filteredData);
    } else {
      console.error("Error rejecting application:", response.error);
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
        <h1 className="font-bold underline text-lg mb-8">
          Counselling Student List
        </h1>
        <StudentListDataTable columns={columns(handleReject)} data={data} />
      </div>
    </div>
  );
}
