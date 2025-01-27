import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { AddPaymentRecord } from "@/lib/actions/studentFees.action";

interface AddPaymentHistoryProps {
  feesStructureId: string;
  feeId: string;
}

// Define the zod schema
const paymentRecordSchema = z
  .object({
    discountAmount: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Discount must be zero or a positive number",
      }),
    amountPaid: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
      }),
    paymentMethod: z.enum(["CASH", "CARD", "ONLINE"], {
      errorMap: () => ({ message: "Please select a valid payment method" }),
    }),
    transactionId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (["CARD", "ONLINE"].includes(data.paymentMethod)) {
        return data.transactionId?.trim();
      }
      return true;
    },
    {
      message: "Transaction ID is required for Card or Online payments",
      path: ["transactionId"], // Attach the error to the transactionId field
    }
  );

const AddPaymentHistoryDialog = ({
  feesStructureId,
  feeId,
}: AddPaymentHistoryProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof paymentRecordSchema>>({
    resolver: zodResolver(paymentRecordSchema),
    defaultValues: {
      discountAmount: "0",
      amountPaid: "",
      paymentMethod: "CASH",
      transactionId: "N/A",
    },
  });

  async function onSubmit(values: z.infer<typeof paymentRecordSchema>) {
    setLoading(true);

    const data = {
      discountAmount: Number(values.discountAmount),
      amountPaid: Number(values.amountPaid),
      paymentMethod: values.paymentMethod,
      transactionId: values.transactionId,
    };

    try {
      const response = await AddPaymentRecord(feesStructureId, feeId, data);

      if (response?.error) {
        toast.error(response.error);
        return;
      }
      toast.success("Payment record added successfully!");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsModalOpen(true)} className="my-2">
          Add Payment Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Record</DialogTitle>
          <DialogDescription>
            Add payment record to the payment history
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="discountAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amountPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Paid</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment method</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="CARD">Card</SelectItem>
                        <SelectItem value="ONLINE">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter transaction ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
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
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
};

export default AddPaymentHistoryDialog;
