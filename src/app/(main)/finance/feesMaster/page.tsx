"use client";

import { FinanceColumnFeeMasters } from "@/app/data-table-components/columns";
import PageLoader from "@/components/ui-components/PageLoading";
import {
  AddHeaderInMaster,
  CreateNewFinanceMaster,
  DeleteHeaderInMaster,
  DeleteMaster,
  GetAllFinanceGroups,
  GetAllFinanceHeaders,
  GetAllFinanceMaster,
  GetGroupById,
  GetHeaderById,
} from "@/lib/actions/finance.action";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { EditAmountInMasterDialog } from "@/components/EditAmountInMaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MasterPageDataTable } from "@/app/data-table-components/finance-table-components/mastar-page-data-table";

interface FinanceHeader {
  header: string;
  name: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

interface FinanceMaster {
  header: string;
  group: string;
  headers: FinanceHeader[];
}

// --------------------------------------------------------------
// --------------------------------------------------------------
// Define interface for FinanceHeader
interface FinanceHeader {
  _id: string; // Adding id to FinanceHeader
  header: string;
}

// Define interface for FinanceGroup
interface FinanceGroup {
  _id: string;
  name: string;
}

// Define interface for form data
interface FormData {
  selectedGroup: string; // Selected group ID
  selectedHeaders: string[]; // Array to hold selected headers (string array)
}
// --------------------------------------------------------------
// --------------------------------------------------------------

const FinancePageMaster = () => {
  const [master, setAllMaster] = useState<FinanceMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenHeader, setModalOpenHeader] = useState(false);
  const [amountData, setAmountData] = useState<any>(null); // State to hold the data for amount

  const [masterId, setMasterId] = useState<string | null>(null); // State to hold the master ID

  // --------------------------------------------------------------
  // --------------------------------------------------------------
  const [formData, setFormData] = useState<FormData>({
    selectedGroup: "",
    selectedHeaders: [], // Make sure this is initialized as an empty array
  });

  const [groups, setGroups] = useState<FinanceGroup[]>([]); // State to hold groups
  const [headers, setHeaders] = useState<FinanceHeader[]>([]); // State to hold headers

  const [selectedHeadersToAdd, setSelectedHeadersToAdd] = useState<string[]>(
    []
  );
  // --------------------------------------------------------------
  // --------------------------------------------------------------

  // --------------------------------------------------------------
  // # Create Table
  // --------------------------------------------------------------

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await GetAllFinanceMaster();
  //     // console.log("GetAllFinanceMaster Result:", result);

  //     if (result.error) {
  //       setError(result.error);
  //       setLoading(false);
  //       return;
  //     }

  //     const headerPromises: Promise<any>[] = [];
  //     result.forEach((master: any) => {
  //       master.headers.forEach((header: any) => {
  //         headerPromises.push(
  //           GetHeaderById(header.header).then((data) => ({
  //             ...data,
  //             amount: header.amount, // Add amount to the header data
  //             _id: header._id, // Include ID for deletion
  //           }))
  //         );
  //       });
  //     });

  //     // Wait for all header data to be fetched
  //     const headersData = await Promise.all(headerPromises);

  //     // Build updated masters with valid headers including amount
  //     const updatedMasters = result.map((item: any, index: any) => ({
  //       ...item,
  //       headers: headersData.slice(
  //         index * item.headers.length,
  //         (index + 1) * item.headers.length
  //       ),
  //     }));

  //     console.log("updatedMasters: ", updatedMasters);

  //     setAllMaster(updatedMasters);
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllFinanceMaster();

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      const headerPromises: Promise<any>[] = [];
      const groupPromises: Promise<any>[] = [];

      result.forEach((master: any) => {
        master.headers.forEach((header: any) => {
          headerPromises.push(
            GetHeaderById(header.header).then((data) => ({
              ...data,
              amount: header.amount, // Add amount to the header data
              _id: header._id, // Include ID for deletion
            }))
          );
        });

        // Fetch group data for each master
        groupPromises.push(
          GetGroupById(master.group).then((groupData) => ({
            groupId: master.group,
            groupData,
          }))
        );
      });

