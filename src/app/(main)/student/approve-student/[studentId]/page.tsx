"use client";

import { useEffect, useState } from "react";
import { GetStudentById } from "@/lib/actions/student.action";
import PageLoader from "@/components/ui-components/PageLoading";
import { Link } from "lucide-react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

// Types Start ---------------------------------------------
interface StudentDetails {
  _id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // Consider using Date type if you will handle dates
  gender: string;
  class: string;
  caste: string;
  hobbies: string;
  religion: string;
  talent: string;
  student_photo: any;
}

interface BankDetails {
  _id: string;
  account_holder_name: string;
  account_no: string;
  bank_name: string;
  ifsc_code: string;
}

interface ParentGuardianDetails {
  father_information: { name: string; occupation: string; contact_no: string };
  mother_information: { name: string; occupation: string; contact_no: string };
  guardian_information: {
    name: string;
    relationship: string;
    contact_no: string;
  };
}

interface CommunicationAddress {
  current_address: {
    _id: string;
    country: string;
    state: string;
    district: string;
    police_station: string;
    post_office: string;
    postal_code: string;
    village: string;
  };
  permanent_address: {
    _id: string;
    country: string;
    state: string;
    district: string;
    police_station: string;
    post_office: string;
    postal_code: string;
    village: string;
  };
}

