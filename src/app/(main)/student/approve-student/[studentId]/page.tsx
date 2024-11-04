// "use client";

// import { useEffect, useState } from "react";
// import { GetStudentById } from "@/lib/actions/student.action";
// import PageLoader from "@/components/ui-components/PageLoading";
// import { Link } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// // Main Function Start -------------------------------------------------

// export default function StudentInfoPage({
//   params,
// }: {
//   params: { studentId: string };
// }) {
//   const { studentId } = params; // Get student id from url

//   // State -------------------------------------------------------------
//   const [data, setData] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imagePath, setImagePath] = useState("");
//   const [age, setAge] = useState<number | null>(null);
//   const [tc, setTc] = useState("");
//   const [isEditable, setIsEditable] = useState(false);

//   // Get Student Data --------------------------------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentData = await GetStudentById(studentId);
//         if (studentData) {
//           setData(studentData);
//           setImagePath(studentData.student_details.student_photo);
//           setTc(
//             studentData.other_details.previous_institute_details.tc_submitted
//           );
//         }
//       } catch (err: any) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [studentId]);

//   // Calculate Student's Age Based on Current Date ---------------------
//   const dob = data?.student_details?.date_of_birth;
//   const calculateAge = (dob: any) => {
//     if (!dob) return null;
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };
//   useEffect(() => {
//     const calculatedAge = calculateAge(dob);
//     setAge(calculatedAge);
//   }, [dob]);

//   // Handle input change -----------------------------------------------
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prevData: any) => ({ ...prevData, [name]: value }));
//   };

//   // Submit application form -------------------------------------------
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       console.log("");
//     } catch (error: any) {
//       console.error("Validation or submission error:", error);
//     }
//   };

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
//           Failed to load student information. Please try again later.
//         </h2>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="absolute w-full bg-[#414141] text-white font-bold min-h-screen flex justify-center items-center text-center gap-4">
//         <h2>Data Not Found</h2>
//         <p>Could not find requested resource</p>
//         <Link href="/dashboard" className="text-blue-600 hover:underline">
//           Return Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 p-8 rounded-lg">
//       <form onSubmit={handleSubmit} className="grid gap-10">
//         <div className="mb-8 grid grid-cols-2">
//           <h1 className="text-2xl font-semibold mb-16 text-gray-600 uppercase">
//             Showing All Details of -
//             <span className="ml-1">
//               {data.student_details.first_name +
//                 " " +
//                 data.student_details.last_name}
//             </span>
//           </h1>
//           <Image
//             src={imagePath}
//             width={500}
//             height={500}
//             alt="Student Photo"
//             className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030] justify-self-end"></Image>
//         </div>
//         {/* Student Details */}
//         <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//           <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//             Student Details
//           </h2>
//           {/* First Name */}
//           <InputField
//             label="First Name"
//             name="first_name"
//             value={data.student_details.first_name}
//             onChange={handleChange}
//             disabled={!isEditable}
//             type="text"
//           />
//           {/* Last Name */}
//           <InputField
//             name="last_name"
//             onChange={handleChange}
//             label="Last Name"
//             value={data.student_details.last_name}
//             disabled={!isEditable}
//             type="text"
//           />

//           {/* Date of Birth */}
//           <div>
//             <InputField
//               name="date_of_birth"
//               onChange={handleChange}
//               disabled={!isEditable}
//               label="Date of Birth"
//               value={dob}
//               type="date"
//             />
//             {age !== null && (
//               <div className="mt-2 text-[12px] text-gray-600 rounded-sm bg-yellow-400 max-w-fit py-0.5 px-1.5">
//                 Age: {age}
//               </div>
//             )}
//           </div>

//           {/* Gender */}
//           <div className="input flex flex-col w-full mb-4 text-[13.5px]">
//             <label
//               htmlFor="gender"
//               className="text-gray-700 font-medium w-fit mb-2">
//               Gender<span className="text-red-500">*</span>:
//             </label>
//             <select
//               id="gender"
//               disabled={!isEditable}
//               value={data.student_details.gender}
//               className={`w-full p-2 border rounded-md ${
//                 data.student_details.gender ? "" : "border-red-500"
//               } px-[10px] text-gray-600 py-[10px] bg-[#fff] border rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll`}>
//               <option value="" disabled>
//                 Select gender
//               </option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>

