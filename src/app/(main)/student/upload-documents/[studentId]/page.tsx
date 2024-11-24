"use client";

import PageLoader from "@/components/ui-components/PageLoading";
import { Button } from "@/components/ui/button";
import { UploadStudentDocs } from "@/lib/actions/uploadStudentDocs.action";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { FaFileImport } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";

// Zod schema
const documentSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 500 * 1024, {
    message: "File size must be 500KB or less.",
  }),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

export default function StudentInfoPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;
  // console.log(studentId);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState<
    { file: File; title: string; description: string; url: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // Validation error state
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       setFile(e.target.files[0]);
  //     }
  //   };

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const selectedFile = e.target.files?.[0];

  //     if (selectedFile) {
  //       // Check file size
  //       if (selectedFile.size > 500 * 1024) {
  //         // 500KB
  //         setValidationErrors((prev) => ({
  //           ...prev,
  //           file: "File size must be 500KB or less.",
  //         }));
  //         setFile(null); // Reset file if validation fails
  //       } else {
  //         setFile(selectedFile);
  //         setValidationErrors((prev) => {
  //           const { file, ...rest } = prev;
  //           return rest;
  //         }); // Clear file error
  //       }
  //     } else {
  //       setFile(null);
  //       setValidationErrors((prev) => ({
  //         ...prev,
  //         file: "File is required.",
  //       }));
  //     }
  //   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // Check file size
      if (selectedFile.size > 500 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          file: "File size must be 500KB or less.",
        }));
        setFile(null);
        setPdfPreviewUrl(null); // Reset the preview URL if validation fails
      } else {
        setFile(selectedFile);
        setPdfPreviewUrl(URL.createObjectURL(selectedFile)); // Set preview URL
        setValidationErrors((prev) => {
          const { file, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setFile(null);
      setPdfPreviewUrl(null); // Reset the preview URL if no file is selected
      setValidationErrors((prev) => ({
        ...prev,
        file: "File is required.",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for empty fields and set validation errors
    const newValidationErrors: { [key: string]: string } = {};
    if (!file) {
      newValidationErrors.file = "File is required.";
    }
    if (!title) {
      newValidationErrors.title = "Title is required.";
    }
    if (!description) {
      newValidationErrors.description = "Description is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      return; // Stop form submission if validation errors
    }

    if (file) {
      const url = URL.createObjectURL(file);
      const newDocument = {
        file,
        title,
        description,
        url,
      };

      // Validate using Zod schema
      documentSchema.parse(newDocument);

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);

      // Reset form fields
      setFile(null);
      setTitle("");
      setDescription("");
      setValidationErrors({});
    }
  };

  const handleFinalSubmit = async () => {
    setIsUploading(true);

    try {
      if (documents.length > 0) {
        for (const doc of documents) {
          const formData = new FormData();
          formData.append("file", doc.file);
          formData.append("documentType", doc.title);
          formData.append("description", doc.description);
          formData.append("student", studentId);

          // console.log("Form Data: ", formData);

          const response = await UploadStudentDocs(formData);
          // console.log("response: ", response);

          if (response.error) {
            toast.error("Failed to upload documents. Please try again.");
            return;
          } else {
            toast.success("All documents uploaded successfully!");
            setDocuments([]);
          }
        }
      } else {
        toast.warning("No Documents Found!");
      }
    } catch (error) {
      // console.error("Error uploading documents:", error);
      setError("Error uploading documents. Please try again.");
      toast.error("Error uploading documents. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      documents.forEach((doc) => {
        URL.revokeObjectURL(doc?.url);
      });
    };
  }, [documents]);

  if (!isLoaded) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PageLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-red-600 text-lg">{error}</h2>
      </div>
    );
  }

  return (
    <main className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="">
          <div className="flex items-center text-lg mb-5 font-bold py-3 border-b-2">
            <FaFilePdf />
            <h2 className="ml-3">Uploaded Documents</h2>
          </div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="border border-gray-300 text-center font-light text-black text-[13.5px]">
                <th className="border px-4 py-3">Sl.No</th>
                <th className="border px-4 py-3">File Name</th>
                <th className="border px-4 py-3">Title</th>
                <th className="border px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody
              className={`${
                documents?.length > 0 ? "min-h-fit" : "h-16 border"
              }`}>
              {documents?.length > 0 ? (
                documents?.map((doc, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 text-center text-[12.5px] font-normal">
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border px-4 py-3">
                      <a
                        href={doc?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline">
                        {doc?.file?.name}
                      </a>
                    </td>
                    <td className="border px-4 py-3">{doc?.title}</td>
                    <td className="border px-4 py-3">{doc?.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border text-center py-2 text-sm text-red-500">
                    No documents uploaded
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {documents.length > 0 && (
            <Button
              onClick={handleFinalSubmit}
              disabled={isUploading}
              className={`mt-4 w-full py-2 rounded-lg transition text-white`}>
              {isUploading ? (
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
                  Uploading...
                </span>
              ) : (
                "Submit All Documents"
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="border-2 px-2 rounded">
        <div className="flex items-center text-lg mb-5 font-bold py-3 border-b-2">
          <FaFileImport />
          <h2 className="ml-3">Upload Document</h2>
        </div>
        <div className="min-w-full rounded bg-white px-5 py-5 mb-[32px] lg:mb-[10px]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full text-[13.5px]">
                <label
                  className="text-gray-800 font-semibold w-fit mb-2"
                  htmlFor="file">
                  Upload Document (.pdf)
                  <span className="text-red-500">*</span> :
                </label>
                <input
                  type="file"
                  placeholder="Upload PDF"
                  id="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className={`border
       px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
                />
                {validationErrors.file && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.file}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full text-[13.5px]">
                <label
                  className="text-gray-800 font-semibold w-fit mb-2"
                  htmlFor="title">
                  Document Title
                  <span className="text-red-500">*</span> :
                </label>
                <input
                  id="title"
                  placeholder="Enter title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`border
       px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
                />
                {validationErrors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.title}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full text-[13.5px]">
              <label
                className="text-gray-800 font-semibold w-fit mb-2"
                htmlFor="description">
                Document Description
                <span className="text-red-500">*</span> :
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`border
       px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-  xs mt-1">
                  {validationErrors.description}
                </p>
              )}
            </div>

            {pdfPreviewUrl && (
              <div className="my-4 text-[13.5px]">
                <h3 className="text-gray-800 font-semibold w-fit mb-2">
                  PDF Preview
                </h3>
                <iframe
                  src={pdfPreviewUrl}
                  width="100%"
                  height="300px"
                  className="border border-gray-500"
                  title="PDF Preview"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Upload
            </Button>
          </form>
        </div>
      </div>
      <Toaster richColors />
    </main>
  );
}
