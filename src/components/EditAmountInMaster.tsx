import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { SetAmountInMaster } from "@/lib/actions/finance.action";

export function EditAmountInMasterDialog({
  amountData,
  onClose,
}: {
  amountData: any;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState<number | string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amountData) {
      setAmount(amountData.amount);
    } else {
      setAmount("");
    }
  }, [amountData]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      obj_id: amountData.obj_id,
      master_id: amountData.master_id,
      amount: amount,
    };

    try {
      const response = await SetAmountInMaster(data); // Call API
      if (response.error) {
        throw new Error(response.error);
      }
      toast.success("Amount updated successfully!");
      onClose(); // Close the dialog
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={!!amountData} // Open the dialog only if amountData is not null
      onOpenChange={(open) => {
        if (!open) onClose();
      }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Amount</DialogTitle>
          <DialogDescription>
            Make changes to your amount here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? (
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
                Updating...
              </span>
            ) : (
              "Update Amount"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
}
