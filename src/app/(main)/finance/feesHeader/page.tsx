// "use client";

// import { FinanceColumnFeeHeaders } from "@/app/data-table-components/columns";
// import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
// import PageLoader from "@/components/ui-components/PageLoading";
// import {
//   GetAllFinanceHeaders,
//   CreateNewFinanceHeader,
//   DeleteHeader,
// } from "@/lib/actions/finance.action";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Toaster, toast } from "sonner";
// import AlertDialogComponent from "@/components/Alart";

// interface FinanceHeader {
//   id: string;
//   name: string;
//   feesCode: string;
//   occurrence: string;
//   dueDate: string;
//   description?: string;
// }

// const FinancePage = () => {
//   const [data, setData] = useState<FinanceHeader[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     feesCode: "",
//     occurrence: "",
//     dueDate: "",
//     description: "",
//   });
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [headerIdToDelete, setHeaderIdToDelete] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await GetAllFinanceHeaders();
//       if (result?.error) {
//         setError(result.error);
//       } else {
//         setData(result);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleOccurrenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       occurrence: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Validate required fields
//     const { name, feesCode, occurrence, dueDate } = formData;
//     if (!name || !feesCode || !occurrence || !dueDate) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     // Call API to create new header
//     const result = await CreateNewFinanceHeader(formData);
//     if (result.error) {
//       setError(result.error);
//       alert("Error creating new header: " + result.error);
//     } else {
//       setData((prevData) => [...prevData, result]);
//       setModalOpen(false);
//       toast.success("Header created successfully!"); // Show success toast
//     }

//     // Reset form data
//     setFormData({
//       name: "",
//       feesCode: "",
//       occurrence: "",
//       dueDate: "",
//       description: "",
//     });
//   };

//   // Handle edit Header
//   const handleEdit = async (id: number) => {
//     // Placeholder for edit logic
//     console.log(`Editing header with ID: ${id}`);
//   };

//   // Handle Delete Header
//   const handleDeleteHeader = async (headerId: string) => {
//     setHeaderIdToDelete(headerId);
//     setDeleteDialogOpen(true); // Open the delete confirmation dialog
//   };

//   const confirmDeleteHeader = async () => {
//     const result = await DeleteHeader(headerIdToDelete);

//     if (result.error) {
//       setError(result.error);
//       alert("Error deleting header: " + result.error);
//       setDeleteDialogOpen(false);
//     } else {
//       setData((prevData) =>
//         prevData.filter((header) => header.id !== headerIdToDelete)
//       );
//       toast.success("Header deleted successfully!"); // Show success toast
//       setDeleteDialogOpen(false);
//       window.location.reload();
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
//           Failed to load finance data. Please try again later.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen my-auto">
//       <div className="sub-container px-4">
//         <div>
//           <div className="grid grid-cols-2">
//             <h1 className="font-bold text-lg mb-8">Fee Headers</h1>
//             <div className="flex gap-4 mb-4 justify-self-end">
//               <Button variant="outline" onClick={() => window.history.back()}>
//                 Go Back
//               </Button>
//               <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button>Create New Fee Header</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-[650px]">
//                   <DialogHeader>
//                     <DialogTitle>Create New Header</DialogTitle>
//                     <DialogDescription>
//                       Fill in the details for the new finance header.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="name" className="text-right">
//                         Name
//                       </Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="col-span-3 border-2"
//                         required
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="feesCode" className="text-right">
//                         Fees Code
//                       </Label>
//                       <Input
//                         id="feesCode"
//                         name="feesCode"
//                         value={formData.feesCode}
//                         onChange={handleInputChange}
//                         className="col-span-3 border-2"
//                         required
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label className="text-right">Occurrence</Label>
//                       <div className="col-span-3 flex gap-4">
//                         {["Monthly", "Quarterly", "Half Yearly", "Annual"].map(
//                           (option) => (
//                             <label
//                               key={option}
//                               className="flex items-center text-sm">
//                               <Input
//                                 type="radio"
//                                 name="occurrence"
//                                 value={option}
//                                 checked={formData.occurrence === option}
//                                 onChange={handleOccurrenceChange}
//                                 className="mr-2 radio-small"
//                                 required
//                               />
//                               {option}
//                             </label>
//                           )
//                         )}
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="dueDate" className="text-right">
//                         Due Date
//                       </Label>
//                       <Input
//                         id="dueDate"
//                         name="dueDate"
//                         type="date"
//                         value={formData.dueDate}
//                         onChange={handleInputChange}
//                         className="col-span-3 border-2"
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="description" className="text-right">
//                         Description
//                       </Label>
//                       <Input
//                         id="description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         className="col-span-3 border-2"
//                       />
//                     </div>
//                     <DialogFooter>
//                       <Button type="submit">Create Header</Button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//           <FinanceDataTable
//             columns={FinanceColumnFeeHeaders(handleEdit, handleDeleteHeader)}
//             data={data ? data : []}
//           />
//         </div>
//       </div>

