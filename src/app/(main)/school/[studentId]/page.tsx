"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Barcode from "react-barcode";

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

  const documentData = [
    {
      id: "FLIS001",
      name: "Aadhaar Card",
      attachment: "Aadhaar_Card",
    },
    {
      id: "FLIS002",
      name: "Birth Certificate",
      attachment: "Birth_Certificate",
    },
  ];

  return (
    <div className="w-full h-full px-3">
      {/* <h1 className="text-2xl font-bold text-red-600">Student Profile</h1> */}

      {/* Profile Section */}
      <div className="flex mt-4 gap-6 relative">
        {/* Left Profile Card */}
        <div className="w-[20%] h-fit bg-white shadow rounded p-4 sticky top-24">
          <img
            src="/assets/loaders/img.jpg"
            alt="Student Profile"
            className="w-24 h-[108px] mx-auto object-cover object-center"
          />
          <h2 className="text-center text-2xl font-serif font-light mt-2">
            Student Name
          </h2>
          {/* Barcode for FLIS ID */}
          <div className="flex justify-center mb-2 px-10">
            <Barcode
              value={"FLISGSE00001"}
              width={2}
              height={50}
              displayValue={false}
            />
          </div>
          <div className="text-center text-base tracking-wider font-bold mt-1">
            PRE-PRIMARY
          </div>
          <div className="mt-10 border-b-2"></div>

          {/* Table for Student Details */}
          <table className="w-full text-sm">
            <tbody className="flex flex-col">
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">FLIS ID:</td>
                <td>FLISGSE00001</td>
              </tr>
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">SECTION:</td>
                <td>2025-2026</td>
              </tr>
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">CLASS:</td>
                <td>Nursery</td>
              </tr>
              <tr className="py-3 flex justify-between">
                <td className="font-semibold">SESSION:</td>
                <td>(2024-25)</td>
              </tr>
            </tbody>
          </table>

          <div className="grid gap-3 mt-10">
            <Button>SEND USER ID & PASSWORD</Button>
            <Button>UPLOAD DOCUMENTS</Button>
            <Button>COLLECT FEES</Button>
            <Button>ALLOCATE SUBJECT</Button>
            <Button>ADD HEALTH RECORD</Button>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-[80%]">
          {/* Tab Navigation */}
          <div className="flex justify-between mb-10">
            <div className="flex space-x-4">
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

            <Button
              onClick={() => window.history.back()}
              className="justify-self-end">
              Go Back
            </Button>
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === "document" && (
              <div className="bg-white p-4 rounded shadow">
                <div className="space-y-4">
                  {documentData.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between border p-4 rounded">
                      <div>
                        <p>
                          <strong>Document ID:</strong> {doc.id}
                        </p>
                        <p>
                          <strong>Document Name:</strong> {doc.name}
                        </p>
                        <p>
                          <strong>Attachment:</strong> {doc.attachment}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-red-600 text-white px-4 py-2 rounded">
                          View Document
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                          Download
                        </button>
                        <button className="bg-gray-400 text-white px-4 py-2 rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "basic-details" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Basic Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Admission Date
                        </td>
                        <td className="border px-4 py-2">00.00.0000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Gender
                        </td>
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

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Medical Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Blood Group
                        </td>
                        <td className="border px-4 py-2">A+</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Special Medical Condition
                        </td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Special Assistance
                        </td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Regular Medication
                        </td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Any Know Allergies
                        </td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Height
                        </td>
                        <td className="border px-4 py-2">3 F 4In</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Weight
                        </td>
                        <td className="border px-4 py-2">23 Kilogram</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Bank Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Account Holder Name
                        </td>
                        <td className="border px-4 py-2">Mariha Hasan</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Account Number
                        </td>
                        <td className="border px-4 py-2">06754324511</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Bank Name
                        </td>
                        <td className="border px-4 py-2">
                          ICICI Bank of India
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          IFSC Code
                        </td>
                        <td className="border px-4 py-2">ICICI034232</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "parents" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Father Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Father’s Name
                        </td>
                        <td className="border px-4 py-2">Amirul Islam</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">H.S Pass</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">Government Job</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">480000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">9008908654</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">7654342321</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Mother Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Mother’s Name
                        </td>
                        <td className="border px-4 py-2">Amirul Islam</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">H.S Pass</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">Government Job</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">480000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">9008908654</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">7654342321</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Guardian Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Guardian’s Name
                        </td>
                        <td className="border px-4 py-2">Amirul Islam</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">H.S Pass</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">Government Job</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">480000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">9008908654</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">7654342321</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Email
                        </td>
                        <td className="border px-4 py-2">
                          amirulislam@gmail.com
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Relation to Student
                        </td>
                        <td className="border px-4 py-2">Father</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Current Address Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Village
                        </td>
                        <td className="border px-4 py-2">Bilbari</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Post Office
                        </td>
                        <td className="border px-4 py-2">Bhattabati</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Police Station
                        </td>
                        <td className="border px-4 py-2">Nabagram</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          District
                        </td>
                        <td className="border px-4 py-2">Murshidabad</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Pin Code
                        </td>
                        <td className="border px-4 py-2">742149</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          State
                        </td>
                        <td className="border px-4 py-2">WB</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Country
                        </td>
                        <td className="border px-4 py-2">India</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Permanent Address Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Village
                        </td>
                        <td className="border px-4 py-2">Bilbari</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Post Office
                        </td>
                        <td className="border px-4 py-2">Bhattabati</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Police Station
                        </td>
                        <td className="border px-4 py-2">Nabagram</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          District
                        </td>
                        <td className="border px-4 py-2">Murshidabad</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Pin Code
                        </td>
                        <td className="border px-4 py-2">742149</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          State
                        </td>
                        <td className="border px-4 py-2">WB</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Country
                        </td>
                        <td className="border px-4 py-2">India</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "admission" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Admission Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Session
                        </td>
                        <td className="border px-4 py-2">25-26</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Section
                        </td>
                        <td className="border px-4 py-2">A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Class
                        </td>
                        <td className="border px-4 py-2">Nursery</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Application Id
                        </td>
                        <td className="border px-4 py-2">FLIS123456789</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Admission Number
                        </td>
                        <td className="border px-4 py-2">742149</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous Class
                        </td>
                        <td className="border px-4 py-2">Promotion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Fees & Payments
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Admission Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Academical Materials Package
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Term Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Admission Renewal Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          School Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Category of School Fees
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Hostel Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Transport Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Exam Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Event Fee
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Previous School Details
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          School Name
                        </td>
                        <td className="border px-4 py-2">
                          Nimtala High School
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous School Section
                        </td>
                        <td className="border px-4 py-2">Tulip</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Roll No or Id Number
                        </td>
                        <td className="border px-4 py-2">012524</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Reason for Leaving
                        </td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Board
                        </td>
                        <td className="border px-4 py-2">Rs. 1000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous School Class
                        </td>
                        <td className="border px-4 py-2">Kindergarten</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Portal Id
                        </td>
                        <td className="border px-4 py-2">484568</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "exam" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Internal Assessments Test
                  </h2>
                  <table className="table-auto w-full p-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-4 py-3">Date</th>
                        <th className="border px-4 py-3">Subject</th>
                        <th className="border px-4 py-3">Max Marks</th>
                        <th className="border px-4 py-3">Min Marks</th>
                        <th className="border px-4 py-3">Marks Obtained</th>
                        <th className="border px-4 py-3">Result</th>
                        <th className="border px-4 py-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td className="border px-4 py-3">01/10/2024</td>
                        <td className="border px-4 py-3">Mathematics</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">85</td>
                        <td className="border px-4 py-3">PASS</td>
                        <td className="border px-4 py-3">A</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">02/10/2024</td>
                        <td className="border px-4 py-3">Science</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">70</td>
                        <td className="border px-4 py-3">PASS</td>
                        <td className="border px-4 py-3">B</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Overall Results Section */}
                  <div className="mt-8">
                    <table className="table-auto w-full text-sm border-collapse">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Percentage
                          </td>
                          <td className="border px-4 py-2">80%</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Rank
                          </td>
                          <td className="border px-4 py-2">5</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Result
                          </td>
                          <td className="border px-4 py-2">PASS</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Division
                          </td>
                          <td className="border px-4 py-2">First Division</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Total Marks Obtained
                          </td>
                          <td className="border px-4 py-2">155</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Grand Total
                          </td>
                          <td className="border px-4 py-2">200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "board-exam" && (
              <div className="grid gap-10">
                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Board Practical Test
                  </h2>
                  <table className="table-auto w-full p-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-4 py-3">Date</th>
                        <th className="border px-4 py-3">Subject</th>
                        <th className="border px-4 py-3">
                          Theory (TH02) (Max 100)
                        </th>
                        <th className="border px-4 py-3">
                          Practical (PC02) (Max 75)
                        </th>
                        <th className="border px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td className="border px-4 py-3">01/10/2024</td>
                        <td className="border px-4 py-3">Mathematics</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">85</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">02/10/2024</td>
                        <td className="border px-4 py-3">Science</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">70</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Overall Results Section */}
                  <div className="mt-8">
                    <table className="table-auto w-full text-sm border-collapse">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Total Marks
                          </td>
                          <td className="border px-4 py-2">200/500</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Percentage
                          </td>
                          <td className="border px-4 py-2">80%</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Grade
                          </td>
                          <td className="border px-4 py-2">A</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Rank
                          </td>
                          <td className="border px-4 py-2">01</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="grid gap-10">This is attendance section</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