      // Wait for all header data to be fetched
      const headersData = await Promise.all(headerPromises);
      const groupDataArray = await Promise.all(groupPromises);

      // Build updated masters with valid headers including amount and group data
      const updatedMasters = result.map((item: any, index: any) => ({
        ...item,
        headers: headersData.slice(
          index * item.headers.length,
          (index + 1) * item.headers.length
        ),
        groupData: groupDataArray[index].groupData, // Add group data to the master
      }));

      setAllMaster(updatedMasters);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("Master: ", master);

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  const handleEditAmount = (amountData: any) => {
    // console.log("Edit header with id:", amountData);
    setAmountData(amountData); // Set the amount data to be edited
  };

  const handleDeleteHeaderInMaster = async (
    handleDeleteHeaderInMasterData: any
  ) => {
    const result = await DeleteHeaderInMaster(handleDeleteHeaderInMasterData);

    if (result.success) {
      toast.success("Header was successfully deleted");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Failed to delete the header");
    }
  };

  const handleDeleteMaster = async (master_id: string) => {
    // console.log("Master Delete: ", master_id);
    const result = await DeleteMaster(master_id);

    if (result.success) {
      toast.success("Master was successfully deleted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Failed to delete the Master!");
    }
  };

  // ------------------------------------------------------------------------------
  // # Create New Master
  // ------------------------------------------------------------------------------

  // Fetch all finance groups
  useEffect(() => {
    const fetchGroups = async () => {
      const groupsResult = await GetAllFinanceGroups();
      if (groupsResult.error) {
        setError(groupsResult.error);
      } else {
        setGroups(groupsResult);
      }
    };

    fetchGroups();
  }, []);

