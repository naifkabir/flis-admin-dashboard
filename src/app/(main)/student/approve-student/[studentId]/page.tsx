"use client";

import { useEffect, useState } from "react";
import { GetStudentById } from "@/lib/actions/student.action";
import PageLoader from "@/components/ui-components/PageLoading";
import { Link } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";

// Types Start ---------------------------------------------
interface StudentDetails {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  class: string;
  gender: string;
  religion: string;
  caste: string;
  hobbies: string;
  talent: string;
  student_photo: File[]; // Change to File[] for multiple images
}

interface ParentGuardianDetails {
  father_information: {
    name: string;
    occupation: string;
    contact_no: string;
  };
  mother_information: {
    name: string;
    occupation: string;
    contact_no: string;
  };
  guardian_information: {
    name: string;
    relationship: string;
    contact_no: string;
    whatsapp_no: string;
    email: string;
    qualification: string;
    occupation: string;
    annual_income: string;
  };
}

interface CommunicationAddress {
  current_address: {
    country: string;
    state: string;
    district: string;
    village: string;
    post_office: string;
    police_station: string;
    postal_code: string;
  };
  permanent_address: {
    country: string;
    state: string;
    district: string;
    village: string;
    post_office: string;
    police_station: string;
    postal_code: string;
  };
}

interface OtherDetails {
  previous_institute_details: {
    studiedPreviously: string;
    institute_name: string;
    board_affiliation: string;
    previous_class: string;
    tc_submitted: boolean;
  };
  medical_details: {
    blood_group: string;
    allergies: {
      details: string;
      status: boolean;
    };
    special_medical_conditions: {
      details: string;
      status: boolean;
    };
    regular_medication: {
      details: string;
      status: boolean;
    };
    special_assistance: {
      details: string;
      status: boolean;
    };
    height: string;
    weight: string;
  };
}

interface BankDetails {
  account_holder_name: string;
  account_no: string;
  bank_name: string;
  ifsc_code: string;
}

interface TransactionDetails {
  MUID: string;
  transactionId: string;
  amount: string;
  name: string;
  mobile: string;
}

interface StructuredData {
  student_details: StudentDetails;
  parent_guardian_details: ParentGuardianDetails;
  communication_address: CommunicationAddress;
  other_details: OtherDetails;
  bank_details: BankDetails;
  transaction_details: TransactionDetails;
}

interface StudentData {
  _id: string;
  student_details: StudentDetails;
  bank_details: BankDetails;
  parent_guardian_details: ParentGuardianDetails;
  communication_address: CommunicationAddress;
  other_details: OtherDetails;
  payment_status: string;
  application_status: string;
  counselling_status: string;
  counselling_time: string;
  counselling_date: string;
  createdAt: string;
}
// Types End -----------------------------------------------

