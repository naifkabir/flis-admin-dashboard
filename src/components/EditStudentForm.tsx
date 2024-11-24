import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CreateNewStudent } from "@/lib/actions/student.action";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoArrowRedoOutline } from "react-icons/io5";
import { getRandomValues } from "crypto";

const studentApproveFormScheam = z
  .object({
    first_name: z.string().min(1, {
      message: "Required first name",
    }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, {
      message: "Required last name",
    }),
    gender: z.string().min(1, {
      message: "Required gender",
    }),
    date_of_birth: z.string().min(1, {
      message: "Required date of birth",
    }),
    birth_certificate_number: z.string().min(1, {
      message: "Required birth certificate number",
    }),
    birth_place: z.string().min(1, {
      message: "Required birth place",
    }),
    mother_tongue: z.string().min(1, {
      message: "Required mother tongue",
    }),
    language_spoken_at_home: z.string().min(1, {
      message: "Required language spoken at home",
    }),
    religion: z.string().min(1, {
      message: "Required religion",
    }),
    aadhaar_number: z.string().optional(),
    caste: z.string().min(1, { message: "Caste is required" }),
    caste_certificate_number: z.string().optional(),
    pwd_certificate_number: z.string().optional(),
    hobbies: z.string().optional(),

    class: z.string().min(1, {
      message: "Required class",
    }),
    academic_era: z.string().min(1, {
      message: "Required academic era",
    }),

    blood_group: z.string().min(1, {
      message: "Required blood group",
    }),
    height: z.string().min(1, {
      message: "Required height",
    }),
    weight: z.string().min(1, {
      message: "Required weight",
    }),
    father_name: z.string().min(1, {
      message: "Required father name",
    }),
    father_occupation: z.string().min(1, {
      message: "Required father occupation",
    }),
    father_contact: z.string().min(1, {
      message: "Required father contact",
    }),
    mother_name: z.string().min(1, {
      message: "Required mother name",
    }),
    mother_occupation: z.string().min(1, {
      message: "Required mother occupation",
    }),
    mother_contact: z.string().min(1, {
      message: "Required mother contact",
    }),
    relationship: z.string().min(1, { message: "Required relationship" }),
    name: z.string().min(1, { message: "Required guardian name" }),
    occupation: z.string().min(1, { message: "Required occupation" }),
    contact_no: z.string().min(1, { message: "Required contact number" }),
    whatsapp_no: z.string().min(1, { message: "Required WhatsApp number" }),
    email: z.string().email({ message: "Invalid e-mail" }),
    qualification: z.string().min(1, { message: "Required qualification" }),
    annual_income: z.string().min(1, { message: "Required annual income" }),
    village: z.string().min(1, { message: "Required village" }),
    post_office: z.string().min(1, { message: "Required post office" }),
    police_station: z.string().min(1, { message: "Required police station" }),
    district: z.string().min(1, { message: "Required district" }),
    state: z.string().min(1, { message: "Required state" }),
    country: z.string().min(1, { message: "Required country" }),
    postal_code: z.string().min(1, { message: "Required postal code" }),
    permanent_village: z.string().min(1, { message: "Required village" }),
    permanent_post_office: z
      .string()
      .min(1, { message: "Required post office" }),
    permanent_police_station: z
      .string()
      .min(1, { message: "Required police station" }),
    permanent_district: z.string().min(1, { message: "Required district" }),
    permanent_state: z.string().min(1, { message: "Required state" }),
    permanent_country: z.string().min(1, { message: "Required country" }),
    permanent_postal_code: z
      .string()
      .min(1, { message: "Required postal code" }),
    // institute_name: z.string().min(1, { message: "Required institute name" }),
    // board_affiliation: z
    //   .string()
    //   .min(1, { message: "Required board affiliation" }),
    // previous_class: z.string().min(1, { message: "Required previous class" }),
    institute_name: z.string().optional(),
    board_affiliation: z.string().optional(),
    previous_class: z.string().optional(),
    tc_submitted: z.boolean(),
    allergies: z.object({
      details: z.string().optional(),
    }),
    special_medical_conditions: z.object({
      details: z.string().optional(),
    }),
    regular_medication: z.object({
      details: z.string().optional(),
    }),
    special_assistance: z.object({
      details: z.string().optional(),
    }),
    // account_holder_name: z
    //   .string()
    //   .min(1, { message: "Required account holder name" }),
    // bank_name: z.string().min(1, { message: "Required bank name" }),
    // account_no: z.string().min(1, { message: "Required account number" }),
    // ifsc_code: z.string().min(1, { message: "Required IFSC code" }),

    account_holder_name: z.string().optional(),
    bank_name: z.string().optional(),
    account_no: z.string().optional(),
    ifsc_code: z.string().optional(),
    changed_image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      // Conditionally validate caste_certificate_number based on caste
      if (data.caste !== "General" && !data.caste_certificate_number) {
        return false; // Invalid if `caste_certificate_number` is missing for non-General caste
      }
      return true; // Valid otherwise
    },
    {
      message: "Caste Certificate Number is required for non-General caste.",
      path: ["caste_certificate_number"], // Error will appear under this field
    }
  );

