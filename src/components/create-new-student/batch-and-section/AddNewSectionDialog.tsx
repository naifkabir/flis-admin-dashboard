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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { GetAllClasses } from "@/lib/actions/class.action";
import { toast } from "sonner";
import { AddNewSection } from "@/lib/actions/addNewSection.action";
import { Input } from "@/components/ui/input";

const addNewSectionSchema = z.object({
  classId: z.string().min(1, {
    message: "Class must be selected.",
  }),
  name: z.string().min(1, {
    message: "Please enter a section name.",
  }),
  maxStudents: z.string().min(1, {
    message: "Please enter a maximum number of students.",
  }),
});

export function AddNewSectionDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof addNewSectionSchema>>({
    resolver: zodResolver(addNewSectionSchema),
    defaultValues: {
      classId: "",
      name: "",
      maxStudents: "",
    },
  });

  const [classData, setClassData] = useState([]);
  const [fetchClassDataLoading, setFetchClassDataLoading] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetchClassDataLoading;
      try {
        const classResult = await GetAllClasses();

        if (classResult) {
          setClassData(classResult);
        } else {
          toast.error(classResult.error);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setFetchClassDataLoading(false);
      }
    };
    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof addNewSectionSchema>) {
    setLoading(true);
    try {
      const result = await AddNewSection(values);

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
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fetchClassDataLoading ? (
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
                          classData.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="A / B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxStudents"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="30" {...field} type="number" />
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
                      "Add"
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
}