// Main Function Start ------------------------------------

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params; // Get student id from url

  // States
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for inputs ------------------------------------
  const [imagePath, setImagePath] = useState("");
  const [dob, setDob] = useState(""); // Store DOB in YYYY-MM-DD
  const [age, setAge] = useState<number | null>(null); // State for age

  const [allergies, setAllergies] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [regularMedication, setRegularMedication] = useState("");
  const [specialAssistance, setSpecialAssistance] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  // State to handle file uploads
  const [files, setFiles] = useState({
    pdfFile: null,
    imageFile: null,
  });

  // Get Student Data Start --------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await GetStudentById(studentId);
        setData(studentData);
        if (studentData) {
          setImagePath(studentData.student_details.student_photo);
          // Medical Details
          setAllergies(
            studentData.other_details.medical_details.allergies.details
          );
          setMedicalCondition(
            studentData.other_details.medical_details.special_medical_conditions
              .details
          );
          setRegularMedication(
            studentData.other_details.medical_details.regular_medication.details
          );
          setSpecialAssistance(
            studentData.other_details.medical_details.special_assistance.details
          );
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const [errors, setErrors] = useState({});

  // Calculate Student's Age Based on Current Date ---------------------
  const calculateAge = (dob: string) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const calculatedAge = calculateAge(dob);
    setAge(calculatedAge);
  }, [dob]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("");
    } catch (error: any) {
      console.error("Validation or submission error:", error);
      setErrors(error.errors || {});
    }
  };
  // ------------------------------------

  if (!data) {
    return (
      <div className="w-full bg-[#414141] text-white font-bold h-screen flex justify-center items-center text-center gap-4">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="grid gap-10">
        <div className="mb-8 grid grid-cols-2">
          <h1 className="text-2xl font-semibold mb-16 text-gray-600 uppercase">
            Showing All Details of -
            <span className="ml-1">
              {data.student_details.first_name +
                " " +
                data.student_details.last_name}
            </span>
          </h1>
          <Image
            src={imagePath}
            width={500}
            height={500}
            alt="Student Photo"
            className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030] justify-self-end"></Image>
        </div>
        {/* Student Details */}
        <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
          <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
            Student Details
          </h2>
          {/* First Name */}
          <InputField
            label="First Name"
            name="first_name"
            value={data.student_details.first_name}
            disabled={!isEditable}
            type="text"
          />
          {/* Last Name */}
          <InputField
            name="last_name"
            label="Last Name"
            value={data.student_details.last_name}
            disabled={!isEditable}
            type="text"
          />

          {/* Date of Birth */}
          <div>
            <InputField
              name="date_of_birth"
              disabled={!isEditable}
              label="Date of Birth"
              value={dob} // Bind to the YYYY-MM-DD format for input
              type="date"
            />
            {age !== null && (
              <div className="mt-2 text-[12px] text-gray-600 rounded-sm bg-yellow-400 max-w-fit py-0.5 px-1.5">
                Age: {age}
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="input flex flex-col w-full mb-4 text-[13.5px]">
            <label
              htmlFor="gender"
              className="text-gray-700 font-medium w-fit mb-2">
              Gender<span className="text-red-500">*</span>:
            </label>
            <select
              id="gender"
              disabled={!isEditable}
              value={data.student_details.gender}
              className={`w-full p-2 border rounded-md ${
                data.student_details.gender ? "" : "border-red-500"
              } px-[10px] text-gray-600 py-[10px] bg-[#fff] border rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll`}>
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Religion */}
          <InputField
            name=""
            type="text"
            disabled={!isEditable}
            label="Religion"
            value={data.student_details.religion}
          />

          {/* Caste */}
          <InputField
            name=""
            type="text"
            disabled={!isEditable}
            label="Caste"
            value={data.student_details.caste}
          />

          {/* Blood Group */}
          <div className="input flex flex-col w-full mb-4 text-[13.5px]">
            <label
              htmlFor="blood_group"
              className="text-gray-700 font-medium w-fit mb-2">
              Blood Group<span className="text-red-500">*</span>:
            </label>
            <select
              id="blood_group"
              disabled={!isEditable}
              value={data.other_details.medical_details.blood_group}
              className={`w-full p-2 border rounded-md ${
                data.other_details.medical_details.blood_group
                  ? ""
                  : "border-red-500"
              } px-[10px] text-gray-600 py-[10px] bg-[#fff] border rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll`}>
              <option value="" disabled>
                Select blood group
              </option>
              <option value="">Select Blood Group</option>
              <option value="A+">A positive (A+)</option>
              <option value="A-">A negative (A-)</option>
              <option value="B+">B positive (B+)</option>
              <option value="B-">B negative (B-)</option>
              <option value="O+">O positive (O+)</option>
              <option value="O-">O negative (O-)</option>
              <option value="AB+">AB positive (AB+)</option>
              <option value="AB-">AB negative (AB-)</option>
            </select>
          </div>

          {/* Height */}
          <InputField
            name=""
            type="text"
            disabled={!isEditable}
            label="Height"
            value={`${data.other_details.medical_details.height} cm`}
          />

          {/* Weight */}
          <InputField
            name=""
            type="text"
            disabled={!isEditable}
            label="Weight"
            value={`${data.other_details.medical_details.weight} kg`}
          />

          {/* Hobbies and Talent */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Hobbies */}
            <InputField
              name=""
              type="text"
              disabled={!isEditable}
              label="Hobbies"
              value={data.student_details.hobbies}
            />

            {/* Talent */}
            <InputField
              name=""
              type="text"
              disabled={!isEditable}
              label="Talent"
              value={data.student_details.talent}
            />
          </div>
        </div>

        {/* Document Submission */}
        <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
          <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
            Submit Document
          </h2>
          <InputField
            name="Input multiple documents"
            type="file"
            disabled={!isEditable}
            label="Submit Document"
            value=""
          />
        </div>
        {/* ------------------------------------------ */}

        {/* Buttons Section -------------------------- */}
        <div className="mt-8 grid justify-end">
          <div className="flex items-center">
            <Button
              type="button"
              onClick={() => setIsEditable(!isEditable)}
              className={`px-4 py-2 mr-4 rounded ${
                isEditable ? "bg-red-500" : "bg-blue-500"
              } text-white`}>
              {isEditable ? "Cancel Edit" : "Edit"}
            </Button>
            {isEditable && (
              <Button
                onClick={() => setIsEditable(!isEditable)}
                className="min-w-fit px-6 bg-[#228B22] hover:bg-[#186e18]">
                Apply Changes
              </Button>
            )}

            {!isEditable && <Button type="submit">Submit</Button>}
          </div>
        </div>
      </form>
    </div>
  );
}

const InputField = ({
  label,
  value,
  disabled,
  type = "text",
  name,
}: {
  label: string;
  type: any;
  disabled: any;
  value: any;
  name: any;
}) => (
  <div className="input flex flex-col w-full text-[13.5px]">
    <label className="text-gray-500 font-semibold w-fit mb-2">
      {label}
      <span className="text-red-500">*</span> :
    </label>
    <input
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      className={`${
        value == "" ? "border-2 border-red-500" : "border-2"
      } px-[10px] text-gray-700 py-[10px] bg-[#fff] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll `}
    />
  </div>
);
