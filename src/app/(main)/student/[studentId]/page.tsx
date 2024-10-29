import ApproveDialog from "@/components/ApproveDialog";
import { Button } from "@/components/ui/button";
import { GetStudentById } from "@/lib/actions/student.action";
import Image from "next/image";
import Link from "next/link";

export default async function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;

  const data = await GetStudentById(studentId);
  const student = data?.student_details;
  // console.log("Student Data: ", data);

  return (
    <div className="w-full h-full bg-[#fff]">
      <div className="h-full border rounded-lg">
        <h1 className="font-bold text-2xl p-4 font-sans tracking-wider">
          Student Information
        </h1>
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
        <div className="grid grid-cols-1 p-4 h-full gap-8">
          {additionalSection(data)}
          <div className="grid grid-cols-2 gap-5">
            {fatherInfo(data)}
            {motherInfo(data)}
          </div>
          {guardianInfo(data)}
          <div className="grid grid-cols-2 gap-5">
            {currentAddressInfo(data)}
            {permanentAddressInfo(data)}
          </div>
          {academyInfo(data)}
          <div className="grid grid-cols-2 gap-5">
            {medInfo(data)}
            {otherInfo(data)}
          </div>
          {bankInfo(data)}
        </div>
        <div className="w-full flex justify-end gap-4 p-4">
          {data?.application_status === "UNDER-COUNSELLING" && (
            <Link href={`/student/approve-student/${studentId}`}>
              <Button color="primary">
                Submit Documents & Approve Student
              </Button>
            </Link>
          )}
          <ApproveDialog
            docId={studentId}
            applicationStatus={data?.application_status}
          />
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

  return (
    <div className="text-xs md:text-[14px]">
      <table className="min-w-full">
        <tbody>
          <tr>
            <td className="pr-4 py-2 font-semibold">Student Name:</td>
            <td className="text-xl px-4 py-2">
              <div className="flex">
                {student?.first_name + " " + student?.last_name ||
                  "Name not found"}
                <span
                  className={`relative -top-1 text-xs ml-5 self-start px-3 py-0.5 rounded-full ${
                    data?.application_status === "PENDING" &&
                    "bg-[#FFFF00] text-black"
                  } ${
                    data?.application_status === "ARCHIVED" &&
                    "bg-red-500 text-white"
                  } ${
                    data?.application_status === "UNDER-COUNSELLING" &&
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
            <td className="px-4 py-1 text-[14px] font-[700]">
              {data?.student_details?.gender || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Date of Birth:</td>
            <td className="px-4 py-1 text-[14px] font-[700]">
              {new Date(student?.date_of_birth).toLocaleDateString("gb-IN") ||
                "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-2 font-semibold">Class:</td>
            <td className="px-4 py-1 text-[14px] font-[700]">
              {student?.class || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Guardian:</td>
            <td className="px-4 py-1 text-[14px] font-[700]">
              {data?.parent_guardian_details?.guardian_information.name ||
                "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Phone:</td>
            <td className="px-4 py-1 text-[14px] font-[700]">
              {data?.parent_guardian_details?.guardian_information
                ?.contact_no || "n/a"}
            </td>
          </tr>
          <tr className="">
            <td className="pr-4 py-1 font-semibold">Address:</td>
            <td className="px-4 py-1 text-[14px] font-[700]">{address}</td>
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
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Additional Information of Student
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-x-5">
          <InputField label="Blood Group" value={med?.blood_group || "n/a"} />
          <InputField label="Caste" value={student?.caste || "n/a"} />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <InputField
            label="Talent"
            value={data?.student_details?.talent || "n/a"}
          />
          <InputField label="Hobbies" value={student?.hobbies || "n/a"} />
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <InputField label="Height" value={`${med?.height || "n/a"} cm`} />
          <InputField label="Weight" value={`${med?.weight || "n/a"} kg`} />
          <InputField label="Religion" value={student?.religion || "n/a"} />
        </div>
      </div>
    </div>
  );
};

const fatherInfo = (data: any) => {
  const student = data?.parent_guardian_details?.father_information;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Father Information
      </h3>
      <div className="flex flex-col gap-5">
        {/* Father Information */}
        <div className="grid grid-cols-2 gap-x-5">
          <InputField label="Father Name" value={student?.name} />
          <InputField label="Father Occupation" value={student?.occupation} />
        </div>
        <InputField label="Father Phone No." value={student?.contact_no} />
      </div>
    </div>
  );
};

const motherInfo = (data: any) => {
  const student = data?.parent_guardian_details?.mother_information;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Mother Information
      </h3>
      <div className="flex flex-col gap-5">
        {/* Mother Information */}
        <div className="grid grid-cols-2 gap-5">
          <InputField label="Mother Name" value={student?.name} />
          <InputField label="Mother Occupation" value={student?.occupation} />
        </div>
        <InputField label="Mother Phone No." value={student?.contact_no} />
      </div>
    </div>
  );
};

const guardianInfo = (data: any) => {
  const student = data?.parent_guardian_details?.guardian_information;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Guardian Information
      </h3>
      <div className="flex flex-col gap-5">
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

const currentAddressInfo = (data: any) => {
  const address = data?.communication_address?.current_address;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Current Address Details
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-x-5">
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
        <div className="grid grid-cols-3 gap-x-5">
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
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Permanent Address Details
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-x-5">
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
        <div className="grid grid-cols-3 gap-x-5">
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
  const student = data?.other_details?.previous_institute_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-gray-600 mb-5 text-lg">
        Previous Institute Details
      </h3>
      <div className="flex flex-col gap-5">
        <InputField label="Previous Class" value={student?.previous_class} />
        <div className="grid grid-cols-3 gap-x-5">
          <InputField
            label="Previous School Name"
            value={student?.institute_name}
          />
          <InputField
            label="Board Affiliation"
            value={student?.board_affiliation}
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
      </div>
    </div>
  );
};

const medInfo = (data: any) => {
  const med = data?.other_details?.medical_details;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Medical Information
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-x-5">
          <InputField
            label="Allergic Details"
            value={med?.allergies?.details || "n/a"}
          />
          <InputField
            label="Medical Condition"
            value={med?.special_medical_conditions?.details || "n/a"}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <InputField
            label="Regular Medication Details"
            value={med?.regular_medication?.details || "n/a"}
          />
          <InputField
            label="Spacial Assistance"
            value={med?.special_assistance?.details || "n/a"}
          />
        </div>
      </div>
    </div>
  );
};

const otherInfo = (data: any) => {
  const applicationData = data;
  return (
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
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
    <div className="p-6 border-2 rounded-lg border-gray-800 text-xs md:text-[14px]">
      <h3 className="font-semibold text-lg text-gray-600 mb-5">
        Bank Information
      </h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-x-5">
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
        </div>
        <InputField
          label="Account Holder Name"
          value={bank?.account_holder_name || "Not provided"}
        />
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value }: { label: string; value: string }) => (
  <div className="input flex flex-col w-full text-[13.5px]">
    <label className="text-gray-500 font-semibold w-fit mb-2">
      {label}
      <span className="text-red-500">*</span> :
    </label>
    <input
      value={value}
      readOnly
      className={`${
        value == "" ? "border-2 border-red-500" : "border-2"
      } px-[10px] text-gray-700 py-[10px] bg-[#fff] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll cursor-not-allowed`}
    />
  </div>
);
