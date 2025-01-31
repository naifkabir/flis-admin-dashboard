"use client";

import ApproveDialog from "@/components/ApproveDialog";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  GetStudentById,
  RejectApplication,
} from "@/lib/actions/student.action";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageLoader from "@/components/ui-components/PageLoading";
import { formatDate } from "@/components/FormatDate";

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params; // This is admission id
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const data = await GetStudentById(studentId);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const studentData = await GetStudentById(studentId);
        setData(studentData);
      } catch (err: any) {
        setError(err);
        toast.error("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const student = data?.student_details;

  // const handleCounselingDone = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await ApproveApplicationCounsellingDone({
  //       id: studentId,
  //       status: "APPROVED",
  //     });

  //     if (response.statusCode === 200) {
  //       toast.success("Application approved successfully!");
  //       window.location.href = "/student/approve";
  //     } else {
  //       toast.error("Failed to approve application!");
  //     }
  //   } catch (err) {
  //     toast.error("Failed to approve application! Counseling not done");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const dataToBeSubmitted = {
  //   student_details: data?.student_details,
  //   parent_guardian_details: data?.parent_guardian_details,
  //   communication_address: data?.communication_address,
  //   other_details: data?.other_details,
  //   bank_details: data?.bank_details,
  // };

  // const handleWithoutEditApplication = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await submitWithoutEditApplication(
  //       dataToBeSubmitted,
  //       studentId // This is admission_id
  //     );
  //     console.log(response);
  //     if (response) {
  //       const studentId = response;
  //       console.log("response: ", studentId);
  //       window.location.href = `/student/upload-documents/${studentId}`; // This is student_id coming from response
  //     } else {
  //       toast.error("Failed to submit application!");
  //     }
  //   } catch (err) {
  //     toast.error("Student not found!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCounselingRejected = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await RejectApplication(studentId);
      if (response.statusCode === 200) {
        toast.success("Application rejected successfully!");
        window.location.href = "/student/reject";
      } else {
        toast.error("Failed to reject application!");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
          Failed to load student information. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fff]">
      <div className="h-full border rounded-lg">
        <h1 className="font-bold text-2xl p-4 font-sans tracking-wider">
          Student Information
        </h1>
        <div className="flex flex-col md:flex-row gap-5 items-center p-4">
          <Image
            src={student?.student_photo}
            alt="student_photo"
            width={500}
            height={500}
            className="w-[1.5in] h-[2in] object-cover object-center border-2"
          />
          <div className="font-semibold text-lg">{basicSection(data)}</div>
        </div>
        <div className="grid grid-cols-1 p-4 h-full gap-8">
          {additionalSection(data)}
          {AdmissionInfo(data)}
          <div className="grid lg:grid-cols-2 gap-5">
            {fatherInfo(data)}
            {motherInfo(data)}
          </div>
          {guardianInfo(data)}
          <div className="grid lg:grid-cols-2 gap-5">
            {currentAddressInfo(data)}
            {permanentAddressInfo(data)}
          </div>
          {academyInfo(data)}
          <div className="grid lg:grid-cols-2 gap-5">
            {medInfo(data)}
            {otherInfo(data)}
          </div>
          {bankInfo(data)}
        </div>
        <div className="w-full flex justify-between items-center gap-4 p-6">
          <div>
            {data?.application_status === "UNDER-COUNSELLING" && (
              <Button
                variant="destructive"
                onClick={handleCounselingRejected}
                disabled={loading}>
                {loading ? (
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
                        d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.062l1.304 1.304C15.375 19.5 13.75 20 12 20c-4.418 0-8-3.582-8-8z"></path>
                    </svg>
                    Rejecting...
                  </span>
                ) : (
                  "Reject Application"
                )}
              </Button>
            )}
          </div>

          <div className="w-full flex justify-end gap-4">
            {data?.application_status === "UNDER-COUNSELLING" && (
              <Link
                href={`/student/approve-student/${studentId}`}
                title="Edit Application Assign Class, Section & Fee">
                <Button color="primary">Edit Application</Button>
              </Link>
            )}
            {/* {data?.application_status === "APPROVED" && (
              // <Link href={`/student/upload-documents/${studentId}`}>
              <Button color="primary" onClick={handleWithoutEditApplication}>
                Submit & Upload Documents
              </Button>
              // </Link>
            )} */}
            {/* {data?.application_status === "UNDER-COUNSELLING" && (
              <Button
                color="primary"
                onClick={handleCounselingDone}
                disabled={loading}>
                {loading ? (
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
                        d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.062l1.304 1.304C15.375 19.5 13.75 20 12 20c-4.418 0-8-3.582-8-8z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Approve (Counseling done)"
                )}
              </Button>
            )} */}
            {data?.application_status != "APPROVED" && (
              <ApproveDialog
                docId={studentId}
                applicationStatus={data?.application_status}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const basicSection = (data: any) => {
  const student = data?.student_details;

  const addressData = data?.communication_address?.current_address;

  const address = `${addressData?.village || "n/a"}, ${
    addressData?.post_office || "n/a"
  }, ${addressData?.police_station || "n/a"}, ${
    addressData?.district || "n/a"
  }, ${addressData?.state || "n/a"}, ${addressData?.postal_code || "n/a"}`;

  const capitalizeFirstLetter = (fullName: string) => {
    if (!fullName) return "";
    return fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase();
  };

  const fullName =
    (student?.first_name ? student.first_name : "") +
    (student?.middle_name ? " " + student.middle_name : "") +
    (student?.last_name ? " " + student.last_name : "");

  const capitalFullName = capitalizeFirstLetter(fullName);

  return (
    <div className="text-xs md:text-[14px]">
      <table className="min-w-full">
        <tbody>
          <tr>
            <td className="pr-4 py-2 font-semibold">Student Name:</td>
            <td className="text-base md:text-xl md:px-4 py-2">
              <div className="flex">
                {capitalFullName || "Name not found"}
                <span
                  className={`hidden md:block relative -top-1 text-[10px] text-xs ml-5 self-start px-3 mpy-0.5 rounded-full ${
                    data?.application_status === "PENDING" &&
                    "bg-[#FFFF00] text-black"
                  } ${
                    data?.application_status === "ARCHIVED" &&
                    "bg-red-500 text-white"
                  } ${
                    data?.application_status === "UNDER-COUNSELLING" &&
                    "bg-[#222e8b] text-white"
                  } ${
                    data?.application_status === "APPROVED" &&
                    "bg-[#228B22] text-white"
                  }`}>
                  {`Application ${
                    data?.application_status?.toLowerCase() || ""
                  }`}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Gender:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {data?.student_details?.gender || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Date of Birth:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {formatDate(data?.student_details?.date_of_birth) || "n/a"}{" "}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Class:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {student?.class || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Guardian:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {data?.parent_guardian_details?.guardian_information.name ||
                "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Phone:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {data?.parent_guardian_details?.guardian_information
                ?.contact_no || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Address:</td>
            <td className="md:px-4 py-1 text-xs sm:text-[14px] font-[700]">
              {address}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AdmissionInfo = (data: any) => {
  const student = data?.student_details;

  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Admission Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="Class (want to join)"
          value={student?.class || "N/A"}
        />
        <InputField
          label="Academic Era"
          value={student?.academic_era || "N/A"}
        />
      </div>
    </div>
  );
};

const additionalSection = (data: any) => {
  const student = data?.student_details;

  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Additional Information of Student
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <InputField label="Religion" value={student?.religion || "N/A"} />
        <InputField label="Hobbies" value={student?.hobbies || "N/A"} />
        <InputField
          label="Birth Certificate Number"
          value={student?.birth_certificate_number || "N/A"}
        />
        <InputField label="Birth Place" value={student?.birth_place || "N/A"} />
        <InputField label="Caste" value={student?.caste || "N/A"} />
        <InputField
          label="Caste Certificate Number"
          value={student?.caste_certificate_number || "N/A"}
        />
        <InputField
          label="Aadhaar Number"
          value={student?.aadhaar_number || "N/A"}
        />
        <InputField
          label="PWD Certificate Number"
          value={student?.pwd_certificate_number || "N/A"}
        />
        <InputField
          label="Mother Tongue"
          value={student?.mother_tongue || "N/A"}
        />
        <InputField
          label="Language Spoken at Home"
          value={student?.language_spoken_at_home || "N/A"}
        />
      </div>
    </div>
  );
};

const fatherInfo = (data: any) => {
  const father = data?.parent_guardian_details?.father_information;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Father Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-col-2 gap-5">
        <InputField label="Father Name" value={father?.name} />
        <InputField label="Father Occupation" value={father?.occupation} />
        <InputField
          label="Father Qualification"
          value={father?.qualification}
        />
        <InputField label="Annual Income." value={father?.annual_income} />
        <InputField label="Phone No." value={father?.contact_no} />
        <InputField label="Whatsapp No." value={father?.whatsapp_no || "N/A"} />
        <InputField label="Email" value={father?.email || "N/A"} />
      </div>
    </div>
  );
};

const motherInfo = (data: any) => {
  const mother = data?.parent_guardian_details?.mother_information;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Mother Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-col-2 gap-5">
        <InputField label="Mother Name" value={mother?.name} />
        <InputField label="Mother Occupation" value={mother?.occupation} />
        <InputField
          label="Mother Qualification"
          value={mother?.qualification}
        />
        <InputField label="Annual Income." value={mother?.annual_income} />
        <InputField label="Phone No." value={mother?.contact_no} />
        <InputField label="Whatsapp No." value={mother?.whatsapp_no || "N/A"} />
        <InputField label="Email" value={mother?.email || "N/A"} />
      </div>
    </div>
  );
};

const guardianInfo = (data: any) => {
  const student = data?.parent_guardian_details?.guardian_information;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Guardian Information
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <InputField label="Name" value={student?.name} />
          <InputField label="Relation" value={student?.relationship} />
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <InputField label="Email" value={student?.email} />
          <InputField label="Phone" value={student?.contact_no} />
          <InputField label="WhatsApp" value={student?.whatsapp_no} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <InputField label="Income" value={`₹${student?.annual_income}`} />
          <InputField label="Qualification" value={student?.qualification} />
        </div>
      </div>
    </div>
  );
};

const currentAddressInfo = (data: any) => {
  const address = data?.communication_address?.current_address;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Current Address Details
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-3 gap-5">
          <InputField label="Village" value={address?.village || "n/a"} />
          <InputField
            label="Post Office"
            value={address?.post_office || "n/a"}
          />
          <InputField
            label="Police Station"
            value={address?.police_station || "n/a"}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          <InputField label="District" value={address?.district || "n/a"} />
          <InputField label="State" value={address?.state || "n/a"} />
          <InputField label="Country" value={address?.country || "n/a"} />
        </div>
        <InputField
          label="Postal Code / Zone Code"
          value={address?.postal_code || "n/a"}
        />
      </div>
    </div>
  );
};

const permanentAddressInfo = (data: any) => {
  const address = data?.communication_address?.permanent_address;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Permanent Address Details
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-3 gap-5">
          <InputField label="Village" value={address?.village || "n/a"} />
          <InputField
            label="Post Office"
            value={address?.post_office || "n/a"}
          />
          <InputField
            label="Police Station"
            value={address?.police_station || "n/a"}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          <InputField label="District" value={address?.district || "n/a"} />
          <InputField label="State" value={address?.state || "n/a"} />
          <InputField label="Country" value={address?.country || "n/a"} />
        </div>
        <InputField
          label="Postal Code / Zone Code"
          value={address?.postal_code || "n/a"}
        />
      </div>
    </div>
  );
};

const academyInfo = (data: any) => {
  const previousInstitute = data?.other_details?.previous_institute_details;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-gray-600 mb-5 text-lg">
        Previous Institute Details
      </h3>
      <div className="flex flex-col gap-5">
        <InputField
          label="Previous School Name"
          value={previousInstitute?.institute_name}
        />
        <div className="grid md:grid-cols-3 gap-5">
          <InputField
            label="Previous Class"
            value={previousInstitute?.previous_class}
          />
          <InputField
            label="Previous Section"
            value={previousInstitute?.previous_section}
          />
          <InputField
            label="Previous Roll Number"
            value={previousInstitute?.previous_roll_no}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <InputField
            label="Board Affiliation"
            value={previousInstitute?.board_affiliation}
          />
          <InputField
            label="TC Submitted"
            value={
              data?.other_details?.previous_institute_details?.tc_submitted
                ? "Tc submitted"
                : "Tc not submitted"
            }
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <InputField
            label="From (yyyy/mm/dd)"
            value={previousInstitute?.previous_from_date}
          />
          <InputField
            label="To (yyyy/mm/dd)"
            value={previousInstitute?.previous_to_date}
          />
        </div>
        <InputField
          label="Reason of Leaving"
          value={previousInstitute?.reason_for_leaving}
        />
      </div>
    </div>
  );
};

const medInfo = (data: any) => {
  const med = data?.other_details?.medical_details;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Medical Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <InputField label="Blood Group" value={med?.blood_group || "n/a"} />
        <InputField label="Height" value={`${med?.height || "n/a"} cm`} />
        <InputField label="Weight" value={`${med?.weight || "n/a"} kg`} />
        <InputField
          label="Allergic Details"
          value={med?.allergies?.details || "N/A"}
        />
        <InputField
          label="Medical Condition"
          value={med?.special_medical_conditions?.details || "N/A"}
        />

        <InputField
          label="Regular Medication Details"
          value={med?.regular_medication?.details || "N/A"}
        />
        <InputField
          label="Spacial Assistance"
          value={med?.special_assistance?.details || "N/A"}
        />
        <InputField
          label="Is Specially Abled?"
          value={
            data?.student_details?.is_specially_abled === "No"
              ? "N/A"
              : "Yes (PWD Certificate No.: " +
                data?.student_details?.pwd_certificate_number +
                ")"
          }
        />
      </div>
    </div>
  );
};

