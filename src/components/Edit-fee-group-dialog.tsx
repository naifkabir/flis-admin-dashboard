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
import { Input } from "@/components/ui/input";
import { UpdateFeeGroup } from "@/lib/actions/finance.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const editFeeGroupFormSchema = z.object({
  name: z.string().min(1, { message: "Group Name is required." }),
  groupCode: z.string().min(1, { message: "Group Code is required." }),
  description: z.string().optional(),
});

const EditFeeGroupDialog = ({
  children,
  groupData,
}: {
  children: React.ReactNode;
  groupData: any;
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof editFeeGroupFormSchema>>({
    resolver: zodResolver(editFeeGroupFormSchema),
    defaultValues: {
      name: groupData.name || "",
      groupCode: groupData.groupCode || "",
      description: groupData.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editFeeGroupFormSchema>) => {
    setSubmitting(true);

    try {
      const toBeSend = { ...values, id: groupData._id };
      const response = await UpdateFeeGroup(toBeSend);

      if (response?.error) {
        toast.warning(response.error);
      } else {
        toast.success("Group data updated successfully!");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Fee Group</DialogTitle>
          <DialogDescription>
            Make changes to your group here. Click update when you&apos;re done.
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
                        Group name <span className="text-red-600">*</span>
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
                  name="groupCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Group Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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

export default EditFeeGroupDialog;
