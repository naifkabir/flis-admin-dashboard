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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster, toast } from "sonner";
import {
  GetAllFinanceHeaders,
  AddHeaderInMaster,
} from "@/lib/actions/finance.action";
import { MdOutlineArrowOutward } from "react-icons/md";

interface AddHeaderInMasterProps {
  masterId: string;
  onClose: () => void;
}

const AddHeaderInMasterComponent = ({
  masterId,
  onClose,
}: AddHeaderInMasterProps) => {
  const [headers, setHeaders] = useState<any[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const result = await GetAllFinanceHeaders();
        if (result.error) {
          toast.error("Failed to load headers", result.error);
        } else {
          setHeaders(result);
        }
      } catch (error: any) {
        toast.error("Failed to fetch headers", error.message);
      }
    };

    fetchHeaders();
  }, []);

  const filteredHeaders = headers.filter((header) =>
    header.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHeaderSelection = (headerId: string) => {
    setSelectedHeaders((prevSelected) =>
      prevSelected.includes(headerId)
        ? prevSelected.filter((id) => id !== headerId)
        : [...prevSelected, headerId]
    );
  };

  const handleAddSelectedHeaders = async () => {
    if (selectedHeaders.length === 0) {
      toast.error("Please select at least one header to add.");
      return;
    }

    setLoading(true);
    const result = await AddHeaderInMaster({
      master_id: masterId,
      headers: selectedHeaders.map((headerId) => ({ header: headerId })),
    });

    setLoading(false);

    if (result.statusCode === 200 && result.success) {
      toast.success("Headers added successfully");
      onClose(); // Close the dialog
      window.location.reload();
    } else {
      toast.error("Failed to add headers");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button onClick={onClose}>Add Headers</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Headers</DialogTitle>
          <DialogDescription>
            Select headers to add to the finance master.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Search Headers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="max-h-[163px] border text-[13.5px]">
          <div className="space-y-1">
            {filteredHeaders.map((header) => (
              <div
                key={header._id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200">
                <input
                  type="checkbox"
                  checked={selectedHeaders.includes(header._id)}
                  onChange={() => handleHeaderSelection(header._id)}
                />
                <span className="ml-2">{header.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            onClick={handleAddSelectedHeaders}
            className="group py-7 w-48 flex justify-center items-center">
            {loading ? ( // Show loading text or spinner
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
                Adding...
              </span>
            ) : (
              <>
                <span>Add Headers</span>
                <MdOutlineArrowOutward className="ml-2 duration-300 group-hover:rotate-45 group-hover:translate-x-3" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
};

export default AddHeaderInMasterComponent;
