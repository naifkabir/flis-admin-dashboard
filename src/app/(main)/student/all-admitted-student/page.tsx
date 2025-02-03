"use client";

import { useState, useEffect } from "react";
import { admittedStudent } from "@/app/data-table-components/columns";
import { GetStudentsByStatus } from "@/lib/actions/student.action";
import { admittedStudentTableFilter } from "@/constant";
import PageLoader from "@/components/ui-components/PageLoading";
import { Toaster, toast } from "sonner";
import { AdmittedStudentDataTable } from "@/app/data-table-components/admitted-student-data-table";
import { DynamicBreadcrumb } from "@/components/StudentBreadcrumb";
import { GetAllClasses } from "@/lib/actions/class.action";

export default function CounselingStudentPage() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Original dataset
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await GetStudentsByStatus("FEES");
        const filteredData = admittedStudentTableFilter(result);

        setData(filteredData);
        setOriginalData(filteredData); // Save the original dataset

        const classResult = await GetAllClasses();
        setClassData(classResult);
      } catch (err: any) {
        // console.error("Error fetching data:", err);
        toast.error("Failed to fetch data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = (e: any) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    const selectedClassObj = classData.find(
      (cls: any) => cls._id === classId
    ) as { sections: any } | undefined;
    setSectionData(selectedClassObj?.sections ?? []);
    setSelectedSection(""); // Reset section selection
  };

  const handleSectionChange = (e: any) => {
    setSelectedSection(e.target.value);
  };

  const filterStudents = async () => {
    if (!selectedClass || !selectedSection) {
      toast.error("Please select both class and section");
      return;
    }
    setLoading(true);
    const filtered = originalData.filter(
      (student: any) =>
        student.class === selectedClass && student.section === selectedSection
    );

    if (filtered.length) {
      setData(filtered);
    } else {
      setData([]);
      toast.error("No data found");
    }

    setLoading(false);
  };

  const clearFilters = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSectionData([]);
    setData(originalData); // Reset data to the original dataset
    toast.success("Filters cleared");
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
    <div className="w-full h-full my-auto">
      <div className="sub-container px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-bold text-lg mb-1.5">All Admitted Students</h1>
            <DynamicBreadcrumb currentPage="All Students" />
          </div>

          <div className="flex items-center gap-4 text-[13.5px]">
            <div className="flex flex-col gap-2">
              <select
                id="class-select"
                className="border rounded px-2 py-1 outline-none w-44"
                value={selectedClass}
                onChange={handleClassChange}>
                <option value="" disabled>
                  Select Class
                </option>
                {classData?.map((cls: any) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <select
                id="section-select"
                className="border rounded px-2 py-1 outline-none w-44"
                value={selectedSection}
                onChange={handleSectionChange}
                disabled={!sectionData.length}>
                <option value="" disabled>
                  Select Section
                </option>
                {sectionData?.map((section: any) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="self-end flex flex-row gap-2">
              <button
                className="bg-red-600 text-white px-3 py-[3px] rounded"
                onClick={filterStudents}>
                GO
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-3 py-[3px] rounded">
                Clear
              </button>
            </div>
          </div>
        </div>

        <AdmittedStudentDataTable
          columns={admittedStudent()}
          data={data ? data : []}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}
