// import ApproveDialog from "@/components/ApproveDialog";
// import { Button } from "@/components/ui/button";
// import { GetStudentById } from "@/lib/actions/student.action";
// import Image from "next/image";

// export default async function StudentInfoPage({
//   params,
// }: {
//   params: { studentId: string };
// }) {
//   const { studentId } = params;

//   const data = await GetStudentById(studentId);
//   const student = data.student_details;

//   return (
//     <div className="w-full h-full container">
//       <div className="h-full border shadow-md rounded-lg">
//         <h1 className="font-bold text-xl p-4 underline">Student Information</h1>
//         <div className="flex gap-5 items-center p-4">
//           <Image
//             src={student?.student_photo}
//             alt="student_photo"
//             width={500}
//             height={500}
//             className="w-[1.5in] h-[2in] object-cover object-center border-2"
//           />
//           <div className="font-semibold text-lg">{basicSection(data)}</div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 p-4 h-full gap-4">
//           {additionalSection(data)}
//           {guardianInfo(data)}
//           {academyInfo(data)}
//           {medInfo(data)}
//           {bankInfo(data)}
//           {otherInfo(data)}
//         </div>
//         <div className="w-full flex justify-end gap-4 p-4">
//           <ApproveDialog docId={studentId} />
//           <Button variant="destructive">Delete</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const basicSection = (data: any) => {
//   const student = data?.student_details;

//   const addressData = data?.communication_address?.current_address;

//   const address = `${addressData?.village}, ${addressData?.post_office}, ${addressData?.police_station}, ${addressData?.district}, ${addressData?.state}, ${addressData?.postal_code}`;

//   return (
//     <div className="text-xs md:text-[14px]">
//       {/* <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Basic Information
//       </h3> */}
//       <table className="min-w-full">
//         <tbody>
//           <tr>
//             <td className="pr-4 py-2 font-semibold">Student Name:</td>
//             <td className="text-xl px-4 py-2">
//               {student?.first_name + " " + student?.last_name}
//             </td>
//           </tr>
//         </tbody>
//         <tbody>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Date of Birth:</td>
//             <td className="px-4 py-2">{student?.date_of_birth}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Class:</td>
//             <td className="px-4 py-2">{student?.class}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Guardian:</td>
//             <td className="px-4 py-2">
//               {data?.parent_guardian_details?.guardian_information.name}
//             </td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Phone:</td>
//             <td className="px-4 py-2">
//               {data?.parent_guardian_details?.guardian_information?.contact_no}
//             </td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Address:</td>
//             <td className="px-4 py-2">{address}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const additionalSection = (data: any) => {
//   const med = data?.other_details?.medical_details;
//   const student = data?.student_details;

//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Additional Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Blood Group:</td>
//             <td className="px-4 py-2">{med?.blood_group}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Hobbies:</td>
//             <td className="px-4 py-2">{student?.hobbies}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Height:</td>
//             <td className="px-4 py-2">{med?.height} cm</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Weight:</td>
//             <td className="px-4 py-2">{med?.weight} kg</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Religion:</td>
//             <td className="px-4 py-2">{student?.religion}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const guardianInfo = (data: any) => {
//   const student = data?.parent_guardian_details?.guardian_information;
//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Guardian Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Name:</td>
//             <td className="px-4 py-2">{student?.name}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Relation:</td>
//             <td className="px-4 py-2">{student?.relationship}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Email:</td>
//             <td className="px-4 py-2">{student?.email}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Phone:</td>
//             <td className="px-4 py-2">{student?.contact_no}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">WhatsApp:</td>
//             <td className="px-4 py-2">{student?.whatsapp_no}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Income:</td>
//             <td className="px-4 py-2">₹{student?.annual_income}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Qualification:</td>
//             <td className="px-4 py-2">{student?.qualification}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const academyInfo = (data: any) => {
//   const caste = data?.student_details?.caste;
//   const student = data?.other_details?.previous_institute_details;
//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Academic Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Previous Class:</td>
//             <td className="px-4 py-2">{student?.previous_class}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Previous School:</td>
//             <td className="px-4 py-2">{student?.institute_name}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Board Affiliation:</td>
//             <td className="px-4 py-2">{student?.board_affiliation}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Caste:</td>
//             <td className="px-4 py-2">{caste}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const medInfo = (data: any) => {
//   const student = data?.other_details?.medical_details;

