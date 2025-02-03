"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddNewClass } from "@/lib/actions/class.action";

const addNewClassSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a class name.",
  }),
  maxAge: z.string().min(1, {
    message: "Please enter a maximum age.",
  }),
  minAge: z.string().min(1, {
    message: "Please enter a minimum age.",
  }),
  description: z.string().optional(),
});

const AddNewClassDialog = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof addNewClassSchema>>({
    resolver: zodResolver(addNewClassSchema),
    defaultValues: {
      name: "",
      maxAge: "",
      minAge: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof addNewClassSchema>) {
    setLoading(true);
    try {
      const result = await AddNewClass(values);
      console.log(result);

      if (result.statusCode === 201) {
        form.reset();
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            Add a new section to your class.
          </DialogDescription>
        </DialogHeader>
        <div className="py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Class Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input placeholder="5" {...field} type="number" />
                        <span>Years</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input placeholder="3" {...field} type="number" />
                        <span>Years</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-5">
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    {loading ? (
                      <span className="flex justify-center items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewClassDialog;
