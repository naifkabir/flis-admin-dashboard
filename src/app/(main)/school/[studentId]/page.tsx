"use client";

import { useState } from "react";

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;
  const [activeTab, setActiveTab] = useState("basic-details");

  console.log("studentId: ", studentId);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold text-red-600">Student Profile</h1>

      {/* Profile Section */}
      <div className="flex mt-4 gap-4">
        {/* Left Profile Card */}
        <div className="w-1/4 bg-white shadow rounded p-4">
          <img
            src="/path/to/profile-image.jpg"
            alt="Student Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-center text-xl font-semibold mt-2">Student</h2>
          <div className="text-center text-sm mt-1">PRIMARY</div>
          <div className="my-3 border-b"></div>
          <p className="text-sm">
            <strong>FLIS ID:</strong> 12146546
          </p>
          <p className="text-sm">
            <strong>SECTION:</strong> 2025-2026
          </p>
          <p className="text-sm">
            <strong>CLASS:</strong> Nursery
          </p>
          <p className="text-sm">
            <strong>SESSION:</strong> (2024-25)
          </p>
        </div>

        {/* Right Content Section */}
        <div className="w-3/4">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-4">
            {[
              "Basic Details",
              "Parents",
              "Address",
              "Admission",
              "Exam",
              "Board Exam",
              "Attendance",
              "Document",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  handleTabChange(tab.toLowerCase().replace(/\s/g, "-"))
                }
                className={`py-2 px-4 rounded ${
                  activeTab === tab.toLowerCase().replace(/\s/g, "-")
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white p-4 rounded shadow">
            {activeTab === "basic-details" && (
              <div>
                <h2 className="text-lg font-semibold text-red-600 mb-2">
                  Basic Details
                </h2>
                <table className="table-auto w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Admission Date
                      </td>
                      <td className="border px-4 py-2">00.00.0000</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">Gender</td>
                      <td className="border px-4 py-2">Female</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Date of Birth
                      </td>
                      <td className="border px-4 py-2">00.00.0000</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Religion
                      </td>
                      <td className="border px-4 py-2">Muslim</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Mother Tongue
                      </td>
                      <td className="border px-4 py-2">Bengali</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Language Spoken At Home
                      </td>
                      <td className="border px-4 py-2">English</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Caste Certificate No
                      </td>
                      <td className="border px-4 py-2">6445154</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Email ID
                      </td>
                      <td className="border px-4 py-2">admin@admin.com</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Phone No
                      </td>
                      <td className="border px-4 py-2">123456789</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        WhatsApp No
                      </td>
                      <td className="border px-4 py-2">123456789</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "parents" && (
              <div>
                <h2 className="text-lg font-semibold text-red-600 mb-2">
                  Parents
                </h2>
                <p>Parent details go here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
