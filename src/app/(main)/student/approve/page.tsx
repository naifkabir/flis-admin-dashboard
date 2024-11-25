'use client';

import { useState, useEffect } from 'react';
import { columns } from '@/app/data-table-components/columns';
import { StudentListDataTable } from '@/app/data-table-components/data-table';
import { GetAllApplication } from '@/lib/actions/student.action';
import { studentTableFilter } from '@/constant';
import PageLoader from '@/components/ui-components/PageLoading';
import { RejectApplication } from '@/lib/actions/student.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ApproveStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetAllApplication('APPROVED');
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // New function to handle rejection
  const handleReject = async (studentId: string) => {
    console.log('studentId: ', studentId);
    const response = await RejectApplication(studentId);
    if (response && !response?.error) {
      // Reload the data after rejection
      const result = await GetAllApplication('APPROVED');
      const filteredData = studentTableFilter(result);
      setData(filteredData);
    } else {
      console.error('Error rejecting application:', response.error);
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
          Failed to load approved students. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-screen my-auto">
      <div className="sub-container px-4">
        <div className="flex justify-between items-center my-10">
          <div>
            <h1 className="font-bold text-lg mb-8">
              Counseling Done Student List
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/student/pending">
              <Button>Application List</Button>
            </Link>
            <Link href="/student/counseling">
              <Button>Counselling List</Button>
            </Link>
            <Link href="/student/reject">
              <Button>Archived List</Button>
            </Link>
          </div>
        </div>
        <StudentListDataTable
          columns={columns(handleReject)}
          data={data ? data : []}
        />
      </div>
    </div>
  );
}