//       {/* Alert Dialog for Deleting Header */}
//       <div className="hidden">
//         <AlertDialogComponent
//           open={isDeleteDialogOpen}
//           onOpenChange={setDeleteDialogOpen}
//           onConfirm={confirmDeleteHeader}
//           title="Are you sure?"
//           description="This action cannot be undone. This will permanently delete this header."
//         />
//       </div>

//       {/* Toast Notifications */}
//       <Toaster richColors />
//     </div>
//   );
// };

// export default FinancePage;

"use client";

import { FinanceColumnFeeHeaders } from "@/app/data-table-components/columns";
import { FinanceDataTable } from "@/app/data-table-components/finance-table-components/data-table";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  GetAllFinanceHeaders,
  CreateNewFinanceHeader,
  DeleteHeader,
} from "@/lib/actions/finance.action";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import AlertDialogComponent from "@/components/Alart";
import { IoIosArrowRoundForward } from "react-icons/io";

interface FinanceHeader {
  id: string;
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

interface FormData {
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

const FinancePage = () => {
  const [data, setData] = useState<FinanceHeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    feesCode: "",
    occurrence: "",
    dueDate: "",
    description: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [headerIdToDelete, setHeaderIdToDelete] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllFinanceHeaders();
      if (result?.error) {
        setError(result.error);
      } else {
        setData(result);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOccurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      occurrence: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, feesCode, occurrence, dueDate } = formData;
    if (!name || !feesCode || !occurrence || !dueDate) {
      toast.error("Please fill in all required fields."); // Use toast for error messages
      return;
    }

    const result = await CreateNewFinanceHeader(formData);
    if (result.error) {
      setError(result.error);
      toast.error("Error creating new header: " + result.error); // Show error toast
    } else {
      setData((prevData) => [...prevData, result]);
      setModalOpen(false);
      toast.success("Header created successfully!"); // Show success toast
    }

    setFormData({
      name: "",
      feesCode: "",
      occurrence: "",
      dueDate: "",
      description: "",
    });
  };

  const handleEdit = async (id: number) => {
    console.log(`Editing header with ID: ${id}`);
  };

  const handleDeleteHeader = async (headerId: string) => {
    setHeaderIdToDelete(headerId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteHeader = async () => {
    const result = await DeleteHeader(headerIdToDelete);

    if (result.error) {
      setError(result.error);
      toast.error("Error deleting header: " + result.error);
      setDeleteDialogOpen(false);
    } else {
      setData((prevData) =>
        prevData.filter((header) => header.id !== headerIdToDelete)
      );
      toast.success("Header deleted successfully!");
      setDeleteDialogOpen(false);
      window.location.reload();
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
    <div className="w-full h-screen my-auto">
      <div className="sub-container px-4">
        <div>
          <div className="grid grid-cols-2">
            <h1 className="font-bold text-lg mb-8">Fee Headers</h1>
            <div className="flex gap-4 mb-4 justify-self-end">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Fee Header</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                  <DialogHeader>
                    <DialogTitle>Create New Header</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new finance header.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="col-span-3 border-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="feesCode" className="text-right">
                        Fees Code
                      </Label>
                      <Input
                        id="feesCode"
                        name="feesCode"
                        value={formData.feesCode}
                        onChange={handleInputChange}
                        className="col-span-3 border-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Occurrence</Label>
                      <div className="col-span-3">
                        <select
                          name="occurrence"
                          value={formData.occurrence}
                          onChange={handleOccurrenceChange}
                          className="w-full py-2 bg-transparent border-2 rounded-lg px-3 text-sm"
                          required>
                          {[
                            "Monthly",
                            "Quarterly",
                            "Half Yearly",
                            "Annual",
                          ].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dueDate" className="text-right">
                        Due Date
                      </Label>
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="col-span-3 border-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="col-span-3 border-2 text-sm"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        Create Header{" "}
                        <span className="-rotate-45">
                          <IoIosArrowRoundForward />
                        </span>
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <FinanceDataTable
            columns={FinanceColumnFeeHeaders(handleEdit, handleDeleteHeader)}
            data={data ? data : []}
          />
        </div>
      </div>

      <div className="hidden">
        <AlertDialogComponent
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteHeader}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete this header."
        />
      </div>

      <Toaster richColors />
    </div>
  );
};

export default FinancePage;
