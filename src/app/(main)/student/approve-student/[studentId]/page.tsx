"use client";

import { useEffect, useState } from "react";
import { GetStudentById } from "@/lib/actions/student.action";
import PageLoader from "@/components/ui-components/PageLoading";
import { Link } from "lucide-react";
import EditStudentForm from "@/components/EditStudentForm";
import { GetAllClasses } from "@/lib/actions/class.action";
import { GetAllGroupsForDropDown } from "@/lib/actions/finance.action";
import { GetActiveSession } from "@/lib/actions/session.action";

// Main Function Start -------------------------------------------------

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params; // Get student id from url

  // State -------------------------------------------------------------
  const [data, setData] = useState<any>({});
  const [allClasses, setAllClasses] = useState<any>({});
  const [allGroups, setAllGroups] = useState<any>([]);
  const [session, setSession] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get Student Data --------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, allClasses, allGroups, session] = await Promise.all(
          [
            GetStudentById(studentId),
            GetAllClasses(),
            GetAllGroupsForDropDown(),
            GetActiveSession(),
          ]
        );

        if (studentData && allClasses && allGroups) {
          setAllClasses(allClasses);
          setData(studentData);
          setAllGroups(allGroups);
          setSession(session);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

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
          Failed to load student information. Please try again later.
        </h2>
      </div>
    );
  }

  if (!data || !allClasses) {
    return (
      <div className="absolute w-full bg-[#414141] text-white font-bold min-h-screen flex justify-center items-center text-center gap-4">
        <h2>Data Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const data1 = {
    ...data?.bank_details,
    ...data?.student_details,
    ...data?.communication_address,
    ...data?.other_details?.medical_details,
    ...data?.other_details?.previous_institute_details,
    ...data?.parent_guardian_details,
    ...data?.parent_guardian_details?.guardian_information,
    application_status: data?.application_status,
    counselling_date: data?.counselling_date,
    counselling_status: data?.counselling_status,
    counselling_time: data?.counselling_time,
    payment_status: data?.payment_status,
    _id: data?._id,
  };

  // console.log(data1);

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <EditStudentForm
        data={data1 ? data1 : []}
        allClasses={allClasses ? allClasses : []}
        allGroups={allGroups ? allGroups : []}
        session={session ? session : []}
      />
    </div>
  );
}