//           {/* Religion */}
//           <InputField
//             name="religion"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Religion"
//             value={data.student_details.religion}
//           />

//           {/* Caste */}
//           <InputField
//             name="caste"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Caste"
//             value={data.student_details.caste}
//           />

//           {/* Blood Group */}
//           <div className="input flex flex-col w-full mb-4 text-[13.5px]">
//             <label
//               htmlFor="blood_group"
//               className="text-gray-700 font-medium w-fit mb-2">
//               Blood Group<span className="text-red-500">*</span>:
//             </label>
//             <select
//               id="blood_group"
//               disabled={!isEditable}
//               value={data.other_details.medical_details.blood_group}
//               className={`w-full p-2 border rounded-md ${
//                 data.other_details.medical_details.blood_group
//                   ? ""
//                   : "border-red-500"
//               } px-[10px] text-gray-600 py-[10px] bg-[#fff] border rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll`}>
//               <option value="" disabled>
//                 Select blood group
//               </option>
//               <option value="">Select Blood Group</option>
//               <option value="A+">A positive (A+)</option>
//               <option value="A-">A negative (A-)</option>
//               <option value="B+">B positive (B+)</option>
//               <option value="B-">B negative (B-)</option>
//               <option value="O+">O positive (O+)</option>
//               <option value="O-">O negative (O-)</option>
//               <option value="AB+">AB positive (AB+)</option>
//               <option value="AB-">AB negative (AB-)</option>
//             </select>
//           </div>

//           {/* Height */}
//           <InputField
//             name="height"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Height (cm)"
//             value={data.other_details.medical_details.height}
//           />

//           {/* Weight */}
//           <InputField
//             name="weight"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Weight (kg)"
//             value={data.other_details.medical_details.weight}
//           />

//           {/* Hobbies and Talent */}
//           <div className="lg:grid lg:grid-cols-2 lg:gap-6">
//             {/* Hobbies */}
//             <InputField
//               name="hobbies"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Hobbies"
//               value={data.student_details.hobbies}
//             />

//             {/* Talent */}
//             <InputField
//               name="talent"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Talent"
//               value={data.student_details.talent}
//             />
//           </div>
//         </div>

//         {/* Parents Details */}
//         <div className="grid grid-cols-2 gap-5">
//           {/* Father details */}
//           <div className="lg:grid grid-cols-3 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//             <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//               Father Details
//             </h2>
//             {/* Father Name */}
//             <InputField
//               name="father_name"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Father Name"
//               value={data.parent_guardian_details.father_information.name}
//             />
//             {/* Father Occupation */}
//             <InputField
//               name="father_occupation"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Occupation"
//               value={data.parent_guardian_details.father_information.occupation}
//             />

//             {/* Father Phone */}
//             <InputField
//               name="father_contact"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Contact Number"
//               value={data.parent_guardian_details.father_information.contact_no}
//             />
//           </div>

//           {/* Mother details */}
//           <div className="lg:grid grid-cols-3 lg:gap-x-3 gap-y-5 bg-[#fff] p-9 rounded-lg border-2 relative">
//             <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//               Mother Details
//             </h2>
//             {/* Mother Name */}
//             <InputField
//               name="mother_name"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Mother Name"
//               value={data.parent_guardian_details.mother_information.name}
//             />
//             {/* Mother Occupation */}
//             <InputField
//               name="mother_occupation"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Occupation"
//               value={data.parent_guardian_details.mother_information.occupation}
//             />
//             {/* Mother Phone */}
//             <InputField
//               name="mother_contact"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Contact Number"
//               value={data.parent_guardian_details.mother_information.contact_no}
//             />
//           </div>
//         </div>

//         {/* Guardian details */}
//         <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//           <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//             Guardian Details
//           </h2>

//           {/* Guardian Relation with Student */}
//           <InputField
//             name="relationship"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Relation with Student"
//             value={
//               data.parent_guardian_details.guardian_information.relationship
//             }
//           />

//           {/* Guardian Name */}
//           <InputField
//             name="guardian_name"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Guardian Name"
//             value={data.parent_guardian_details.guardian_information.name}
//           />
//           {/* Guardian Occupation */}
//           <InputField
//             name="guardian_occupation"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Occupation"
//             value={data.parent_guardian_details.guardian_information.occupation}
//           />

