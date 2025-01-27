import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdErrorOutline } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { GetHeaderById, UpdateFeeHeader } from "@/lib/actions/finance.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const editFeeHeaderFormSchema = z.object({
  name: z.string().min(1, { message: "Header Name is required." }),
  feesCode: z.string().min(1, { message: "Fees Code is required." }),
  occurrence: z.string().min(1, { message: "Occurrence is required." }),
  dueDate: z.string().min(1, { message: "Due Date is required." }),
  description: z.string().optional(),
});

const EditFeeHeaderDialog = ({
  children,
  headerId,
}: {
  children: React.ReactNode;
  headerId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof editFeeHeaderFormSchema>>({
    resolver: zodResolver(editFeeHeaderFormSchema),
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const financeData = await GetHeaderById(headerId);
      if (financeData) {
        const { _id, ...rest } = financeData;
        form.reset({
          name: rest.name || "",
          feesCode: rest.feesCode || "",
          occurrence: rest.occurrence || "",
          dueDate: rest.dueDate || "",
          description: rest.description || "",
        });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof editFeeHeaderFormSchema>) => {
    setSubmitting(true);

    try {
      const toBeSend = { ...values, id: headerId };
      const response = await UpdateFeeHeader(toBeSend);

      if (response?.error) {
        toast.warning(response.error);
      } else {
        toast.success("Finance data updated successfully!");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen && headerId) {
      fetchData(); // Fetch data only when dialog opens
    }
  }, [isDialogOpen, headerId]);

  if (loading) {
    return (
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
      </span>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center"
        title="Error, Not able to edit.">
        <MdErrorOutline size={20} />
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Fee Header</DialogTitle>
          <DialogDescription>
            Make changes to your header here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="py-7 space-y-3">
              <div className="grid grid-cols-2 space-x-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Header name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feesCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Fees Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 space-x-3">
                <FormField
                  control={form.control}
                  name="occurrence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Occurrence <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Occurrence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                          <SelectItem value="Half Yearly">
                            Half Yearly
                          </SelectItem>
                          <SelectItem value="Annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Due Date <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex justify-between min-w-full">
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {submitting ? (
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
                    "Update"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFeeHeaderDialog;