  // Fetch all finance headers
  useEffect(() => {
    const fetchHeaders = async () => {
      const headersResult = await GetAllFinanceHeaders();
      if (headersResult.error) {
        setError(headersResult.error);
      } else {
        setHeaders(headersResult);
      }
    };

    fetchHeaders();
  }, []);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedGroup: value,
    }));
  };

  const handleHeaderSelection = (headerId: string) => {
    setFormData((prevData) => {
      const selectedHeaders = prevData.selectedHeaders.includes(headerId)
        ? prevData.selectedHeaders.filter((id) => id !== headerId)
        : [...prevData.selectedHeaders, headerId];

      return { ...prevData, selectedHeaders };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { selectedGroup, selectedHeaders } = formData;
    if (!selectedGroup || selectedHeaders.length === 0) {
      alert("Please select a group and at least one header.");
      return;
    }

    // Create the headers array with each header as an object
    const headersArray = selectedHeaders.map((headerId) => ({
      header: headerId,
    }));

    const result = await CreateNewFinanceMaster({
      group: selectedGroup,
      headers: headersArray, // Pass the array of objects here
    });

    if (result.error) {
      setError(result.error);
      alert("Error creating new master: " + result.error);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setAllMaster((prev) => [...prev, result]); // Update state with the new master
      setModalOpen(false);
      alert("Master created successfully");
      window.location.reload();
    }

    // Reset form data
    setFormData({
      selectedGroup: "",
      selectedHeaders: [],
    });
  };

  // ------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------

  // const handleAddHeader = (master_id: string) => {
  //   console.log("clicked: ", master_id);
  // };

  // // Updated handleAddHeader function
  // const handleAddHeader = (: string) => {
  //   setModalOpen(true); // Open the dialog
  // };

  // Function to handle adding headers
  const handleAddHeader = (master_id: string) => {
    console.log("master_id: ", master_id);
    setMasterId(master_id);
    setModalOpenHeader(true); // Open the dialog to add headers
  };

  const handleHeaderSelectionForAdd = (headerId: string) => {
    setSelectedHeadersToAdd((prev) => {
      const isSelected = prev.includes(headerId);
      if (isSelected) {
        // If the header is already selected, remove it from the selection
        return prev.filter((id) => id !== headerId);
      } else {
        // Otherwise, add it to the selection
        return [...prev, headerId];
      }
    });
  };

  const handleAddSelectedHeaders = async () => {
    // Logic to add the selected headers to the finance master
    if (selectedHeadersToAdd.length === 0) {
      toast.error("Please select at least one header to add.");
      return;
    }

    console.log("handleAddSelectedHeaders: ", handleAddSelectedHeaders);

    // Create the headers array with each header as an object
    const headersArrayToAddHeaders = selectedHeadersToAdd.map((headerId) => ({
      header: headerId,
    }));

    console.log("handleAddSelectedHeaders: ", headersArrayToAddHeaders);

    // Assuming you have an API function to add headers to the master
    console.log("Before Call");
    const result = await AddHeaderInMaster({
      master_id: masterId,
      headers: headersArrayToAddHeaders,
    });
    console.log("After Call");

    if (result.success) {
      toast.success("Headers added successfully");
      setModalOpen(false); // Close the dialog
      setSelectedHeadersToAdd([]); // Reset selection
      // Optionally refresh the data to reflect changes
      window.location.reload();
    } else {
      toast.error("Failed to add headers");
    }
  };

  const AddHeaderDialog = () => (
    <Dialog open={isModalOpenHeader} onOpenChange={setModalOpenHeader}>
      <DialogContent className="max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add Headers</DialogTitle>
          <DialogDescription>
            Select headers to add to the finance master.
          </DialogDescription>
        </DialogHeader>
        <div className="col-span-3 flex flex-col gap-2 max-h-40 overflow-y-auto border-2 rounded-lg px-3">
          {headers.map((header) => (
            <label key={header._id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedHeadersToAdd.includes(header._id)} // Check if header is selected
                onChange={() => handleHeaderSelectionForAdd(header._id)} // Handle selection
              />
              <span className="ml-2">{header.name}</span>
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleAddSelectedHeaders}>
            Add Selected Headers
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // ------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------
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
    <div className="w-full min-h-screen my-auto">
      <div className="sub-container px-4">
        <div>
          <div className="grid grid-cols-2">
            <h1 className="font-bold text-lg mb-8">Fee Masters</h1>
            <div className="flex gap-4 mb-4 justify-self-end">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>

              <div>
                <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button>Create New Fee Master</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle>Create New Master</DialogTitle>
                      <DialogDescription>
                        Select a group and choose headers for the new finance
                        master.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                      {/* Group Selection */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="selectedGroup"
                          className="text-gray-800 text-md font-semibold text-right">
                          Group
                        </Label>
                        <select
                          id="selectedGroup"
                          name="selectedGroup"
                          value={formData.selectedGroup}
                          onChange={handleGroupChange}
                          className="col-span-3 border-gray-800 px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-pointer"
                          required>
                          <option value="">Select a group</option>
                          {groups.map((group) => (
                            <option key={group._id} value={group._id}>
                              {group.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Header Selection */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="headers" className="text-right">
                          Headers
                        </Label>
                        <div className="col-span-3 flex flex-col gap-2 max-h-40 overflow-y-auto border-2 rounded-lg py-[16px] text-xs bg-[#f8f7f4]  w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-pointer">
                          {headers.map((header) => (
                            <label
                              key={header._id}
                              className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.selectedHeaders.includes(
                                  header._id
                                )}
                                onChange={() =>
                                  handleHeaderSelection(header._id)
                                }
                              />
                              <span className="ml-2">{header.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit">Create</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <MasterPageDataTable
            columns={FinanceColumnFeeMasters(
              handleEditAmount,
              handleDeleteHeaderInMaster,
              handleAddHeader,
              handleDeleteMaster
            )}
            data={master}
          />
        </div>
      </div>
      <AddHeaderDialog />
      <Toaster richColors />
      <EditAmountInMasterDialog
        amountData={amountData} // Pass the current amountData state
        onClose={() => {
          setAmountData(null);
        }}
      />
    </div>
  );
};

export default FinancePageMaster;
