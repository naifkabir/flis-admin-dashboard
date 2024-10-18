// 'use client';

// import { useForm } from 'react-hook-form';
// import { Button } from './ui/button';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTrigger,
// } from './ui/dialog';
// import { Input } from './ui/input';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { studentApproveFormScheam } from '@/lib/validation';
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from './ui/form';

// const ApproveDialog = () => {
// 	const form = useForm<z.infer<typeof studentApproveFormScheam>>({
// 		resolver: zodResolver(studentApproveFormScheam),
// 	});

// 	const onSubmit = (data: z.infer<typeof studentApproveFormScheam>) => {
// 		console.log(data);
// 	};

// 	return (
// 		<Dialog>
// 			<DialogHeader>
// 				<DialogTrigger asChild>
// 					<Button className="bg-green-500">Approve</Button>
// 				</DialogTrigger>
// 			</DialogHeader>
// 			<DialogContent>
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)}>
// 						<FormField
// 							control={form.control}
// 							name="date"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Date</FormLabel>
// 									<FormControl>
// 										<Input type="date" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="time"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Time</FormLabel>
// 									<FormControl>
// 										<Input type="time" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<div className="flex justify-center pt-4">
// 							<Button>Submit</Button>
// 						</div>
// 					</form>
// 				</Form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default ApproveDialog;

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
import { useState } from "react";

const ApproveDialog = ({ studentId }: { studentId: string }) => {
  const form = useForm<z.infer<typeof studentApproveFormScheam>>({
    resolver: zodResolver(studentApproveFormScheam),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("studentId: ", studentId);

  const onSubmit = async (data: z.infer<typeof studentApproveFormScheam>) => {
    console.log("Approve Clicked", data);
    setLoading(true);
    setError(""); // Reset any previous errors
    try {
      // Include studentId in the API call
      const response = await ApproveApplicationForCounselling({
        ...data,
        studentId,
      });
      console.log("response: ", response);
      if (response.error) {
        setError(response.error); // Set error message
      } else {
        // Handle success (e.g., close dialog or show success message)
        console.log("Application approved:", response);
      }
    } catch (err) {
      setError("An error occurred while approving the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogHeader>
        <DialogTrigger asChild>
          <Button className="bg-green-500">Approve</Button>
        </DialogTrigger>
      </DialogHeader>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
