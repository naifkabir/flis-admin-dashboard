'use client';

import { useState, useEffect } from 'react';
import { admittedStudent } from '@/app/data-table-components/columns';
import {
  GetStudentsByStatus,
  RejectApplication,
} from '@/lib/actions/student.action';
import { admittedStudentTableFilter } from '@/constant';
import PageLoader from '@/components/ui-components/PageLoading';
import { Toaster, toast } from 'sonner';
import { AdmittedStudentDataTable } from '@/app/data-table-components/admitted-student-data-table';
import { DynamicBreadcrumb } from '@/components/StudentBreadcrumb';

export default function CounselingStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetStudentsByStatus('FEES');
        console.log('Fetched data:', result);
        const filteredData = admittedStudentTableFilter(result);
        setData(filteredData);
      } catch (err: any) {
        // console.error("Error fetching data:", err);
        toast.error('Failed to fetch data', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const handleReject = async (studentId: string) => {
  //     try {
  //       const response = await RejectApplication(studentId);
  //       if (response && !response.error) {
  //         // Reload the data after rejection
  //         const result = await GetAllApplication("UNDER-COUNSELLING");
  //         toast.success("Application rejected successfully");
  //         const filteredData = studentTableFilter(result);
  //         setData(filteredData);
  //       } else {
  //         // console.error("Error rejecting application:", response.error);
  //         toast.error("Failed to reject application");
  //       }
  //     } catch (err) {
  //       // console.error("Error rejecting application:", err);
  //       toast.error("Failed to reject application");
  //     }
  //   };

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
        <div className="flex justify-between items-center mb-10">
          <div>
            {/* <h1 className="font-bold text-lg mb-1.5">All Students List</h1>
            <DynamicBreadcrumb currentPage="Under Counseling Application" /> */}
          </div>
          <div className="flex gap-2">
            {/* <Link href="/student/pending">
              <Button>Pending List</Button>
            </Link>
            <Link href="/student/reject">
              <Button>Archived List</Button>
            </Link>
            <Link href="/student/school/all-students-school">
              <Button>All Students</Button>
            </Link> */}
            <DynamicBreadcrumb currentPage="All Students" />
          </div>
        </div>

        <div className="flex justify-between items-center py-8 px-5 bg-[#fffcf5] mb-10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="class-select">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="class-select"
                className="border rounded px-2 py-1 outline-none w-44"
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="class1">Class 1</option>
                <option value="class2">Class 2</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="class-select">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                id="section-select"
                className="border rounded px-2 py-1 outline-none w-44"
                defaultValue=""
              >
                <option value="" disabled>
                  Section
                </option>
                <option value="sectionA">Section A</option>
                <option value="sectionB">Section B</option>
              </select>
            </div>
            <div className="self-end">
              <button className="bg-red-600 text-white px-3 py-[3px] rounded">
                GO
              </button>
            </div>
          </div>

          {/* Search By Keyword */}
          <div className="flex items-center gap-2">
            <label className="font-semibold" htmlFor="keyword-input">
              Search By Keyword
            </label>
            <input
              id="keyword-input"
              type="text"
              placeholder="Student name, Flis Id, Roll No."
              className="border rounded px-3 py-1 w-60 outline-none"
            />
            <button className="bg-red-600 text-white px-3 py-1 rounded">
              GO
            </button>
          </div>
        </div>

        <AdmittedStudentDataTable
          columns={admittedStudent()}
          data={data ? data : []}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}