type FormValues = z.infer<typeof studentApproveFormScheam>;

const EditStudentForm = ({ data }: { data: any }) => {
  const [age, setAge] = useState<number | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // console.log("Edit page data: ", data);

  // Set initial date of birth if it exists in data
  useEffect(() => {
    if (data.date_of_birth) {
      const normalizedDate = new Date(data.date_of_birth);
      const formattedDate = `${normalizedDate.getFullYear()}-${(
        normalizedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${normalizedDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      setDateOfBirth(formattedDate); // Set initial state
    }
  }, [data.date_of_birth]);

  // Calculate age based on the date of birth
  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Adjust age if the birth date hasn't occurred this year yet
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      // console.log("Age: ", calculatedAge);
      setAge(calculatedAge);
    } else {
      setAge(null); // Reset age if no date of birth
    }
  }, [dateOfBirth]);

  const form = useForm<FormValues>({
    resolver: zodResolver(studentApproveFormScheam),
    defaultValues: {
      ...data,
      student_photo: data.student_photo,

      // Permanent Address Details
      permanent_country: data.permanent_address.country,
      permanent_state: data.permanent_address.state,
      permanent_district: data.permanent_address.district,
      permanent_postal_code: data.permanent_address.postal_code,
      permanent_post_office: data.permanent_address.post_office,
      permanent_police_station: data.permanent_address.police_station,
      permanent_village: data.permanent_address.village,

      // Father Details
      father_name: data.father_information.name,
      father_annual_income: data.father_information.annual_income,
      father_qualification: data.father_information.qualification,
      father_email: data.father_information.email,
      father_occupation: data.father_information.occupation,
      father_contact: data.father_information.contact_no,
      father_whatsapp_no: data.father_information.whatsapp_no,

      // Mother Details
      mother_name: data.father_information.name,
      mother_annual_income: data.father_information.annual_income,
      mother_qualification: data.father_information.qualification,
      mother_email: data.father_information.email,
      mother_occupation: data.father_information.occupation,
      mother_contact: data.father_information.contact_no,
      mother_whatsapp_no: data.father_information.whatsapp_no,

      date_of_birth: data.date_of_birth,
      tc_submitted: data.tc_submitted || false,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    console.log("Submit clicked");
    const data1 = {
      communication_address: {
        permanent_address: {
          country: values.permanent_country,
          state: values.permanent_state,
          district: values.permanent_district,
          postal_code: values.permanent_postal_code,
          post_office: values.permanent_post_office,
          police_station: values.permanent_police_station,
          village: values.permanent_village,
        },
        current_address: {
          country: values.country,
          state: values.state,
          district: values.district,
          postal_code: values.postal_code,
          post_office: values.post_office,
          police_station: values.police_station,
          village: values.village,
        },
      },
      parent_guardian_details: {
        father_information: {
          name: values.father_name,
          contact_no: values.father_contact,
          occupation: values.father_occupation,
          // whatsapp_no: values.father_whatsapp_no,
          // email: values.father_email,
          // annual_income: values.father_annual_income,
          // qualification: values.father_qualification,
        },
        mother_information: {
          name: values.mother_name,
          contact_no: values.mother_contact,
          occupation: values.mother_occupation,
          // whatsapp_no: values.mother_whatsapp_no,
          // email: values.mother_email,
          // annual_income: values.mother_annual_income,
          // qualification: values.mother_qualification,
        },
        guardian_information: {
          name: values.name,
          relationship: values.relationship,
          contact_no: values.contact_no,
          whatsapp_no: values.whatsapp_no,
          email: values.email,
          annual_income: values.annual_income,
          qualification: values.qualification,
          occupation: values.occupation,
        },
      },
      bank_details: {
        account_holder_name: values.account_holder_name,
        bank_name: values.bank_name,
        account_no: values.account_no,
        ifsc_code: values.ifsc_code,
      },
      other_details: {
        medical_details: {
          allergies: {
            details:
              typeof values.allergies === "object"
                ? values.allergies.details
                : values.allergies,
            status: values.allergies.details === "N/A" ? false : true,
          },
          special_medical_conditions: {
            details:
              typeof values.special_medical_conditions === "object"
                ? values.special_medical_conditions.details
                : values.special_medical_conditions,
            status:
              values.special_medical_conditions.details === "N/A"
                ? false
                : true,
          },
          special_assistance: {
            details:
              typeof values.special_assistance === "object"
                ? values.special_assistance.details
                : values.special_assistance,
            status: values.special_assistance.details === "N/A" ? false : true,
          },
          regular_medication: {
            details:
              typeof values.regular_medication === "object"
                ? values.regular_medication.details
                : values.regular_medication,
            status: values.regular_medication.details === "N/A" ? false : true,
          },
          blood_group: values.blood_group,
          height: values.height,
          weight: values.weight,
        },
        previous_institute_details: {
          institute_name: values.institute_name,
          tc_submitted: values.tc_submitted,
          previous_class: values.previous_class,
          board_affiliation: values.board_affiliation,
        },
      },
      student_details: {
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        date_of_birth: values.date_of_birth,
        birth_certificate_number: values.birth_certificate_number,
        gender: values.gender,
        student_photo: data.student_photo,
        religion: values.religion,
        caste: values.caste,
        caste_certificate_number: values.caste_certificate_number,
        hobbies: values.hobbies,
        aadhaar_number: values.aadhaar_number,
        pwd_certificate_number: values.pwd_certificate_number,
        birth_place: values.birth_place,
        mother_tongue: values.mother_tongue,
        language_spoken_at_home: values.language_spoken_at_home,
        class: values.class,
        academic_era: values.academic_era,
      },
      // application_status: data.application_status,
      // counselling_date: data.counselling_date,
      // counselling_status: data.counselling_status,
      // counselling_time: data.counselling_time,
      // payment_status: data.payment_status,
      // _id: data._id,
    };

    // Create FormData
    const formData = new FormData();

    // Append new image if a file is selected
    if (values.changed_image instanceof File) {
      formData.append("changed_image", values.changed_image); // New image file
    }

    const appendFormData = (formData: FormData, data: any, parentKey = "") => {
      Object.keys(data).forEach((key) => {
        const newKey = parentKey ? `${parentKey}[${key}]` : key;
        if (
          data[key] !== null &&
          typeof data[key] === "object" &&
          !Array.isArray(data[key])
        ) {
          appendFormData(formData, data[key], newKey);
        } else {
          formData.append(newKey, data[key]);
        }
      });
    };

    // Append data1 to formData
    appendFormData(formData, data1);

    console.log("Form data: ", formData);
    try {
      const response = await CreateNewStudent(formData, data._id);
      console.log(response);

      if (response.statusCode === 500 && !response.success) {
        // window.location.href = `/student/upload-documents/${data._id}`;
      }
    } catch (error) {
      console.log(error);
      // window.location.href = `/student/upload-documents/${data._id}`;
    }

    console.log("Form data: ", formData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full text-black">
          <div className="mb-8 grid grid-cols-2">
            <h1 className="text-2xl font-semibold mb-16 text-gray-600 uppercase">
              Showing All Details of {data.first_name} {data?.middle_name || ""}{" "}
              {data.last_name}
            </h1>

            <div className="justify-self-end">
              <div className="flex gap-5">
                {previewImage && (
                  <div className="flex gap-5 order-2">
                    <span className="self-center justify-self-center text-xl shrink-0">
                      <IoArrowRedoOutline />
                    </span>

                    <div>
                      <p className=" text-center py-4 w-[1.7in] border-2 rounded-[2px] text-xs mb-1">
                        New Photo
                      </p>
                      <Image
                        src={previewImage || ""}
                        width={500}
                        height={500}
                        alt="Student Photo"
                        className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030] justify-self-end"></Image>
                    </div>
                  </div>
                )}

                <div className="order-1">
                  <Image
                    src={data?.student_photo}
                    width={500}
                    height={500}
                    alt="Student Photo"
                    className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030]"></Image>
                  <FormField
                    control={form.control}
                    name="changed_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl className="w-full justify-self-end border-2 border-[#303030]">
                          <div className="flex justify-center items-center py-4 w-[1.7in] bg-green-700 text-white border-none rounded-[2px] overflow-hidden shadow-md transition-all duration-250 relative text-xs">
                            <MdOutlinePhotoSizeSelectActual className="w-4 h-4 mr-2" />
                            Change Photo
                            <Input
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              name="text"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  field.onChange(e.target.files[0]);
                                  // Update the preview image
                                  const file = e.target.files[0];
                                  const previewUrl = URL.createObjectURL(file);
                                  setPreviewImage(previewUrl); // Set the preview URL
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10">
            <div className="p-9 border-2 relative bg-[#fff]">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Student Details
              </h2>

              {/* Field to upload new student photo */}

              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        First Name<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="First name"
                          {...field}
                          disabled={!isEditable}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Middle Name :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Middle name"
                          {...field}
                          disabled={!isEditable}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Last Name<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Last name"
                          {...field}
                          disabled={!isEditable}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Gender<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "px-[10px] text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 py-[10px] bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ""} // Controlled approach
                          onChange={field.onChange} // Ensure that the onChange handler is connected
                        >
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Date of Birth{" "}
                        <span className="text-[12.8px]">(MM/DD/YYYY)</span>
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <div className="border-2 py-[1px]">
                          <Input
                            type="date"
                            disabled={!isEditable}
                            {...field}
                            value={dateOfBirth || ""}
                            onChange={(e) => {
                              const selectedDate = e.target.value; // Get selected date
                              setDateOfBirth(selectedDate); // Update state with the new date
                              form.setValue("date_of_birth", selectedDate); // Update react-hook-form value
                            }}
                            className="w-full border-none outline-none"
                          />
                        </div>
                      </FormControl>
                      {age !== null && (
                        <div className="mt-2 text-[12px] text-gray-600 rounded-sm bg-yellow-400 max-w-fit py-0.5 px-1.5">
                          Age: {age} years
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birth_certificate_number"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Birth Certificate Number
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Birth Certificate Number"
                          disabled={!isEditable}
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
                  name="birth_place"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Birth Place<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Birth Place"
                          disabled={!isEditable}
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
                  name="mother_tongue"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Mother Tongue<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ""} // Controlled approach
                          onChange={field.onChange} // Ensure that the onChange handler is connected
                        >
                          <option value="" disabled>
                            Select Mother Tongue
                          </option>
                          <option value="Bengali">Bengali</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Others">Others</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language_spoken_at_home"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Language Spoken at Home
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ""} // Controlled approach
                          onChange={field.onChange} // Ensure that the onChange handler is connected
                        >
                          <option value="" disabled>
                            Select Language Spoken at Home
                          </option>
                          <option value="Bengali">Bengali</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Others">Others</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Religion<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Religion"
                          disabled={!isEditable}
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
                  name="aadhaar_number"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Aadhaar Number :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="aadhaar_number"
                          disabled={!isEditable}
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
                  name="caste"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Caste<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ""} // Controlled approach
                          onChange={field.onChange} // Ensure that the onChange handler is connected
                        >
                          <option value="" disabled>
                            Select Caste
                          </option>
                          <option value="General">General</option>
                          <option value="OBC-A">OBC-A</option>
                          <option value="OBC-B">OBC-B</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caste_certificate_number"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        caste Certificate Number :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Caste Certificate Number"
                          disabled={!isEditable}
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
                  name="pwd_certificate_number"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        PWD Certificate Number :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="PWD Certificate Number"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                control={form.control}
                name="blood_group"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Blood Group<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "px-[10px] text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <select
                        {...field}
                        className="w-full bg-transparent focus:outline-none border-2 py-[10px] bg-[#fff]"
                        disabled={!isEditable}
                        value={field.value || ""} // Controlled approach
                        onChange={field.onChange} // Ensure that the onChange handler is connected
                      >
                        <option value="" disabled>
                          Select blood group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                {/* <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Height (cm)<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Height"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                {/* <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Weight (kg)<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Weight"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Hobbies :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Hobbies"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="talent"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Talent<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Talent"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-x-3 gap-y-5 md:gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Admission Information
              </h2>
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn("text-gray-500 font-semibold mb-0.5")}>
                      Class (want to join)
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Class"
                        disabled={!isEditable}
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
                name="academic_era"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn("text-gray-500 font-semibold mb-0.5")}>
                      Academic Era<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Academic Era"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div className="lg:grid grid-cols-3 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Father Details
                </h2>
                <FormField
                  control={form.control}
                  name="father_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn("text-gray-500 font-semibold mb-0.5")}>
                        Father&apos;s Name
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Father's name"
                          disabled={!isEditable}
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
                  name="father_occupation"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn("text-gray-500 font-semibold mb-0.5")}>
                        Father&apos;s Occupation
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Father's occupation"
                          disabled={!isEditable}
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
                  name="father_contact"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn("text-gray-500 font-semibold mb-0.5")}>
                        Father&apos;s Contact
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Father's contact number"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="lg:grid grid-cols-3 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Mother Details
                </h2>
                <FormField
                  control={form.control}
                  name="mother_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Mother&apos;s Name
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Mother's name"
                          disabled={!isEditable}
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
                  name="mother_occupation"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Mother&apos;s Occupation
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Mother's occupation"
                          disabled={!isEditable}
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
                  name="mother_contact"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Mother&apos;s Contact
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Mother's contact number"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Guardian Details
              </h2>
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian Relationship
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Relationship to guardian"
                        disabled={!isEditable}
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
                name="name"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian&apos;s Name
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Guardian's name"
                        disabled={!isEditable}
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
                name="occupation"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian&apos;s Occupation
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Guardian's occupation"
                        disabled={!isEditable}
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
                name="contact_no"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian&apos;s Contact Number
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Guardian's contact number"
                        disabled={!isEditable}
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
                name="whatsapp_no"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian&apos;s WhatsApp Number
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Guardian's WhatsApp number"
                        disabled={!isEditable}
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
                name="email"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Email<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        type="email"
                        placeholder="Guardian's email"
                        disabled={!isEditable}
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
                name="qualification"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Guardian&apos;s Qualification
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Guardian's qualification"
                        disabled={!isEditable}
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
                name="annual_income"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Annual Income<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Annual income"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Current Address Details
                </h2>
                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Village<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Village"
                          disabled={!isEditable}
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
                  name="post_office"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Post Office<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Post Office"
                          disabled={!isEditable}
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
                  name="police_station"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Police Station<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Police Station"
                          disabled={!isEditable}
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
                  name="district"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        District<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="District"
                          disabled={!isEditable}
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
                  name="state"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        State<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="State"
                          disabled={!isEditable}
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
                  name="country"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Country
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Country"
                          disabled={!isEditable}
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
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Postal Code<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Postal Code"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Permanent Address Details
                </h2>
                <FormField
                  control={form.control}
                  name="permanent_village"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Village<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent Village"
                          disabled={!isEditable}
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
                  name="permanent_post_office"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Post Office<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent Post Office"
                          disabled={!isEditable}
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
                  name="permanent_police_station"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Police Station<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent Police Station"
                          disabled={!isEditable}
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
                  name="permanent_district"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        District<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent District"
                          disabled={!isEditable}
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
                  name="permanent_state"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        State<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent State"
                          disabled={!isEditable}
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
                  name="permanent_country"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Country<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent Country"
                          disabled={!isEditable}
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
                  name="permanent_postal_code"
                  render={({ field }) => (
                    <FormItem
                      className={cn("flex flex-col w-full text-[13px]")}>
                      <FormLabel
                        className={cn(
                          "text-gray-500 font-semibold w-fit mb-0.5"
                        )}>
                        Postal Code<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                        )}>
                        <Input
                          placeholder="Permanent Postal Code"
                          disabled={!isEditable}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Previous Institute Details
              </h2>
              <FormField
                control={form.control}
                name="institute_name"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Institute Name<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Institute Name"
                        disabled={!isEditable}
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
                name="board_affiliation"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Board Affiliation<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Board Affiliation"
                        disabled={!isEditable}
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
                name="previous_class"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Previous Class<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Previous Class"
                        disabled={!isEditable}
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
                name="tc_submitted"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      TC Submitted<span className="text-red-500">*</span> :
                    </FormLabel>
                    <div className="flex items-center justify-evenly h-full">
                      <label className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          {...field}
                          disabled={!isEditable}
                          value="true"
                          checked={field.value === true} // Controlled checkbox
                          onChange={() => field.onChange(true)} // Set to true when checked
                          className="mr-2"
                        />
                        TC Submitted
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          {...field}
                          disabled={!isEditable}
                          value="false"
                          checked={field.value === false} // Controlled checkbox
                          onChange={() => field.onChange(false)} // Set to false when checked
                          className="mr-2"
                        />
                        TC Not Submitted
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Medical Details
              </h2>
              <FormField
                control={form.control}
                name="allergies.details"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Allergy Details<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Allergy Details"
                        disabled={!isEditable}
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
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Special Medical Condition
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Special Medical Condition Details"
                        disabled={!isEditable}
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
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Regular Medication Details
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Regular Medication Details"
                        disabled={!isEditable}
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
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Special Assistance Details
                      <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Special Assistance Details"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:grid grid-cols-4 lg:gap-x-3 gap-y-10 bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Bank Details
              </h2>
              <FormField
                control={form.control}
                name="account_holder_name"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Account Holder Name<span className="text-red-500">*</span>{" "}
                      :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Account Holder Name"
                        disabled={!isEditable}
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
                name="bank_name"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Bank Name<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Bank Name"
                        disabled={!isEditable}
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
                name="account_no"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      Account Number<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="Account Number"
                        disabled={!isEditable}
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
                name="ifsc_code"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col w-full text-[13px]")}>
                    <FormLabel
                      className={cn(
                        "text-gray-500 font-semibold w-fit mb-0.5"
                      )}>
                      IFSC Code<span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl
                      className={cn(
                        "border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll"
                      )}>
                      <Input
                        placeholder="IFSC Code"
                        disabled={!isEditable}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 grid justify-end">
              <div className="flex items-center">
                <Button
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                  className={`w-36 h-12 mr-4 rounded ${
                    isEditable
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}>
                  {isEditable ? "Cancel Edit" : "Edit"}
                </Button>
                {isEditable && (
                  <Button
                    onClick={() => setIsEditable(!isEditable)}
                    className="min-w-fit px-6 bg-[#228B22] hover:bg-[#186e18] w-36 h-12">
                    Apply Changes
                  </Button>
                )}
                {!isEditable && (
                  <Button type="submit" className={cn("w-36 h-12")}>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditStudentForm;
