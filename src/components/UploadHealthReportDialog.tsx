"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDietChart } from "@/lib/actions/uploadStudentDocs.action";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { FaImages } from "react-icons/fa";
import Image from "next/image";

const healthRecordFormSchema = z.object({
  special_medical_conditions: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== "",
        "Cannot be blank or whitespace"
      ),
  }),
  special_assistance: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== "",
        "Cannot be blank or whitespace"
      ),
  }),
  regular_medication: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== "",
        "Cannot be blank or whitespace"
      ),
  }),
  allergies: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== "",
        "Cannot be blank or whitespace"
      ),
  }),
  height: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() !== "",
      "Cannot be blank or whitespace"
    ),
  weight: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() !== "",
      "Cannot be blank or whitespace"
    ),
  dietchart: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Please select a file"
    ),
});

type FormValues = z.infer<typeof healthRecordFormSchema>;

export function UploadHealthReportDialog({
  children,
  studentId,
}: {
  children: React.ReactNode;
  studentId: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(healthRecordFormSchema),
  });

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    setIsLoading(true);
    setIsDialogOpen(true);

    const dataToSend = {
      medical_details: {
        ...(values.allergies.details?.trim() && {
          allergies: {
            details: values.allergies.details.trim(),
            status: true,
          },
        }),
        ...(values.special_medical_conditions.details?.trim() && {
          special_medical_conditions: {
            details: values.special_medical_conditions.details.trim(),
            status: true,
          },
        }),
        ...(values.special_assistance.details?.trim() && {
          special_assistance: {
            details: values.special_assistance.details.trim(),
            status: true,
          },
        }),
        ...(values.regular_medication.details?.trim() && {
          regular_medication: {
            details: values.regular_medication.details.trim(),
            status: true,
          },
        }),
        ...(values.height?.trim() && { height: values.height.trim() }),
        ...(values.weight?.trim() && { weight: values.weight.trim() }),
      },
    };

    if (values.dietchart[0]) {
      formData.append("dietchart", values.dietchart[0]);
    }

    formData.append(
      "medical_details",
      JSON.stringify(dataToSend.medical_details)
    );

    try {
      const response = await UploadDietChart(studentId, formData);

      if (response.statusCode !== 200) {
        toast.error(`Failed to upload diet chart. Please try again.`);
      } else {
        toast.success(`Diet chart uploaded successfully!`);
        setPdfPreview(null);
        setImagePreview(null);
        setFileName("");
        form.reset();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : "");

    if (file) {
      if (file.type.startsWith("image")) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setPdfPreview(null);
      } else if (file.type === "application/pdf") {
        const previewUrl = URL.createObjectURL(file);
        setPdfPreview(previewUrl);
        setImagePreview(null);
      } else {
        setImagePreview(null);
        setPdfPreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setPdfPreview(null);
    setImagePreview(null);
    form.setValue("dietchart", null);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Upload Health Report</DialogTitle>
          <DialogDescription>
            Fill required details to upload health report.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full text-black">
            <div className="grid lg:grid-cols-2 gap-4 py-6">
              <FormField
                control={form.control}
                name="allergies.details"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Allergy Details"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="special_medical_conditions.details"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Special Medical Condition Details"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regular_medication.details"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Regular Medication Details"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="special_assistance.details"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Special Assistance Details"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Height"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Weight"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-semibold text-gray-600 -translate-y-1">
                      Optional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2 ">
                <FormField
                  control={form.control}
                  name="dietchart"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="border-2 h-10 rounded relative">
                          <Input
                            type="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleFileChange(e);
                            }}
                            className="opacity-0 w-full h-full cursor-pointer"
                            multiple={false}
                          />
                          <span className="absolute top-1/2 -translate-y-1/2 bg-black h-full px-2 grid place-items-center rounded-l-sm">
                            <FaImages className="text-xl text-white" />
                          </span>
                          {!fileName ? (
                            <p className="absolute top-1/2 -translate-y-1/2 text-[13px] text-gray-400 left-12 -z-10">
                              No file selected
                            </p>
                          ) : (
                            <p className="absolute top-1/2 -translate-y-1/2 text-[13px] text-black left-12">
                              {fileName}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {imagePreview && (
                <Image
                  width={500}
                  height={500}
                  src={imagePreview}
                  alt="Diet Chart Preview"
                  className="w-full h-32 object-cover rounded-md border-2"
                />
              )}
              {pdfPreview && (
                <div>
                  <object
                    data={pdfPreview}
                    type="application/pdf"
                    width="100%"
                    height="300px">
                    <p>
                      Your browser does not support PDFs. Download the PDF to
                      view it: <a href={pdfPreview}>Download PDF</a>.
                    </p>
                  </object>
                </div>
              )}
            </div>

            <DialogFooter>
              <div className="w-full">
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button
                  variant="outline"
                  onClick={handleRemoveFile}
                  className="ml-2">
                  Remove Image
                </Button>
              </div>
              <Button type="submit">
                {isLoading ? (
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
                    Uploading
                  </span>
                ) : (
                  <span>Upload</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
}