interface OtherDetails {
  previous_institute_details: {
    _id: string;
    institute_name: string;
    board_affiliation: string;
    previous_class: string;
    tc_submitted: boolean;
  };
  medical_details: {
    _id: string;
    blood_group: string;
    height: string;
    weight: string;
    allergies: { status: boolean; details: string };
    regular_medication: { status: boolean; details: string };
    special_assistance: { status: boolean; details: string };
    special_medical_conditions: { status: boolean; details: string };
  };
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

// InputField.tsx
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
}) => (
  <div className="input flex flex-col w-full mb-4">
    <label className="text-black font-medium tracking-wider w-fit mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border-gray-300 px-[10px] py-[16px] bg-[#fff] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold font-sans text-[13px] tracking-widest overflow-scroll"
    />
  </div>
);

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [className, setClassName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [talent, setTalent] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await GetStudentById(studentId);
        setData(studentData);
        if (studentData) {
          // Update state with student data
          setFirstName(studentData.student_details.first_name);
          setLastName(studentData.student_details.last_name);
          setClassName(studentData.student_details.class);
          setDob(studentData.student_details.date_of_birth);
          setGender(studentData.student_details.gender);
          setReligion(studentData.student_details.religion);
          setCaste(studentData.student_details.caste);
          setHobbies(studentData.student_details.hobbies);
          setTalent(studentData.student_details.talent);
          setImagePath(studentData.student_details.student_photo || "");
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
    <div className="bg-[#fff] p-8 rounded-lg">
      <h1 className="text-2xl font-semibold mb-20 text-gray-600">
        Showing All Details of{" "}
        {data?.student_details?.first_name +
          " " +
          data?.student_details?.last_name}
      </h1>
      <form className="">
        {/* Class and Date of Birth */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-3">
          {/* First Name */}
          <InputField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Class */}
          <div className="input flex flex-col w-full mb-4">
            <label
              htmlFor="class"
              className="text-black font-medium tracking-wider w-fit mb-1.5">
              Class<span className="text-red-500">*</span>:
            </label>
            <select
              id="class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                className ? "" : "border-red-500"
              } border-gray-300 input px-[10px] py-[16px] bg-[#fff] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold font-sans text-[13px] tracking-widest overflow-scroll`}>
              <option value="" disabled>
                Select Class
              </option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
            </select>
          </div>

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            value={dob}
            type="date"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Gender, Religion, Caste */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-3">
          {/* Gender */}
          <div>
            <label className="block mb-2 text-gray-700">
              Gender<span className="text-red-500">*</span>:
            </label>
            <div className="flex space-x-4">
              <div>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  className="mr-2"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <label htmlFor="male" className="text-gray-700">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  className="mr-2"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                <label htmlFor="female" className="text-gray-700">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  value="other"
                  className="mr-2"
                  checked={gender === "other"}
                  onChange={() => setGender("other")}
                />
                <label htmlFor="other" className="text-gray-700">
                  Others
                </label>
              </div>
            </div>
          </div>

          {/* Religion */}
          <InputField
            label="Religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />

          {/* Caste */}
          <InputField
            label="Caste"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
          />
        </div>

        {/* Hobbies and Talent */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Hobbies */}
          <InputField
            label="Hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />

          {/* Talent */}
          <InputField
            label="Talent"
            value={talent}
            onChange={(e) => setTalent(e.target.value)}
          />
        </div>

        {/* Upload Student Photo */}
        <div>
          <label htmlFor="photo" className="block mb-2 text-gray-700">
            Student Photo<span className="text-red-500">*</span>:
          </label>

          <input
            type="file"
            id="photo"
            name="student_image"
            accept="image/png,image/jpg,image/jpeg"
            className={`w-full p-2 border rounded-md`}
          />

          <div className="mt-4">
            {imagePath && (
              <Image
                src={imagePath}
                alt="Student Photo"
                width={200}
                height={200}
                className="object-cover rounded"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// ------------------------------

// <h2 className="text-2xl font-semibold mb-4 text-gray-600">
//   Parent and Guardian Details
// </h2>

// {/* Father's Details */}
// <div>
//   <h3 className="text-lg font-semibold text-gray-700">
//     Father's Information
//   </h3>
//   <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-4">
//     {/* Father's Name */}
//     <div>
//       <label htmlFor="fatherName" className="block mb-2 text-gray-700">
//         Father's Name<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="fatherName"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Father's Occupation */}
//     <div>
//       <label
//         htmlFor="fatherOccupation"
//         className="block mb-2 text-gray-700">
//         Father's Occupation<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="fatherOccupation"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>
//   </div>

//   {/* Father's Phone Number */}
//   <div className="mt-4">
//     <label htmlFor="fatherPhone" className="block mb-2 text-gray-700">
//       Father's Phone Number<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="fatherPhone" // Fixed id
//       className={`w-full p-2 border rounded-md border-gray-300`}
//     />
//   </div>
// </div>

// {/* Mother's Details */}
// <div>
//   <h3 className="text-lg font-semibold text-gray-700">
//     Mother's Information
//   </h3>
//   <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-4">
//     {/* Mother's Name */}
//     <div>
//       <label htmlFor="motherName" className="block mb-2 text-gray-700">
//         Mother's Name<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="motherName" // Fixed id
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Mother's Occupation */}
//     <div>
//       <label
//         htmlFor="motherOccupation"
//         className="block mb-2 text-gray-700">
//         Mother's Occupation<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="motherOccupation"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Mother's Phone Number */}
//   <div className="mt-4">
//     <label htmlFor="motherPhone" className="block mb-2 text-gray-700">
//       Mother's Phone Number<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="motherPhone" // Fixed id
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>
// </div>

// {/* Guardian's Details */}
// <div>
//   <h3 className="text-lg font-semibold text-gray-700">
//     Guardian's Information
//   </h3>
//   <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-4">
//     {/* Guardian's Name */}
//     <div>
//       <label
//         htmlFor="guardianName"
//         className="block mb-2 text-gray-700">
//         Guardian's Name<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="guardianName" // Fixed id
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Guardian's Relation to Child */}
//     <div>
//       <label
//         htmlFor="guardianRelation"
//         className="block mb-2 text-gray-700">
//         Guardian's Relation to Child
//         <span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="guardianRelation"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Guardian's Phone Number */}
//   <div className="mt-4">
//     <label htmlFor="guardianPhone" className="block mb-2 text-gray-700">
//       Guardian's Phone Number<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="guardianPhone" // Fixed id
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>

//   {/* Guardian's WhatsApp Number */}
//   <div className="mt-4">
//     <label
//       htmlFor="guardianWhatsApp"
//       className="block mb-2 text-gray-700">
//       Guardian's WhatsApp Number
//       <span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="guardianWhatsApp"
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>

//   {/* Guardian's Email ID */}
//   <div className="mt-4">
//     <label htmlFor="guardianEmail" className="block mb-2 text-gray-700">
//       Guardian's Email ID<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="email"
//       id="guardianEmail" // Fixed id
//       className={`w-full p-2 border rounded-md border-gray-300`}
//     />
//   </div>

//   {/* Guardian's Qualification and Occupation */}
//   <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-4">
//     {/* Guardian's Qualification */}
//     <div>
//       <label
//         htmlFor="guardianQualification"
//         className="block mb-2 text-gray-700">
//         Guardian's Qualification
//         <span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="guardianQualification"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Guardian's Occupation */}
//     <div>
//       <label
//         htmlFor="guardianOccupation"
//         className="block mb-2 text-gray-700">
//         Guardian's Occupation<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="guardianOccupation"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Guardian's Annual Income */}
//   <div className="mt-4">
//     <label
//       htmlFor="guardianIncome"
//       className="block mb-2 text-gray-700">
//       Guardian's Annual Income<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="guardianIncome"
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>
// </div>

// <h2 className="text-2xl font-semibold mb-4 text-gray-600">
//   Communication Address
// </h2>
// {/* Current Address */}
// <div>
//   <h3 className="text-lg font-semibold text-gray-700">
//     Current Address
//   </h3>
//   <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-4">
//     {/* Country */}
//     <div>
//       <label
//         htmlFor="currentCountry"
//         className="block mb-2 text-gray-700">
//         Country<span className="text-red-500">*</span>:
//       </label>
//       <select
//         id="currentCountry"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//         defaultValue="IN">
//         <option value="">Select Country</option>
//         <option></option>
//       </select>
//     </div>

//     {/* State */}
//     <div>
//       <label
//         htmlFor="currentState"
//         className="block mb-2 text-gray-700">
//         State<span className="text-red-500">*</span>:
//       </label>
//       <select
//         id="currentState"
//         className={`w-full p-2 border rounded-md border-gray-300`}>
//         <option value="">Select State</option>
//         <option></option>
//       </select>
//     </div>

//     {/* District */}
//     <div>
//       <label
//         htmlFor="currentDistrict"
//         className="block mb-2 text-gray-700">
//         District<span className="text-red-500">*</span>:
//       </label>
//       <select
//         id="currentDistrict"
//         className={`w-full p-2 border rounded-md border-gray-300`}>
//         <option value="">Select District</option>
//         <option></option>
//       </select>
//     </div>
//   </div>

//   <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-4">
//     {/* Village */}
//     <div>
//       <label
//         htmlFor="currentVillage"
//         className="block mb-2 text-gray-700">
//         Village<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="currentVillage"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>

//     {/* Post Office */}
//     <div>
//       <label
//         htmlFor="currentPostOffice"
//         className="block mb-2 text-gray-700">
//         Post Office<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="currentPostOffice"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>

//     {/* Police Station */}
//     <div>
//       <label
//         htmlFor="currentPoliceStation"
//         className="block mb-2 text-gray-700">
//         Police Station<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="currentPoliceStation"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>

//     <div>
//       <label
//         htmlFor="currentPotalCode"
//         className="block mb-2 text-gray-700">
//         Postal Code<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="currentPotalCode"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>
//   </div>
// </div>

// <h2 className="text-2xl font-semibold mb-4 text-gray-600">
//   Other Details
// </h2>
// <h3 className="text-lg font-semibold text-gray-700">
//   Previous Institute Details
// </h3>
// {/* Previous School Details */}
// <div>
//   <label className="block mb-2 text-gray-700">
//     Has there been prior enrollment in another school?
//     <span className="text-red-500">*</span>:
//   </label>
//   <div className="flex items-center space-x-4">
//     <label className="inline-flex items-center">
//       <input type="radio" value="yes" className="form-radio" />
//       <span className="ml-2">Yes</span>
//     </label>
//     <label className="inline-flex items-center">
//       <input type="radio" value="no" className="form-radio" />
//       <span className="ml-2">No</span>
//     </label>
//   </div>

//   <div className="mt-4 space-y-4">
//     <div>
//       <label
//         htmlFor="previousSchoolName"
//         className="block text-gray-700">
//         Name Of The School
//         <span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="previousSchoolName"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>

//     <div>
//       <label htmlFor="boardAffiliation" className="block text-gray-700">
//         Board Affiliation<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="boardAffiliation"
//         className={`w-full p-2 border rounded-md border-gray-300`}
//       />
//     </div>

//     <div>
//       <label htmlFor="previousClass" className="block text-gray-700">
//         Previous Class<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="previousClass"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     <div>
//       <label className="block text-gray-700">
//         TC Submitted<span className="text-red-500">*</span>:
//       </label>
//       <div className="flex items-center space-x-4">
//         <label className="inline-flex items-center">
//           <input type="radio" value="yes" className="form-radio" />
//           <span className="ml-2">Yes</span>
//         </label>
//         <label className="inline-flex items-center">
//           <input type="radio" value="no" className="form-radio" />
//           <span className="ml-2">No</span>
//         </label>
//       </div>
//     </div>
//   </div>
// </div>

// {/* Medical Details */}
// <div>
//   <div>
//     <h3 className="text-lg font-semibold text-gray-700">
//       Medical Details
//     </h3>
//     <div className="mt-4">
//       <label htmlFor="bloodGroup" className="block mb-2 text-gray-700">
//         Blood Group<span className="text-red-500">*</span>:
//       </label>
//       <select
//         id="bloodGroup"
//         className={`w-full p-2 border rounded-md border-red-500`}>
//         <option value="">Select Blood Group</option>
//         <option value="A+">A positive (A+)</option>
//         <option value="A-">A negative (A-)</option>
//         <option value="B+">B positive (B+)</option>
//         <option value="B-">B negative (B-)</option>
//         <option value="O+">O positive (O+)</option>
//         <option value="O-">O negative (O-)</option>
//         <option value="AB+">AB positive (AB+)</option>
//         <option value="AB-">AB negative (AB-)</option>
//       </select>
//     </div>
//   </div>

//   {/* Known Allergies */}
//   <div className="mt-4">
//     <label className="block mb-2 text-gray-700">
//       Any Known Allergies?<span className="text-red-500">*</span>:
//     </label>
//     <div className="flex items-center space-x-4">
//       <label className="inline-flex items-center">
//         <input type="radio" value="yes" className="form-radio" />
//         <span className="ml-2">Yes</span>
//       </label>
//       <label className="inline-flex items-center">
//         <input type="radio" value="no" className="form-radio" />
//         <span className="ml-2">No</span>
//       </label>
//     </div>

//     <div className="mt-4">
//       <label htmlFor="allergiesDetails" className="block text-gray-700">
//         Details<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="allergiesDetails"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Medical Condition */}
//   <div className="mt-4">
//     <label className="block mb-2 text-gray-700">
//       Special Medical Condition?
//       <span className="text-red-500">*</span>:
//     </label>
//     <div className="flex items-center space-x-4">
//       <label className="inline-flex items-center">
//         <input type="radio" value="yes" className="form-radio" />
//         <span className="ml-2">Yes</span>
//       </label>
//       <label className="inline-flex items-center">
//         <input type="radio" value="no" className="form-radio" />
//         <span className="ml-2">No</span>
//       </label>
//     </div>

//     <div className="mt-4">
//       <label
//         htmlFor="medicalConditionDetails"
//         className="block text-gray-700">
//         Details<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="medicalConditionDetails"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Regular Medications */}
//   <div className="mt-4">
//     <label className="block mb-2 text-gray-700">
//       Regular Medications?<span className="text-red-500">*</span>:
//     </label>
//     <div className="flex items-center space-x-4">
//       <label className="inline-flex items-center">
//         <input type="radio" value="yes" className="form-radio" />
//         <span className="ml-2">Yes</span>
//       </label>
//       <label className="inline-flex items-center">
//         <input type="radio" value="no" className="form-radio" />
//         <span className="ml-2">No</span>
//       </label>
//     </div>

//     <div className="mt-4">
//       <label
//         htmlFor="medicationsDetails"
//         className="block text-gray-700">
//         Details<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="medicationsDetails"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Special Assistance Needed */}
//   <div className="mt-4">
//     <label className="block mb-2 text-gray-700">
//       Special Assistance Needed?
//       <span className="text-red-500">*</span>:
//     </label>
//     <div className="flex items-center space-x-4">
//       <label className="inline-flex items-center">
//         <input type="radio" value="yes" className="form-radio" />
//         <span className="ml-2">Yes</span>
//       </label>
//       <label className="inline-flex items-center">
//         <input type="radio" value="no" className="form-radio" />
//         <span className="ml-2">No</span>
//       </label>
//     </div>

//     <div className="mt-4">
//       <label
//         htmlFor="assistanceDetails"
//         className="block text-gray-700">
//         Details<span className="text-red-500">*</span>:
//       </label>
//       <input
//         type="text"
//         id="assistanceDetails"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>
//   </div>

//   {/* Height */}
//   <div className="mt-4">
//     <label htmlFor="height" className="block mb-2 text-gray-700">
//       Height<span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="height"
//       placeholder="Height in cm"
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>

//   {/* Weight */}
//   <div className="mt-4">
//     <label htmlFor="weight" className="block mb-2 text-gray-700">
//       Weight as on {new Date().toLocaleDateString()}{" "}
//       <span className="text-red-500">*</span>:
//     </label>
//     <input
//       type="text"
//       id="weight"
//       placeholder="Weight in kg"
//       className={`w-full p-2 border rounded-md border-red-500`}
//     />
//   </div>
// </div>

// {/* Bank Details Section */}
// <div>
//   <h3 className="text-lg font-semibold text-gray-700 mt-6">
//     Bank Details
//   </h3>
//   <div className="mt-4 space-y-4">
//     {/* Account Holder Name */}
//     <div>
//       <label
//         htmlFor="accountHolderName"
//         className="block text-gray-700">
//         Account Holder Name :
//       </label>
//       <input
//         type="text"
//         id="accountHolderName"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Account Number */}
//     <div>
//       <label htmlFor="accountNumber" className="block text-gray-700">
//         Account Number :
//       </label>
//       <input
//         type="text"
//         id="accountNumber"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* Bank Name */}
//     <div>
//       <label htmlFor="bankName" className="block text-gray-700">
//         Bank Name :
//       </label>
//       <input
//         type="text"
//         id="bankName"
//         className={`w-full p-2 border rounded-md border-red-500`}
//       />
//     </div>

//     {/* IFSC Code */}
//     <div>
//       <label htmlFor="ifscCode" className="block text-gray-700">
//         IFSC Code :
//       </label>
//       <input
//         type="text"
//         id="ifscCode"
//         className={`w-full p-2 border rounded-md "border-gray-300`}
//         maxLength={11}
//       />
//     </div>
//   </div>
// </div>
