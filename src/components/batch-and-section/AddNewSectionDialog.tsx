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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { GetAllClasses } from "@/lib/actions/class.action";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { AddNewSection } from "@/lib/actions/addNewSection.action";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResult = await GetAllClasses();

        if (classResult) {
          setClassData(classResult);
        } else {
          toast.error("Failed to fetch class data");
        }
      } catch (error) {
        toast.error("Error fetching class data");
      }
    };
    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof addNewSectionSchema>) {
    try {
      const result = await AddNewSection(values);

      if (result.statusCode === 201) {
        form.reset();
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error("Error adding new section");
      }
    } catch (error) {
      toast.error("Error adding new section" + error);
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
                        {classData.map((classItem: any) => (
                          <SelectItem key={classItem._id} value={classItem._id}>
                            {classItem.name}
                          </SelectItem>
                        ))}
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
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
