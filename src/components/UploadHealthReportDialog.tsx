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
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDietChart } from "@/lib/actions/uploadStudentDocs.action";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

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
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
  };

  return (
    <Dialog>
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
                          {!fileName ? (
                            <p className="absolute top-1/2 -translate-y-1/2 text-[13px] text-gray-400 left-[9px]">
                              No file selected
                            </p>
                          ) : (
                            <p className="absolute top-1/2 -translate-y-1/2 text-[13px] text-black left-[9px]">
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
                  className="w-full h-32 object-cover rounded-md"
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
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
}
