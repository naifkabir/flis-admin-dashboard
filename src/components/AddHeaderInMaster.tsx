// components/AddHeaderDialog.tsx
import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetAllFinanceHeaders } from "@/lib/actions/finance.action";
import { DialogContent } from "@radix-ui/react-dialog";

interface AddHeaderDialogProps {
  open: boolean;
  onClose: () => void;
  onAddHeaders: (selectedHeaders: string[]) => void;
}

const AddHeaderDialog: React.FC<AddHeaderDialogProps> = ({
  open,
  onClose,
  onAddHeaders,
}) => {
  const [allHeaders, setAllHeaders] = useState<any[]>([]);
  const [selectedHeaderIds, setSelectedHeaderIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllHeaders = async () => {
      const result = await GetAllFinanceHeaders();
      if (!result.error) {
        setAllHeaders(result);
      }
    };
    fetchAllHeaders();
  }, []);

  const handleCheckboxChange = (headerId: string) => {
    setSelectedHeaderIds((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId]
    );
  };

  const handleSubmit = () => {
    onAddHeaders(selectedHeaderIds);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="font-bold">Select Headers to Add</h2>
        <div className="overflow-y-scroll h-60">
          {" "}
          {/* Scrollable box */}
          {allHeaders.map((header) => (
            <div key={header.header} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={header.header}
                value={header.header}
                checked={selectedHeaderIds.includes(header.header)}
                onChange={() => handleCheckboxChange(header.header)}
              />
              <label htmlFor={header.header} className="ml-2">
                {header.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>Add Selected Headers</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHeaderDialog;
