"use client";

import PageLoader from "@/components/ui-components/PageLoading";
import { GetGroupById, UpdateFeeGroup } from "@/lib/actions/finance.action";
import { useEffect, useState } from "react";

export default function EditFinance({
  params,
}: {
  params: { groupId: string };
}) {
  const [data, setData] = useState({
    name: "",
    groupCode: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { groupId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("GroupId: ", groupId);
        const groupFinanceData = await GetGroupById(groupId);

        console.log("groupFinanceData: ", groupFinanceData);
        const { _id, ...rest } = groupFinanceData;
        setData({ ...rest, id: _id });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setIsChanged(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await UpdateFeeGroup(data);
    setSubmitting(false);

    console.log("Response: ", response);

    if (response.error) {
      alert("Failed to update finance data: " + response.error);
    } else {
      alert("Group data updated successfully!");
      window.history.back();
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
          Failed to load finance data. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold underline text-lg mb-8">Edit Fee Group</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto lg:mt-20 border-2 px-10 py-8 rounded border-gray-800">
        <div className="grid grid-cols-3 items-center">
          <h3>
            Name<span className="text-red-700">*</span> :
          </h3>
          <div className="input flex flex-col w-full static mb-4 col-span-2">
            <label
              htmlFor="name"
              className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
              Name
            </label>
            <input
              type="text"
              placeholder="Write here..."
              value={data.name}
              onChange={handleChange}
              name="name"
              required
              className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">
          <h3>
            Group Code<span className="text-red-700">*</span> :
          </h3>
          <div className="input flex flex-col w-full static mb-4 col-span-2">
            <label
              htmlFor="groupCode"
              className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
              Group Code
            </label>
            <input
              type="text"
              placeholder="Write here..."
              value={data.groupCode}
              onChange={handleChange}
              name="groupCode"
              required
              className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">
          <h3>Description :</h3>
          <div className="input flex flex-col w-full static mb-4 col-span-2">
            <label
              htmlFor="description"
              className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
              Description
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 mt-10">
          <button
            type="submit"
            className={`px-5 w-fit bg-green-600 text-white rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              !isChanged || submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isChanged || submitting}>
            {submitting ? (
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
                    d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.659l1.304 1.304C15.375 21.5 13.75 22 12 22c-4.418 0-8-3.582-8-8z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Update Details"
            )}
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 w-fit bg-gray-800 text-[#fff] rounded-md py-2 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