//           {/* Guardian Phone */}
//           <InputField
//             name="guardian_contact"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Contact Number"
//             value={data.parent_guardian_details.guardian_information.contact_no}
//           />

//           {/* Guardian Whatsapp */}
//           <InputField
//             name="guardian_whatsapp"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Whatsapp Number"
//             value={
//               data.parent_guardian_details.guardian_information.whatsapp_no
//             }
//           />

//           {/* Guardian Email */}
//           <InputField
//             name="email"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="E-mail"
//             value={data.parent_guardian_details.guardian_information.email}
//           />

//           {/* Guardian Qualification */}
//           <InputField
//             name="qualification"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Qualification"
//             value={
//               data.parent_guardian_details.guardian_information.qualification
//             }
//           />

//           {/* Guardian Annual Income */}
//           <InputField
//             name="annual_income"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Annual Income"
//             value={
//               data.parent_guardian_details.guardian_information.annual_income
//             }
//           />
//         </div>

//         {/* Contact Details */}
//         <div className="grid grid-cols-2 gap-5">
//           <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//             <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//               Current Address Details
//             </h2>
//             {/* Current Village */}
//             <InputField
//               name="current_village"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Village"
//               value={data.communication_address.current_address.village}
//             />
//             {/* Current Post Office */}
//             <InputField
//               name="current_post_office"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Post Office"
//               value={data.communication_address.current_address.post_office}
//             />

//             {/* Current Police Station */}
//             <InputField
//               name="current_police_station"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Police Station"
//               value={data.communication_address.current_address.police_station}
//             />

//             {/* Current District */}
//             <InputField
//               name="current_district"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="District"
//               value={data.communication_address.current_address.district}
//             />

//             {/* Current State */}
//             <InputField
//               name="current_state"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="State"
//               value={data.communication_address.current_address.state}
//             />

//             {/* Current Country */}
//             <InputField
//               name="current_country"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Country"
//               value={data.communication_address.current_address.country}
//             />

//             {/* Postal Code */}
//             <InputField
//               name="current_postal_code"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Postal/Zone Code"
//               value={data.communication_address.current_address.postal_code}
//             />
//           </div>

//           <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//             <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//               Permanent Address Details
//             </h2>
//             {/* Current Village */}
//             <InputField
//               name="permanent_village"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Village"
//               value={data.communication_address.permanent_address.village}
//             />
//             {/* Current Post Office */}
//             <InputField
//               name="permanent_post_office"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Post Office"
//               value={data.communication_address.permanent_address.post_office}
//             />

//             {/* Current Police Station */}
//             <InputField
//               name="permanent_police_station"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Police Station"
//               value={
//                 data.communication_address.permanent_address.police_station
//               }
//             />

//             {/* Current District */}
//             <InputField
//               name="permanent_district"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="District"
//               value={data.communication_address.permanent_address.district}
//             />

//             {/* Current State */}
//             <InputField
//               name="permanent_state"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="State"
//               value={data.communication_address.permanent_address.state}
//             />

//             {/* Current Country */}
//             <InputField
//               name="permanent_country"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Country"
//               value={data.communication_address.permanent_address.country}
//             />

//             {/* Postal Code */}
//             <InputField
//               name="permanent_postal_code"
//               onChange={handleChange}
//               type="text"
//               disabled={!isEditable}
//               label="Postal/Zone Code"
//               value={data.communication_address.permanent_address.postal_code}
//             />
//           </div>
//         </div>

//         {/* Previous Institute Details */}
//         <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//           <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//             Previous Institute Details
//           </h2>
//           {/* Institute Name */}
//           <InputField
//             name="institute_name"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Institute Name"
//             value={data.other_details.previous_institute_details.institute_name}
//           />

//           {/* Institute Board */}
//           <InputField
//             name="board_affiliation"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Previous Board"
//             value={
//               data.other_details.previous_institute_details.board_affiliation
//             }
//           />

//           {/* Previous Class */}
//           <InputField
//             name="previous_class"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Previous Class"
//             value={data.other_details.previous_institute_details.previous_class}
//           />

//           {/* Tc Submitted */}
//           <InputField
//             name="tc_submitted"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Tc Submitted"
//             value={tc ? tc : "Tc not submitted"}
//           />
//         </div>

