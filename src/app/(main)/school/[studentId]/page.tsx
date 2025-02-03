'use client';

import { formatDate } from '@/components/FormatDate';
import PageLoader from '@/components/ui-components/PageLoading';
import { Button } from '@/components/ui/button';
import { UploadHealthReportDialog } from '@/components/UploadHealthReportDialog';
import { admittedStudentDetails } from '@/constant';
import {
  DeleteDietChart,
  DeleteDocument,
  GetStudentDetails,
} from '@/lib/actions/student.action';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { toast } from 'sonner';

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      setError(false);
      const fetchData = async () => {
        try {
          const result = await GetStudentDetails(studentId);
          if (result) {
            const filteredData = admittedStudentDetails(result);
            setData(filteredData);
          }
        } catch (error: any) {
          toast.error('Failed to fetch data', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [studentId]);

  const [activeTab, setActiveTab] = useState('basic-details');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDeleteDocument = async (documentId: string) => {
    const response = await DeleteDocument(documentId);

    if (response.statusCode === 200) {
      toast.success('Document deleted successfully!');
      window.location.reload();
    } else {
      toast.error('Failed to delete document!');
    }
  };

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PageLoader />
      </div>
    );
  }

  const handleDeleteDietChart = async (index: number) => {
    const response = await DeleteDietChart(studentId, index);

    if (response.statusCode === 200) {
      toast.success('Diet chart deleted successfully!');
      window.location.reload();
    } else {
      toast.error('Failed to delete diet chart!');
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
          Failed to load pending students. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full px-3 pb-5 text-sm">
      {/* <h1 className="text-2xl font-bold text-red-600">Student Profile</h1> */}

      {/* Profile Section */}
      <div className="flex mt-4 gap-6 relative">
        {/* Left Profile Card */}
        <div className="w-[20%] h-fit bg-white shadow rounded p-4 sticky top-24">
          <Image
            width={500}
            height={500}
            src={data.basic_details.student_photo}
            alt="Student Profile"
            className="w-24 h-[108px] mx-auto object-cover object-center"
          />
          <h2 className="text-center text-2xl font-serif font-light mt-2">
            {data.basic_details.name}
          </h2>
          {/* Barcode for FLIS ID */}
          <div className="flex justify-center mb-2 px-10">
            <Barcode
              value={data.flisId}
              width={2}
              height={50}
              displayValue={false}
            />
          </div>
          <div className="text-center text-base tracking-wider font-bold mt-1">
            {data.class}
          </div>
          <div className="mt-10 border-b-2"></div>

          {/* Table for Student Details */}
          <table className="w-full text-sm">
            <tbody className="flex flex-col">
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">FLIS ID:</td>
                <td>{data.flisId}</td>
              </tr>
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">SECTION:</td>
                <td>{data.section}</td>
              </tr>
              <tr className="border-b-2 py-3 flex justify-between">
                <td className="font-semibold">CLASS:</td>
                <td>{data.class}</td>
              </tr>
              <tr className="py-3 flex justify-between">
                <td className="font-semibold">SESSION:</td>
                <td>{data.session}</td>
              </tr>
            </tbody>
          </table>

          <div className="grid gap-3 mt-10">
            <Button disabled>SEND USER ID & PASSWORD</Button>
            <Link href={`/student/upload-documents/${studentId}`}>
              <Button className="w-full">UPLOAD DOCUMENTS</Button>
            </Link>
            <Link
              href={`/student/collect-fees/${studentId}/${data.sessionId}/${data.classId}`}
            >
              <Button className="w-full">COLLECT FEES</Button>
            </Link>
            <Button disabled>ALLOCATE SUBJECT</Button>
            <UploadHealthReportDialog studentId={studentId}>
              <Button className="w-full">ADD HEALTH RECORD</Button>
            </UploadHealthReportDialog>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-[80%]">
          {/* Tab Navigation */}
          <div className="flex justify-between mb-10">
            <div className="flex space-x-4">
              {[
                'Basic Details',
                'Parents',
                'Address',
                'Admission',
                'Exam',
                'Board Exam',
                'Attendance',
                'Document',
                'Diet Chart',
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    handleTabChange(tab.toLowerCase().replace(/\s/g, '-'))
                  }
                  className={`py-2 px-4 rounded ${
                    activeTab === tab.toLowerCase().replace(/\s/g, '-')
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <Button
              onClick={() => window.history.back()}
              className="justify-self-end text-xs"
            >
              Go Back
            </Button>
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === 'diet-chart' && (
              <div className="bg-white p-4 rounded shadow">
                <div className="space-y-4">
                  {data.health_records?.records
                    ?.map(
                      (doc: any, actualIndex: number) =>
                        doc.dietChartUrl && { doc, actualIndex }
                    ) // Preserve actual index
                    .filter(Boolean) // Remove false values
                    .map(({ doc, actualIndex }: any, displayIndex: number) => (
                      <div
                        key={doc.id || actualIndex} // Ensure key uniqueness
                        className="flex items-center justify-between border p-4 rounded text-sm"
                      >
                        <div className="grid gap-2">
                          <strong>Diet Chart</strong> {displayIndex + 1}
                          <p>
                            <strong>Uploaded On:</strong>{' '}
                            {formatDate(doc.createdAt)}
                          </p>
                          <p>
                            <strong>Time:</strong>{' '}
                            {new Date(doc.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={doc?.dietChartUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button>Download</Button>
                          </Link>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteDietChart(actualIndex)} // Pass actual index
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'document' && (
              <div className="bg-white p-4 rounded shadow">
                <div className="space-y-4">
                  {data.documents.map((doc: any) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between border p-4 rounded"
                    >
                      <div>
                        <p>
                          <strong>Document ID:</strong> {doc._id}
                        </p>
                        <p>
                          <strong>Document Name:</strong> {doc.documentType}
                        </p>
                        <p>
                          <strong>Description:</strong> {doc.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          className="bg-red-600 text-white px-4 py-2 rounded"
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                        {/* <button
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                          onClick={() =>
                            handleDownload(doc.fileUrl, doc.documentType)
                          }
                        >
                          Download
                        </button> */}
                        <button
                          className="bg-gray-400 text-white px-4 py-2 rounded"
                          onClick={() => handleDeleteDocument(doc._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'basic-details' && (
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
                        <td className="border px-4 py-2">
                          {formatDate(data.admission_date)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Gender
                        </td>
                        <td className="border px-4 py-2">
                          {data.basic_details.gender}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Date of Birth
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(data.basic_details.date_of_birth)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Religion
                        </td>
                        <td className="border px-4 py-2">
                          {data.basic_details.religion}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Mother Tongue
                        </td>
                        <td className="border px-4 py-2">
                          {data.basic_details.mother_tongue}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Language Spoken At Home
                        </td>
                        <td className="border px-4 py-2">
                          {data.basic_details.language_spoken_at_home}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Caste Certificate No
                        </td>
                        <td className="border px-4 py-2">
                          {data.basic_details.caste_certificate_number}
                        </td>
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
                        <td className="border px-4 py-2">
                          {data.medical_details.blood_group}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Special Medical Condition
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.special_medical_conditions}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Special Assistance
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.special_assistance}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Regular Medication
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.regular_medication}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Any Know Allergies
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.allergies}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Height
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.height}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Weight
                        </td>
                        <td className="border px-4 py-2">
                          {data.medical_details.weight}
                        </td>
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
                        <td className="border px-4 py-2">
                          {data.bank_details.account_holder_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Account Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.bank_details.account_number}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Bank Name
                        </td>
                        <td className="border px-4 py-2">
                          {data.bank_details.bank_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          IFSC Code
                        </td>
                        <td className="border px-4 py-2">
                          {data.bank_details.ifsc_code}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'parents' && (
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
                        <td className="border px-4 py-2">
                          {data.father_details.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">
                          {data.father_details.qualification}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">
                          {data.father_details.occupation}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">
                          {data.father_details.annual_income}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.father_details.contact_no}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.father_details.whatsapp_no}
                        </td>
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
                        <td className="border px-4 py-2">
                          {data.mother_details.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">
                          {data.mother_details.qualification}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">
                          {data.mother_details.occupation}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">
                          {data.mother_details.annual_income}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.mother_details.contact_no}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.mother_details.whatsapp_no}
                        </td>
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
                        <td className="border px-4 py-2">
                          {data.guardian_details.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Qualification
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.qualification}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Occupation
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.occupation}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Annual Income
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.annual_income}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Phone Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.contact_no}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          WhatsApp Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.whatsapp_no}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Email
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Relation to Student
                        </td>
                        <td className="border px-4 py-2">
                          {data.guardian_details.relationship}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
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
                        <td className="border px-4 py-2">
                          {data.current_address.village}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Post Office
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.post_office}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Police Station
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.police_station}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          District
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.district}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Pin Code
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.postal_code}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          State
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.state}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Country
                        </td>
                        <td className="border px-4 py-2">
                          {data.current_address.country}
                        </td>
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
                        <td className="border px-4 py-2">
                          {data.permanent_address.village}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Post Office
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.post_office}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Police Station
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.police_station}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          District
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.district}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Pin Code
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.postal_code}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          State
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.state}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Country
                        </td>
                        <td className="border px-4 py-2">
                          {data.permanent_address.country}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'admission' && (
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
                        <td className="border px-4 py-2">{data.session}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Section
                        </td>
                        <td className="border px-4 py-2">{data.section}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Class
                        </td>
                        <td className="border px-4 py-2">{data.class}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Boarding Status
                        </td>
                        <td className="border px-4 py-2">
                          {data.boardingStatus}
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Application Id
                        </td>
                        <td className="border px-4 py-2">FLIS123456789</td>
                      </tr> */}
                      {/* <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Admission Number
                        </td>
                        <td className="border px-4 py-2">742149</td>
                      </tr> */}
                      {/* <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous Class
                        </td>
                        <td className="border px-4 py-2">Promotion</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded shadow border border-red-600">
                  <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
                    Fees & Payments
                  </h2>
                  <table className="table-auto w-full p-4">
                    <tbody>
                      {data.fees.map((fee: any) => (
                        <tr key={fee._id}>
                          <td className="border px-4 py-2 font-semibold">
                            {fee.name}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {fee.finalAmount}
                          </td>
                        </tr>
                      ))}
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
                          {data.previous_institute_details.institute_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous School Section
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.previous_section}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Roll No or Id Number
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.previous_roll_no}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Reason for Leaving
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.reason_for_leaving}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Board
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.board_affiliation}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Previous School Class
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.previous_class}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Portal Id
                        </td>
                        <td className="border px-4 py-2">
                          {data.previous_institute_details.previous_portal_id}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
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
                        {/* <td className="border px-4 py-3">01/10/2024</td>
                        <td className="border px-4 py-3">Mathematics</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">85</td>
                        <td className="border px-4 py-3">PASS</td>
                        <td className="border px-4 py-3">A</td> */}
                      </tr>
                      <tr>
                        {/* <td className="border px-4 py-3">02/10/2024</td>
                        <td className="border px-4 py-3">Science</td>
                        <td className="border px-4 py-3">100</td>
                        <td className="border px-4 py-3">35</td>
                        <td className="border px-4 py-3">70</td>
                        <td className="border px-4 py-3">PASS</td>
                        <td className="border px-4 py-3">B</td> */}
                      </tr>
                    </tbody>
                  </table>

                  {/* Overall Results Section */}
                  <div className="mt-8">
                    <table className="table-auto w-full text-sm border-collapse">
                      <tbody>
                        {/* <tr>
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
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'board-exam' && (
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
                    {/* <tbody className="text-center">
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
                    </tbody> */}
                  </table>

                  {/* Overall Results Section */}
                  <div className="mt-8">
                    <table className="table-auto w-full text-sm border-collapse">
                      <tbody>
                        {/* <tr>
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
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="grid gap-10">This is attendance section</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