const otherInfo = (data: any) => {
  const applicationData = data;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Application Information (Status)
      </h3>
      <div className="flex flex-col gap-5">
        <InputField
          label="Payment Status"
          value={applicationData?.payment_status}
        />
        <InputField
          label="Application Status"
          value={applicationData?.application_status}
        />
      </div>
    </div>
  );
};

const bankInfo = (data: any) => {
  const bank = data?.bank_details;
  return (
    <div className="p-6 border-2 rounded-lg text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-10">
        Bank Information
      </h3>
      <div className="">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <InputField
            label="Account No"
            value={bank?.account_no || "Not provided"}
          />
          <InputField
            label="IFSC Code"
            value={bank?.ifsc_code || "Not provided"}
          />
          <InputField
            label="Bank Name"
            value={bank?.bank_name || "Not provided"}
          />
          <InputField
            label="Account Holder Name"
            value={bank?.account_holder_name || "Not provided"}
          />
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value }: { label: string; value: string }) => (
  <div className="input flex flex-col w-full text-[13.5px]">
    <label className="text-gray-500 font-semibold w-fit mb-2">{label} :</label>
    <input
      value={value}
      readOnly
      className={`${
        value == "" ? "border-2 border-red-500" : "border-2"
      } px-[10px] text-gray-700 py-[10px] bg-[#fff] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-auto cursor-not-allowed`}
    />
  </div>
);
