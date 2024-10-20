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
            Make changes to your amount here. Click save when you're done.
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
            {loading ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
