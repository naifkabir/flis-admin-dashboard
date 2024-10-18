"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentApproveFormScheam } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ApproveApplicationForCounselling } from "@/lib/actions/student.action";
import { useState, useEffect } from "react";

// Helper function to check if a date is in the past
const isDateInThePast = (dateString: any) => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
};

const ApproveDialog = ({ docId }: { docId: string }) => {
  const form = useForm<z.infer<typeof studentApproveFormScheam>>({
    resolver: zodResolver(studentApproveFormScheam),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Start the timer when success state is true
    if (success && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [success, countdown]);

  const onSubmit = async (data: z.infer<typeof studentApproveFormScheam>) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setCountdown(5);

    const submitData = {
      ...data,
      docId, // Add docId to the data object
    };

    console.log("submitData: ", submitData);

    try {
      const response = await ApproveApplicationForCounselling(submitData);
      if (response.error) {
        setError(response.error);
      } else {
        console.log("Application approved:", response);
        setSuccess(true);

        setTimeout(() => {
          setOpen(false); // Close the dialog
          window.history.back(); // Navigate back to the previous page
        }, 5000);
      }
    } catch (err) {
      setError("An error occurred while approving the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTrigger asChild>
          <Button className="bg-green-500 cursor-pointer">Approve</Button>
        </DialogTrigger>
      </DialogHeader>
      <DialogContent>
        <DialogTitle>Approve Counseling Application</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <FormControl>
                    <Input type="date" id="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="time">Time</FormLabel>
                  <FormControl>
                    <Input type="time" id="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <div className="mt-4 p-2 bg-green-700 text-white rounded-">
                Student was successfully invited for counseling.
                <br />
                Redirecting in {countdown} seconds...
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