//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Medical Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Any Allergies:</td>
//             <td className="px-4 py-2">
//               {student?.allergies.status === false ? "No" : "Yes"}
//             </td>
//           </tr>
//           {student?.allergies.status !== false && (
//             <tr className="border-b">
//               <td className="pr-4 py-2 font-semibold">Allergies Details:</td>
//               <td className="px-4 py-2">{student?.allergies.details}</td>
//             </tr>
//           )}
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Medical Conditions:</td>
//             <td className="px-4 py-2">
//               {student?.special_medical_conditions?.status === false
//                 ? "No"
//                 : "Yes"}
//             </td>
//           </tr>
//           {student?.special_medical_conditions?.status !== false && (
//             <tr className="border-b">
//               <td className="pr-4 py-2 font-semibold">Medical Details:</td>
//               <td className="px-4 py-2">
//                 {student?.special_medical_conditions?.details}
//               </td>
//             </tr>
//           )}
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">Medications:</td>
//             <td className="px-4 py-2">
//               {student?.regular_medication?.status === false ? "No" : "Yes"}
//             </td>
//           </tr>
//           {student?.regular_medication.status !== false && (
//             <tr className="border-b">
//               <td className="pr-4 py-2 font-semibold">Medical Details:</td>
//               <td className="px-4 py-2">
//                 {student?.regular_medication.details}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const bankInfo = (data: any) => {
//   const student = data?.bank_details;
//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Bank Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Bank Name:</td>
//             <td className="px-4 py-2">{student?.bank_name}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Account Holder Name:</td>
//             <td className="px-4 py-2">{student?.account_holder_name}</td>
//           </tr>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Account Number:</td>
//             <td className="px-4 py-2">{student?.account_no}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">IFSC Code:</td>
//             <td className="px-4 py-2">{student?.ifsc_code}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const otherInfo = (data: any) => {
//   const student = data?.other_details?.medical_details;

//   return (
//     <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
//       <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
//         Other Information
//       </h3>
//       <table className="min-w-full">
//         <tbody>
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Special Assistance:</td>
//             <td className="px-4 py-2">
//               {student?.special_assistance?.status === false ? "No" : "Yes"}
//             </td>
//           </tr>
//           {student?.special_assistance?.status !== false && (
//             <tr className="border-b">
//               <td className="pr-4 py-2 font-semibold">Assistance Details:</td>
//               <td className="px-4 py-2">
//                 {student?.special_assistance?.details}
//               </td>
//             </tr>
//           )}
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">
//               Special Medical Condition:
//             </td>
//             <td className="px-4 py-2">
//               {student?.special_medical_conditions?.status === false
//                 ? "No"
//                 : "Yes"}
//             </td>
//           </tr>
//           {student?.special_medical_conditions?.status !== false && (
//             <tr className="border-b">
//               <td className="pr-4 py-2 font-semibold">
//                 Special Medical Details:
//               </td>
//               <td className="px-4 py-2">
//                 {student?.special_medical_conditions?.details}
//               </td>
//             </tr>
//           )}
//           <tr className="border-b">
//             <td className="pr-4 py-2 font-semibold">Talent:</td>
//             <td className="px-4 py-2">{data?.student_details?.talent}</td>
//           </tr>
//           <tr className="">
//             <td className="pr-4 py-2 font-semibold">TC Submitted:</td>
//             <td className="px-4 py-2">
//               {data?.other_details?.previous_institute_details?.tc_submitted
//                 ? "Yes"
//                 : "No"}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// --------------------------------------------------

import ApproveDialog from "@/components/ApproveDialog";
import { Button } from "@/components/ui/button";
import { GetStudentById } from "@/lib/actions/student.action";
import Image from "next/image";

export default async function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;

  const data = await GetStudentById(studentId);
  const student = data.student_details;

  return (
    <div className="w-full h-full">
      <div className="h-full border rounded-lg">
        <h1 className="font-bold text-xl p-4 underline">Student Information</h1>
        <div className="flex gap-5 items-center p-4">
          <Image
            src={student?.student_photo}
            alt="student_photo"
            width={500}
            height={500}
            className="w-[1.5in] h-[2in] object-cover object-center border-2"
          />
          <div className="font-semibold text-lg">{basicSection(data)}</div>
        </div>
        <div className="grid grid-cols-1 p-4 h-full gap-4">
          {additionalSection(data)}
          {guardianInfo(data)}
          {academyInfo(data)}
          {medInfo(data)}
          {bankInfo(data)}
          {otherInfo(data)}
        </div>
        <div className="w-full flex justify-end gap-4 p-4">
          <ApproveDialog docId={studentId} />
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </div>
  );
}

