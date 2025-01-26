'use client';

import { FinanceColumnFeeMasters } from '@/app/data-table-components/columns';
import PageLoader from '@/components/ui-components/PageLoading';
import {
  CreateNewFinanceMaster,
  DeleteHeaderInMaster,
  DeleteMaster,
  GetAllFinanceGroups,
  GetAllFinanceHeaders,
  GetAllFinanceMaster,
} from '@/lib/actions/finance.action';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { EditAmountInMasterDialog } from '@/components/EditAmountInMaster';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MasterPageDataTable } from '@/app/data-table-components/finance-table-components/mastar-page-data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import AddHeaderInMasterComponent from '@/components/AddHeaderInMaster';
import { Input } from '@/components/ui/input';
import { MdOutlineArrowOutward } from 'react-icons/md';
import AlertDialogComponent from '@/components/Alart';
import AlertDialogComponentHeaderInMaster from '@/components/DeleteHeaderInMasterAlart';

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
  createdAt: string;
}

// FinanceHeader
interface FinanceHeader {
  _id: string;
  header: string;
}

// FinanceGroup
interface FinanceGroup {
  _id: string;
  name: string;
}

// form data
interface FormData {
  selectedGroup: string; // Selected group ID
  selectedHeaders: string[]; // Array to hold selected headers (string array)
}

