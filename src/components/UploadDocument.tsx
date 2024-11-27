"use client";

import { UploadStudentDocs } from "@/lib/actions/uploadStudentDocs.action";
import { useEffect, useState } from "react";

const DocumentUpload = ({ studentID }: { studentID: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState<
    { file: File; title: string; description: string; url: string }[]
  >([]);

  console.log("Student ID: ", studentID);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const url = URL.createObjectURL(file);
      const newDocument = {
        file,
        title,
        description,
        url,
      };

      setDocuments((prevDocuments) => {
        const updatedDocuments = [...prevDocuments, newDocument];
        console.log("Current Documents:", updatedDocuments);
        return updatedDocuments;
      });

      // Reset form fields
      setFile(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleFinalSubmit = async () => {
    // Prepare the data to be sent
    const formData = new FormData();
    documents.forEach((doc) => {
      formData.append("files[]", doc.file); // Append files to form data
      formData.append("titles[]", doc.title); // Append titles to form data
      formData.append("descriptions[]", doc.description); // Append descriptions to form data
    });
    formData.append("studentID", studentID); // Append student ID to form data

    console.log("Data to be send: ", formData);

    // try {
    //   // const response = await UploadStudentDocs(formData);

    //   // if (!response) {
    //   //   throw new Error("Failed to upload documents");
    //   // }

    //   alert("Documents uploaded successfully!");

    //   // Clear the documents array after successful upload
    //   setDocuments([]);
    // } catch (error) {
    //   console.error("Error uploading documents:", error);
    //   alert("Error uploading documents. Please try again.");
    // }
  };

  useEffect(() => {
    return () => {
      documents.forEach((doc) => {
        URL.revokeObjectURL(doc.url);
      });
    };
  }, [documents]);

  return (
    <div className="p-5 border bg-white">
      <h2 className="text-xl font-bold mb-5">Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="file">
            Upload PDF:
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="title">
            Document Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="description">
            Document Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Upload
        </button>
      </form>

      {/* Table to display uploaded documents */}
      {documents.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-bold mb-3">Uploaded Documents</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">File Name</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline">
                      {doc.file.name}
                    </a>
                  </td>
                  <td className="border px-4 py-2">{doc.title}</td>
                  <td className="border px-4 py-2">{doc.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleFinalSubmit}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Submit All Documents
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