const basicSection = (data: any) => {
  const student = data?.student_details;

  const addressData = data?.communication_address?.current_address;

  const address = `${addressData?.village}, ${addressData?.post_office}, ${addressData?.police_station}, ${addressData?.district}, ${addressData?.state}, ${addressData?.postal_code}`;

  return (
    <div className="text-xs md:text-[14px]">
      {/* <h3 className="font-semibold text-gray-600 text-[17px] md:text-lg mb-5">
        Basic Information
      </h3> */}
      <table className="min-w-full">
        <tbody>
          <tr>
            <td className="pr-4 py-2 font-semibold">Student Name:</td>
            <td className="text-xl px-4 py-2">
              {student?.first_name + " " + student?.last_name}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Date of Birth:</td>
            <td className="px-4 py-2">
              {new Date(student?.date_of_birth).toLocaleDateString("gb-IN")}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Class:</td>
            <td className="px-4 py-2">{student?.class}</td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Guardian:</td>
            <td className="px-4 py-2">
              {data?.parent_guardian_details?.guardian_information.name}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Phone:</td>
            <td className="px-4 py-2">
              {data?.parent_guardian_details?.guardian_information?.contact_no}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Address:</td>
            <td className="px-4 py-2">{address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const additionalSection = (data: any) => {
  const med = data?.other_details?.medical_details;
  const student = data?.student_details;

  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Additional Information
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-x-5">
          <InputField label="Blood Group" value={med?.blood_group} />
          <InputField label="Hobbies" value={student?.hobbies} />
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <InputField label="Height" value={`${med?.height} cm`} />
          <InputField label="Weight" value={`${med?.weight} kg`} />
          <InputField label="Religion" value={student?.religion} />
        </div>
      </div>
    </div>
  );
};

const guardianInfo = (data: any) => {
  const student = data?.parent_guardian_details?.guardian_information;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Guardian Information
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-x-5">
          <InputField label="Name" value={student?.name} />
          <InputField label="Relation" value={student?.relationship} />
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <InputField label="Email" value={student?.email} />
          <InputField label="Phone" value={student?.contact_no} />
          <InputField label="WhatsApp" value={student?.whatsapp_no} />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <InputField label="Income" value={`₹${student?.annual_income}`} />
          <InputField label="Qualification" value={student?.qualification} />
        </div>
      </div>
    </div>
  );
};

const academyInfo = (data: any) => {
  const caste = data?.student_details?.caste;
  const student = data?.other_details?.previous_institute_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-gray-600 mb-5">Academic Information</h3>
      <div className="flex flex-col">
        <InputField label="Previous Class" value={student?.previous_class} />
        <div className="grid grid-cols-3 gap-x-5">
          <InputField label="Previous School" value={student?.institute_name} />
          <InputField
            label="Board Affiliation"
            value={student?.board_affiliation}
          />
          <InputField
            label="TC Submitted"
            value={
              data?.other_details?.previous_institute_details?.tc_submitted
                ? "Yes"
                : "No"
            }
          />
        </div>
        <InputField label="Caste" value={caste} />
      </div>
    </div>
  );
};

const medInfo = (data: any) => {
  const med = data?.other_details?.medical_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-gray-600 mb-5">Medical Information</h3>
      <div className="flex flex-col space-y-4">
        <InputField label="Allergies" value={med?.allergies} />
        <InputField label="Medical Condition" value={med?.medical_condition} />
        <InputField label="Physician Name" value={med?.physician_name} />
        <InputField label="Contact No" value={med?.contact_no} />
      </div>
    </div>
  );
};

const bankInfo = (data: any) => {
  const bank = data?.bank_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Bank Information
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-x-5">
          <InputField label="Account No" value={bank?.account_no} />
          <InputField label="IFSC Code" value={bank?.ifsc_code} />
          <InputField label="Bank Name" value={bank?.bank_name} />
        </div>
        <InputField
          label="Account Holder Name"
          value={bank?.account_holder_name}
        />
      </div>
    </div>
  );
};

const otherInfo = (data: any) => {
  const other = data?.other_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-300 text-xs md:text-[14px]">
      <h3 className="font-semibold text-gray-600 mb-5">Other Information</h3>
      <div className="flex flex-col space-y-4">
        <InputField label="Transportation" value={other?.transportation} />
        <InputField label="Hostel" value={other?.hostel} />
        <InputField label="Talent" value={data?.student_details?.talent} />
        <InputField
          label="Extra-Curricular Activities"
          value={other?.extra_curricular_activities}
        />
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value }: { label: string; value: string }) => (
  <div className="input flex flex-col w-full static mb-4">
    <label className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
      {label}
    </label>
    <input
      type="text"
      value={value}
      readOnly
      className="border-gray-800 input px-[10px] py-[16px] bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold font-sans text-[13px] tracking-widest overflow-scroll cursor-not-allowed"
    />
  </div>
);
