// "use client";

// import { useState, useEffect } from "react";
// import { columns } from "@/app/data-table-components/columns";
// import { StudentListDataTable } from "@/app/data-table-components/data-table";
// import { GetAllApplication } from "@/lib/actions/student.action";
// import { studentTableFilter } from "@/constant";
// import PageLoader from "@/components/ui-components/PageLoading";

// export default async function RejectStudentPage() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         const result = await GetAllApplication("ARCHIVED");
//         const filteredData = studentTableFilter(result);
//         setData(filteredData);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <PageLoader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <h2 className="text-red-600 text-lg">
//           Failed to load pending students. Please try again later.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen my-auto">
//       <div className="sub-container px-4">
//         <h1 className="font-bold text-lg mb-8">Archived Student List</h1>
//         <StudentListDataTable columns={columns()} data={data ? data : []} />
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { columns } from '@/app/data-table-components/columns';
import { StudentListDataTable } from '@/app/data-table-components/data-table';
import { GetAllApplication } from '@/lib/actions/student.action';
import { studentTableFilter } from '@/constant';
import PageLoader from '@/components/ui-components/PageLoading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RejectStudentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetAllApplication('ARCHIVED');
        const filteredData = studentTableFilter(result);
        setData(filteredData);
      } catch (err) {
        // console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <div className="flex justify-between items-center my-10">
          <div>
            <h1 className="font-bold text-lg mb-1.5">Archived Student List</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/student/pending">
              <Button>Application List</Button>
            </Link>
            <Link href="/student/counseling">
              <Button>Counselling List</Button>
            </Link>
            <Link href="/student/approve">
              <Button>Approved List</Button>
            </Link>
          </div>
        </div>
        <StudentListDataTable columns={columns()} data={data} />
      </div>
    </div>
  );
}
