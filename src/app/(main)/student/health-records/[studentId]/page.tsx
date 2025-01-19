'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadDietChart } from '@/lib/actions/uploadStudentDocs.action';

const healthRecordFormSchema = z.object({
  special_medical_conditions: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== '',
        'Cannot be blank or whitespace'
      ),
  }),
  special_assistance: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== '',
        'Cannot be blank or whitespace'
      ),
  }),
  regular_medication: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== '',
        'Cannot be blank or whitespace'
      ),
  }),
  allergies: z.object({
    details: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.trim() !== '',
        'Cannot be blank or whitespace'
      ),
  }),
  height: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() !== '',
      'Cannot be blank or whitespace'
    ),
  weight: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() !== '',
      'Cannot be blank or whitespace'
    ),
  dietchart: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Please select a file'
    ),
});

type FormValues = z.infer<typeof healthRecordFormSchema>;

const HealthRecordForm = ({ params }: { params: { studentId: string } }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(healthRecordFormSchema),
  });

  const { studentId } = params;

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

    formData.append('dietchart', values.dietchart[0]);
    formData.append(
      'medical_details',
      JSON.stringify(dataToSend.medical_details)
    );

    console.log('Filtered Data:', formData.get('dietchart'));

    try {
      const response = await UploadDietChart(studentId, formData);

      if (response.statusCode !== 200) {
        toast.error(`Failed to upload diet chart. Please try again.`);
      } else {
        toast.success(`Diet chart uploaded successfully!`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full text-black"
        >
          <div className="grid gap-10">
            <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Medical Details
              </h2>

              {/* Medical Details */}
              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="allergies.details"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Allergy Details :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Special Medical Condition :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Regular Medication Details :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Special Assistance Details :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Height :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Weight :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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

                <FormField
                  control={form.control}
                  name="dietchart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Chart</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          onChange={(e) => {
                            field.onChange(e.target.files); // Pass FileList to form state
                          }}
                          multiple={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-8 grid justify-end">
              <div className="flex items-center">
                <Button type="submit" className={cn('w-fit h-12')}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Toaster richColors />
    </div>
  );
};

export default HealthRecordForm;
