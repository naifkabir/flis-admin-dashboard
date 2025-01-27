"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const ApproveDialog = ({
  docId,
  applicationStatus,
}: {
  docId: string;
  applicationStatus: any;
}) => {
  const form = useForm<z.infer<typeof studentApproveFormScheam>>({
    resolver: zodResolver(studentApproveFormScheam),
    defaultValues: {
      date: "",
      time: "",
    },
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

    try {
      const response = await ApproveApplicationForCounselling(submitData);
      if (response.error) {
        setError("Request failed. Please try again.");
      }
      if (response.statusCode === 200) {
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
          <Button className="bg-[#228B22] cursor-pointer">
            {applicationStatus === "UNDER-COUNSELLING"
              ? "Assign New Counselling Date"
              : "Approve Application"}
          </Button>
        </DialogTrigger>
      </DialogHeader>
      <DialogContent>
        <DialogTitle>
          {applicationStatus === "UNDER-COUNSELLING"
            ? "Assign New Counselling Date"
            : " Invite Student for Counseling"}
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
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
              <Button type="submit" disabled={loading} className="bg-[#228B22]">
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
                    Sending...
                  </span>
                ) : (
                  "Send SMS & Email"
                )}
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