//         {/* Medical Details */}
//         <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//           <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//             Medical Details
//           </h2>
//           {/* Allergies */}
//           <InputField
//             name="allergies_details"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Allergic Details"
//             value={data.other_details.medical_details.allergies.details}
//           />

//           {/* Special Medical Condition */}
//           <InputField
//             name="special_condition"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Special Medical Condition"
//             value={data.other_details.medical_details.special_condition}
//           />

//           {/* Regular Medication */}
//           <InputField
//             name="regular_medication"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Regular Medication"
//             value={
//               data.other_details.medical_details.regular_medication.details
//             }
//           />

//           {/* Special Assistance */}
//           <InputField
//             name="special_assistance"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Special Assistance"
//             value={
//               data.other_details.medical_details.special_assistance.details
//             }
//           />
//         </div>

//         {/* Bank Details */}
//         <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-5 bg-[#fff] rounded-lg p-9 border-2 relative">
//           <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
//             Bank Details
//           </h2>
//           {/* Account Holder Name */}
//           <InputField
//             name="account_holder_name"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Account Holder Name"
//             value={data.bank_details.account_holder_name}
//           />

//           {/* Bank Name */}
//           <InputField
//             name="bank_name"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Bank Name"
//             value={data.bank_details.bank_name}
//           />

//           {/* Account Number */}
//           <InputField
//             name="account_no"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Account Number"
//             value={data.bank_details.account_no}
//           />

//           {/* IFSC Code */}
//           <InputField
//             name="ifsc_code"
//             onChange={handleChange}
//             type="text"
//             disabled={!isEditable}
//             label="Account Number"
//             value={data.bank_details.ifsc_code}
//           />
//         </div>
//         {/* ------------------------------------------ */}

//         {/* Buttons Section -------------------------- */}
//         <div className="mt-8 grid justify-end">
//           <div className="flex items-center">
//             <Button
//               type="button"
//               onClick={() => setIsEditable(!isEditable)}
//               className={`px-4 py-2 mr-4 rounded ${
//                 isEditable ? "bg-red-500" : "bg-blue-500"
//               } text-white`}>
//               {isEditable ? "Cancel Edit" : "Edit"}
//             </Button>
//             {isEditable && (
//               <Button
//                 onClick={() => setIsEditable(!isEditable)}
//                 className="min-w-fit px-6 bg-[#228B22] hover:bg-[#186e18]">
//                 Apply Changes
//               </Button>
//             )}

//             {!isEditable && <Button type="submit">Submit</Button>}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// const InputField = ({
//   label,
//   value,
//   disabled,
//   type = "text",
//   name,
//   onChange,
// }: {
//   label: string;
//   type?: string;
//   disabled: boolean;
//   value: string;
//   name: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => (
//   <div className="input flex flex-col w-full text-[13.5px]">
//     <label className="text-gray-500 font-semibold w-fit mb-2">
//       {label}
//       <span className="text-red-500">*</span> :
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       disabled={disabled}
//       onChange={onChange}
//   className={`border-2
//    px-[10px] text-gray-700 py-[10px] bg-[#fff] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll`}
// />
//   </div>
// );

"use client";

import { useEffect, useState } from "react";
import { GetStudentById } from "@/lib/actions/student.action";
import PageLoader from "@/components/ui-components/PageLoading";
import { Link } from "lucide-react";
import EditStudentForm from "@/components/EditStudentForm";

// Main Function Start -------------------------------------------------

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params; // Get student id from url

  // State -------------------------------------------------------------
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get Student Data --------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await GetStudentById(studentId);
        if (studentData) {
          setData(studentData);
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
    ...data.bank_details,
    ...data.student_details,
    ...data.communication_address,
    ...data.communication_address.current_address,
    ...data.other_details.medical_details,
    ...data.other_details.previous_institute_details,
    ...data.parent_guardian_details,
    ...data.parent_guardian_details.guardian_information,
    application_status: data.application_status,
    counselling_date: data.counselling_date,
    counselling_status: data.counselling_status,
    counselling_time: data.counselling_time,
    payment_status: data.payment_status,
    _id: data._id,
  };

  // console.log("data", data);

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <EditStudentForm data={data1} />
    </div>
  );
}