const FinancePageMaster = () => {
  const [master, setAllMaster] = useState<FinanceMaster[]>([]);
  const [filteredMaster, setFilteredMaster] = useState<FinanceMaster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenHeader, setModalOpenHeader] = useState(false);
  const [amountData, setAmountData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleteMasterDialogOpen, setDeleteMasterDialogOpen] =
    useState<boolean>(false);
  const [masterId, setMasterId] = useState<string | null>(null);
  const [deleteHeaderInMasterData, setDeleteHeaderInMasterData] = useState<
    string | null
  >(null);
  const [deleteMasterId, setDeleteMasterId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    selectedGroup: '',
    selectedHeaders: [], // Make sure this is initialized as an empty array
  });
  const [groups, setGroups] = useState<FinanceGroup[]>([]); // State to hold groups
  const [headers, setHeaders] = useState<FinanceHeader[]>([]); // State to hold headers
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // --------------------------------------------------------------
  // # Create Table

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllFinanceMaster();
      console.log(result);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setAllMaster(result);
      extractUniqueYears(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const extractUniqueYears = (masters: FinanceMaster[]) => {
    const years = Array.from(
      new Set(masters.map((master) => new Date(master.createdAt).getFullYear()))
    );
    setYears(years.sort((a, b) => b - a)); // Sort years in descending order
  };

  const filterByYear = (year: number | null) => {
    setSelectedYear(year);
    if (year) {
      setFilteredMaster(
        master.filter(
          (master) => new Date(master.createdAt).getFullYear() === year
        )
      );
    } else {
      setFilteredMaster(master); // Show all if no year selected
    }
  };

  useEffect(() => {
    setFilteredMaster(master);
  }, [master]);

  const handleEditAmount = (amountData: any) => {
    // console.log("Edit header with id:", amountData);
    setAmountData(amountData); // Set the amount data to be edited
  };

  const confirmDeleteHeaderInMaster = async () => {
    try {
      const result = await DeleteHeaderInMaster(deleteHeaderInMasterData);

      if (result.statusCode === 200) {
        toast.success('Header was successfully deleted');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to delete the header');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteHeaderInMaster = async (
    handleDeleteHeaderInMasterData: any
  ) => {
    setDeleteHeaderInMasterData(handleDeleteHeaderInMasterData);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteMaster = async () => {
    try {
      const result = await DeleteMaster(deleteMasterId);

      console.log(result);

      if (result.success) {
        setDeleteDialogOpen(false);
        toast.success('Master was successfully deleted');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error('Failed to delete the Master!');
        setDeleteDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteMaster = async (master_id: string) => {
    // console.log("Master Delete: ", master_id);
    setDeleteMasterId(master_id);
    setDeleteMasterDialogOpen(true);
  };

  // ------------------------------------------------------------------------------
  // # Create New Master

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
      toast.warning('Please select a group and at least one header.');
      return;
    }

    // Create the headers array with each header as an object
    const headersArray = selectedHeaders.map((headerId) => ({
      header: headerId,
    }));

    try {
      const result = await CreateNewFinanceMaster({
        group: selectedGroup,
        headers: headersArray, // Pass the array of objects here
      });

      if (result.error) {
        setError(result.error);
        toast.error('Error creating new master: ' + result.error);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setAllMaster((prev) => [...prev, result]); // Update state with the new master
        setModalOpen(false);
        toast.success('Master created successfully');
        window.location.reload();
      }
    } catch (error: any) {
      setError(error.message);
      toast.error('Error creating new master: ' + error.message);
    }

    // Reset form data
    setFormData({
      selectedGroup: '',
      selectedHeaders: [],
    });
  };

  const handleAddHeader = (master_id: string) => {
    setMasterId(master_id); // Set the master ID for which headers are being added
    setModalOpenHeader(true); // Open the dialog to add headers
  };

  const filteredHeaders = headers.filter((header) =>
    header.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                        <Label className="text-right" htmlFor="selectedGroup">
                          Group
                        </Label>
                        <div className="col-span-3">
                          <select
                            id="selectedGroup"
                            name="selectedGroup"
                            value={formData.selectedGroup}
                            onChange={handleGroupChange}
                            className="w-full py-2 bg-transparent border px-3 text-sm"
                            required
                          >
                            <option value="">Select a group</option>
                            {groups.map((group) => (
                              <option key={group._id} value={group._id}>
                                {group.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Header Selection */}
                      <div className="grid grid-cols-4 items-center gap-x-4">
                        <Label htmlFor="headers" className="text-right">
                          Headers
                        </Label>
                        <Input
                          placeholder="Search Headers"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="col-span-3 border rounded-none mb-0.5"
                        />
                        <div></div>
                        <ScrollArea className="col-span-3 max-h-[163px] border text-[13.5px] overflow-scroll">
                          <div className="space-y-1">
                            {filteredHeaders.map((header) => (
                              <div
                                key={header._id}
                                className="flex items-center p-2 cursor-default hover:bg-gray-200 "
                              >
                                <input
                                  type="checkbox"
                                  className="cursor-pointer"
                                  checked={formData.selectedHeaders.includes(
                                    header._id
                                  )}
                                  onChange={() =>
                                    handleHeaderSelection(header._id)
                                  }
                                />
                                <span className="ml-2">{header.name}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <DialogFooter>
                        <Button
                          type="submit"
                          className="group py-7 w-48 flex justify-center items-center"
                        >
                          <span>Create Master</span>
                          <MdOutlineArrowOutward className="ml-2 duration-300 group-hover:rotate-45 group-hover:translate-x-3" />
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedYear === null ? 'default' : 'outline'}
              onClick={() => filterByYear(null)}
            >
              All Years
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? 'default' : 'outline'}
                onClick={() => filterByYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
          <MasterPageDataTable
            columns={FinanceColumnFeeMasters(
              handleEditAmount,
              handleDeleteHeaderInMaster,
              handleAddHeader,
              handleDeleteMaster
            )}
            data={filteredMaster}
          />
        </div>
      </div>
      {isModalOpenHeader && masterId && (
        <div className="hidden">
          <AddHeaderInMasterComponent
            masterId={masterId}
            onClose={() => setModalOpenHeader(false)}
          />
        </div>
      )}
      <Toaster richColors />
      <EditAmountInMasterDialog
        amountData={amountData}
        onClose={() => {
          setAmountData(null);
        }}
      />
      <div className="hidden">
        <AlertDialogComponent
          open={isDeleteMasterDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteMaster}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete this master."
        />
      </div>

      <div className="hidden">
        <AlertDialogComponentHeaderInMaster
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteHeaderInMaster}
          title="Are you sure?"
          description="This action cannot be undone. This will delete this header from the master."
        />
      </div>
    </div>
  );
};

export default FinancePageMaster;
