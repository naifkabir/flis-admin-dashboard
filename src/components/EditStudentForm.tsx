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
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { submitAfterEditApplication } from '@/lib/actions/student.action';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { Country, IState, State } from 'country-state-city';
import { districtsData } from '@/data/districtsData';
import { Toaster, toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type DistrictKey = keyof typeof districtsData;

const studentApproveFormScheam = z
  .object({
    first_name: z.string().min(1, {
      message: 'Required first name',
    }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, {
      message: 'Required last name',
    }),
    gender: z.string().min(1, {
      message: 'Required gender',
    }),
    date_of_birth: z.string().min(1, {
      message: 'Required date of birth',
    }),
    birth_certificate_number: z.string().min(1, {
      message: 'Required birth certificate number',
    }),
    birth_place: z.string().min(1, {
      message: 'Required birth place',
    }),
    mother_tongue: z.string().min(1, {
      message: 'Required mother tongue',
    }),
    language_spoken_at_home: z.string().min(1, {
      message: 'Required language spoken at home',
    }),
    religion: z.string().min(1, {
      message: 'Required religion',
    }),
    aadhaar_number: z.string().optional(),
    caste: z.string().min(1, { message: 'Caste is required' }),
    caste_certificate_number: z.string().optional(),
    hobbies: z.string().optional(),

    blood_group: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),

    father_name: z.string().min(1, {
      message: 'Required father name',
    }),
    father_occupation: z.string().min(1, {
      message: 'Required father occupation',
    }),
    father_contact: z.string().min(1, {
      message: 'Required father contact',
    }),

    father_whatsapp_no: z.string().optional(),
    mother_whatsapp_no: z.string().optional(),

    father_email: z.string().optional(),
    mother_email: z.string().optional(),

    father_qualification: z.string().min(1, {
      message: 'Required father qualification',
    }),
    // father_annual_income: z.string().min(1, {
    //   message: "Required father annual income",
    // }),

    father_annual_income: z
      .string()
      .min(1, { message: 'Father annual income is required' })
      .regex(/^\d+$/, { message: 'Father annual income must be a number' }) // Ensure it's a number
      .transform((val) => Number(val)), // Transform to a number

    mother_qualification: z.string().min(1, {
      message: 'Required mother qualification',
    }),
    // mother_annual_income: z.string().min(1, {
    //   message: "Required mother annual income",
    // }),

    mother_annual_income: z
      .string()
      .min(1, { message: 'Mother annual income is required' })
      .regex(/^\d+$/, { message: 'Mother annual income must be a number' }) // Ensure it's a number
      .transform((val) => Number(val)), // Transform to a number

    mother_name: z.string().min(1, {
      message: 'Required mother name',
    }),
    mother_occupation: z.string().min(1, {
      message: 'Required mother occupation',
    }),
    mother_contact: z.string().min(1, {
      message: 'Required mother contact',
    }),

    guardian_name: z.string().min(1, { message: 'Required guardian name' }),
    guardian_relationship: z
      .string()
      .min(1, { message: 'Required relationship' }),
    guardian_occupation: z.string().min(1, { message: 'Required occupation' }),
    guardian_contact_no: z
      .string()
      .min(1, { message: 'Required contact number' }),
    guardian_whatsapp_no: z
      .string()
      .min(1, { message: 'Required WhatsApp number' }),
    guardian_email: z
      .string()
      .email({ message: 'Invalid e-mail' })
      .min(1, { message: 'Required email' }),
    guardian_qualification: z
      .string()
      .min(1, { message: 'Required qualification' }),
    // guardian_annual_income: z
    //   .string()
    //   .min(1, { message: "Required annual income" }),

    guardian_annual_income: z
      .string()
      .min(1, { message: 'Guardian annual income is required' })
      .regex(/^\d+$/, { message: 'Guardian annual income must be a number' }) // Ensure it's a number
      .transform((val) => Number(val)), // Transform to a number

    village: z.string().min(1, { message: 'Required village' }),
    post_office: z.string().min(1, { message: 'Required post office' }),
    police_station: z.string().min(1, { message: 'Required police station' }),
    district: z.string().min(1, { message: 'Required district' }),
    state: z.string().min(1, { message: 'Required state' }),
    country: z.string().min(1, { message: 'Required country' }),
    postal_code: z.string().min(1, { message: 'Required postal code' }),
    permanent_village: z.string().min(1, { message: 'Required village' }),
    permanent_post_office: z
      .string()
      .min(1, { message: 'Required post office' }),
    permanent_police_station: z
      .string()
      .min(1, { message: 'Required police station' }),
    permanent_district: z.string().min(1, { message: 'Required district' }),
    permanent_state: z.string().min(1, { message: 'Required state' }),
    permanent_country: z.string().min(1, { message: 'Required country' }),
    permanent_postal_code: z
      .string()
      .min(1, { message: 'Required postal code' }),

    institute_name: z.string().optional(),
    board_affiliation: z.string().optional(),
    previous_section: z.string().optional(),
    previous_roll_no: z.string().optional(),
    previous_portal_id: z.string().optional(),
    previous_class: z.string().optional(),
    previous_from_date: z.string().optional(),
    previous_to_date: z.string().optional(),
    tc_submitted: z.boolean().optional(),
    reason_for_leaving: z.string().optional(),

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

    account_holder_name: z.string().optional(),
    bank_name: z.string().optional(),
    account_no: z.string().optional(),
    ifsc_code: z.string().optional(),
    changed_image: z.instanceof(File).optional(),

    is_specially_abled: z.enum(['true', 'No']).optional(),
    pwd_certificate_number: z.string().optional(),

    // Assign Class, Section, Fees Group, Academic Era
    class_info: z.string().min(1, {
      message: 'Required class',
    }),
    section_info: z.string().min(1, {
      message: 'Required section',
    }),
    fees_info: z.string().min(1, {
      message: 'Required fees group',
    }),
    academic_era: z.string().min(1, {
      message: 'Required academic era',
    }),
  })
  .refine(
    (data) => {
      // Conditionally validate caste_certificate_number based on caste
      if (data.caste !== 'General' && !data.caste_certificate_number) {
        return false; // Invalid if `caste_certificate_number` is missing for non-General caste
      }
      return true;
    },
    {
      message: 'Caste Certificate Number is required for non-General caste.',
      path: ['caste_certificate_number'], // Error will appear under this field
    }
  )
  .refine(
    (data) => {
      // If the student is specially abled, the PWD Certificate Number required
      if (data.is_specially_abled === 'true' && !data.pwd_certificate_number) {
        return false;
      }
      return true;
    },
    {
      message:
        'PWD Certificate Number is required for specially abled students.',
      path: ['pwd_certificate_number'],
    }
  );

type FormValues = z.infer<typeof studentApproveFormScheam>;

const EditStudentForm = ({
  data,
  allClasses,
  allGroups,
  session,
}: {
  data: any;
  allClasses: any;
  allGroups: any;
  session: any;
}) => {
  const [age, setAge] = useState<number | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [classOptions, setClassOptions] = useState<[]>([]);

  const [sectionOptions, setSectionOptions] = useState<[]>([]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentStatesList, setCurrentStatesList] = useState<IState[]>([]);
  const [currentDistrictsList, setCurrentDistrictsList] = useState<string[]>(
    []
  );
  const [permanentStatesList, setPermanentStatesList] = useState<IState[]>([]);
  const [permanentDistrictsList, setPermanentDistrictsList] = useState<
    string[]
  >([]);

  const { setValue, getValues } = useForm({
    resolver: zodResolver(studentApproveFormScheam),
  });

  // Set initial date of birth if it exists in data
  useEffect(() => {
    if (data?.date_of_birth) {
      const normalizedDate = new Date(data.date_of_birth);
      const formattedDate = `${normalizedDate.getFullYear()}-${(
        normalizedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${normalizedDate
        .getDate()
        .toString()
        .padStart(2, '0')}`;
      setDateOfBirth(formattedDate); // Set initial state
    }
  }, [data.date_of_birth]);

  // Calculate age based on the date of birth
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let calculatedAge = 0;

      const currMarch31 = new Date(today.getFullYear(), 2, 31); // 31st March this year
      const nextMarch31 = new Date(today.getFullYear() + 1, 2, 31); // 31st March next year

      if (today > currMarch31) {
        // If today is after 31st March this year, subtract a year
        calculatedAge = nextMarch31.getFullYear() - birthDate.getFullYear();
      } else {
        calculatedAge = currMarch31.getFullYear() - birthDate.getFullYear();
      }

      setAge(calculatedAge);
    } else {
      setAge(null); // Reset age if no date of birth
    }
  }, [dateOfBirth]);

  useEffect(() => {
    if (age !== null) {
      const eligibleClasses = allClasses
        .filter((cls: any) => age >= cls.minAge && age <= cls.maxAge)
        .map((cls: any) => ({ _id: cls._id, name: cls.name }));

      // Add custom age group classes for younger ages not in allClasses
      if (age >= 2 && age < 4) {
        eligibleClasses.unshift('Giggles (Playgroup)');
      }
      if (age >= 3 && age < 6) {
        eligibleClasses.unshift('Sprouts (Nursery)');
      }

      setClassOptions(eligibleClasses);
    }
  }, [age, allClasses]);

  const form = useForm<FormValues>({
    resolver: zodResolver(studentApproveFormScheam),
    defaultValues: {
      ...data,
      student_photo: data.student_photo,

      // Current Address Details
      country: data.current_address.country,
      state: data.current_address.state,
      district: data.current_address.district,
      postal_code: data.current_address.postal_code,
      post_office: data.current_address.post_office,
      police_station: data.current_address.police_station,
      village: data.current_address.village,

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
      mother_name: data.mother_information.name,
      mother_annual_income: data.mother_information.annual_income,
      mother_qualification: data.mother_information.qualification,
      mother_email: data.mother_information.email,
      mother_occupation: data.mother_information.occupation,
      mother_contact: data.mother_information.contact_no,
      mother_whatsapp_no: data.mother_information.whatsapp_no,

      // Guardian Details
      guardian_name: data.guardian_information.name,
      guardian_relationship: data.guardian_information.relationship,
      guardian_annual_income: data.guardian_information.annual_income,
      guardian_qualification: data.guardian_information.qualification,
      guardian_email: data.guardian_information.email,
      guardian_occupation: data.guardian_information.occupation,
      guardian_contact_no: data.guardian_information.contact_no,
      guardian_whatsapp_no: data.guardian_information.whatsapp_no,

      date_of_birth: data.date_of_birth,

      is_specially_abled: data.is_specially_abled,
    },
  });

  const watchCurrentCountry = form.watch('country');
  const watchCurrentState = form.watch('state');
  const watchPermanentCountry = form.watch('permanent_country');
  const watchPermanentState = form.watch('permanent_state');

  useEffect(() => {
    if (watchCurrentCountry) {
      const states = State.getStatesOfCountry(watchCurrentCountry) || [];
      setCurrentStatesList(states);
      setValue('state', '');
    }
  }, [watchCurrentCountry, setValue]);

  useEffect(() => {
    if (watchCurrentCountry === 'IN') {
      const districts = districtsData[watchCurrentState as DistrictKey] || [];
      setCurrentDistrictsList(districts);
      setValue('district', '');
    } else {
      setCurrentDistrictsList([]);
      setValue('district', '');
    }
  }, [watchCurrentState, watchCurrentCountry, setValue]);

  useEffect(() => {
    if (watchPermanentCountry) {
      const states = State.getStatesOfCountry(watchPermanentCountry) || [];
      setPermanentStatesList(states);
      setValue('state', '');
    }
  }, [watchPermanentCountry, setValue]);

  useEffect(() => {
    if (watchPermanentCountry === 'IN') {
      const districts = districtsData[watchPermanentState as DistrictKey] || [];
      setPermanentDistrictsList(districts);
      setValue('district', '');
    } else {
      setPermanentDistrictsList([]);
      setValue('district', '');
    }
  }, [watchPermanentState, watchPermanentCountry, setValue]);

  const watchClass = form.watch('class_info');

  useEffect(() => {
    if (watchClass) {
      console.log('watchClass: ', watchClass);
      const sectionOptions = allClasses.find(
        (item: any) => item._id === watchClass
      )?.sections;
      setSectionOptions(sectionOptions);
      setValue('section_info', '');
    }
  }, [watchClass, allClasses, setValue, getValues]);

  const handleSubmit = async (values: FormValues) => {
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
          whatsapp_no: values.father_whatsapp_no,
          email: values.father_email,
          annual_income: values.father_annual_income,
          qualification: values.father_qualification,
        },
        mother_information: {
          name: values.mother_name,
          contact_no: values.mother_contact,
          occupation: values.mother_occupation,
          whatsapp_no: values.mother_whatsapp_no,
          email: values.mother_email,
          annual_income: values.mother_annual_income,
          qualification: values.mother_qualification,
        },
        guardian_information: {
          name: values.guardian_name,
          relationship: values.guardian_relationship,
          contact_no: values.guardian_contact_no,
          whatsapp_no: values.guardian_whatsapp_no,
          email: values.guardian_email,
          annual_income: values.guardian_annual_income,
          qualification: values.guardian_qualification,
          occupation: values.guardian_occupation,
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
              typeof values.allergies === 'object'
                ? values.allergies.details
                : values.allergies,
            status: values.allergies.details === 'N/A' ? false : true,
          },
          special_medical_conditions: {
            details:
              typeof values.special_medical_conditions === 'object'
                ? values.special_medical_conditions.details
                : values.special_medical_conditions,
            status:
              values.special_medical_conditions.details === 'N/A'
                ? false
                : true,
          },
          special_assistance: {
            details:
              typeof values.special_assistance === 'object'
                ? values.special_assistance.details
                : values.special_assistance,
            status: values.special_assistance.details === 'N/A' ? false : true,
          },
          regular_medication: {
            details:
              typeof values.regular_medication === 'object'
                ? values.regular_medication.details
                : values.regular_medication,
            status: values.regular_medication.details === 'N/A' ? false : true,
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
          previous_section: values.previous_section,
          previous_roll_no: values.previous_roll_no,
          reason_for_leaving: values.reason_for_leaving,
          previous_postal_id: values.previous_portal_id,
          previous_from_date: values.previous_from_date,
          previous_to_date: values.previous_to_date,
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
        is_specially_abled: values.is_specially_abled,
        pwd_certificate_number: values.pwd_certificate_number,
        birth_place: values.birth_place,
        mother_tongue: values.mother_tongue,
        language_spoken_at_home: values.language_spoken_at_home,
        class_info: values.class_info,
        academic_era: values.academic_era,
      },
      class_info: values.class_info,
      section_info: values.section_info,
      session_info: values.academic_era,
      fees_info: values.fees_info,
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
      formData.append('changed_image', values.changed_image); // New image file
    }

    const appendFormData = (formData: FormData, data: any, parentKey = '') => {
      Object.keys(data).forEach((key) => {
        const newKey = parentKey ? `${parentKey}[${key}]` : key;
        if (
          data[key] !== null &&
          typeof data[key] === 'object' &&
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

    console.log('Form data: ', data1);
    // console.log('Id', data._id);
    // try {
    //   const response = await submitAfterEditApplication(formData, data._id);
    //   console.log(response);

    //   if (response.statusCode === 200) {
    //     // console.log("Successful");
    //     // console.log(response.data);
    //     const studentId = response.data;
    //     window.location.href = `/student/upload-documents/${studentId}`;
    //   }
    // } catch (error) {
    //   toast.error('Something went wrong. Please try again.');
    // }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full text-black"
        >
          <div className="mb-8 grid grid-cols-2">
            <h1 className="text-2xl font-semibold mb-16 text-gray-600 uppercase">
              Showing All Details of {data.first_name} {data?.middle_name || ''}{' '}
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
                        src={previewImage || ''}
                        width={500}
                        height={500}
                        alt="Student Photo"
                        className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030] justify-self-end"
                      ></Image>
                    </div>
                  </div>
                )}

                <div className="order-1">
                  <Image
                    src={data?.student_photo}
                    width={500}
                    height={500}
                    alt="Student Photo"
                    className="w-[1.7in] h-[2in] object-cover object-center border-2 border-[#303030]"
                  ></Image>
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        First Name<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Middle Name :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Last Name<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Gender<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'px-[10px] text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 py-[10px] bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ''} // Controlled approach
                          onChange={field.onChange}
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Date of Birth{' '}
                        <span className="text-[12.8px]">(MM/DD/YYYY)</span>
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <div className="border-2 py-[1px]">
                          <Input
                            type="date"
                            disabled={!isEditable}
                            {...field}
                            value={dateOfBirth || ''}
                            onChange={(e) => {
                              const selectedDate = e.target.value; // Get selected date
                              setDateOfBirth(selectedDate); // Update state with the new date
                              form.setValue('date_of_birth', selectedDate); // Update react-hook-form value
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Birth Certificate Number
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Birth Place<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Mother Tongue<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ''} // Controlled approach
                          onChange={field.onChange}
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Language Spoken at Home
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ''} // Controlled approach
                          onChange={field.onChange}
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Religion<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ''} // Controlled approach
                          onChange={field.onChange}
                        >
                          <option value="" disabled selected>
                            Select Religion
                          </option>
                          <option value="Hinduism">Hinduism</option>
                          <option value="Islam">Islam</option>
                          <option value="Christianity">Christianity</option>
                          <option value="Sikhism">Sikhism</option>
                          <option value="Jain">Jain</option>
                          <option value="Buddhism">Buddhism</option>
                          <option value="Judaism">Judaism</option>
                          <option value="Other">Other</option>
                        </select>
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Aadhaar Number :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Caste<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[6px] text-gray-700 py-[10px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <select
                          {...field}
                          className="w-full bg-transparent focus:outline-none border-2 bg-[#fff]"
                          disabled={!isEditable}
                          value={field.value || ''} // Controlled approach
                          onChange={field.onChange}
                        >
                          <option value="" disabled selected>
                            Select Caste
                          </option>
                          <option value="General">General</option>
                          <option value="OBC-A">OBC-A</option>
                          <option value="OBC-B">OBC-B</option>
                          <option value="Scheduled Caste (SC)">
                            Scheduled Caste (SC)
                          </option>
                          <option value="Scheduled Tribe (ST)">
                            Scheduled Tribe (ST)
                          </option>
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
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        caste Certificate Number :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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

                <div>
                  <div className="mb-0.5">
                    <FormField
                      control={form.control}
                      name="is_specially_abled"
                      render={({ field }) => {
                        const isChecked = field.value === 'true';

                        return (
                          <FormItem className={cn('flex items-center gap-2')}>
                            <label
                              htmlFor="is_specially_abled"
                              className="text-gray-500 font-semibold text-[13px]"
                            >
                              Is Specially Abled?
                            </label>
                            <input
                              type="checkbox"
                              id="is_specially_abled"
                              {...field}
                              disabled={!isEditable}
                              className="mr-2 -translate-y-[4px]"
                              checked={isChecked}
                              onChange={(e) => {
                                field.onChange(
                                  e.target.checked ? 'true' : 'No'
                                );
                              }}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pwd_certificate_number"
                    render={({ field }) => {
                      const isSpeciallyAbled =
                        form.watch('is_specially_abled') === 'true';

                      return (
                        <FormItem
                          className={cn('flex flex-col w-full text-[13px]')}
                        >
                          <FormControl
                            className={cn(
                              'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                            )}
                          >
                            <Input
                              placeholder="PWD Certificate Number"
                              disabled={!isSpeciallyAbled || !isEditable}
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Hobbies :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div className="bg-[#fff] p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Father Details
                </h2>

                {/* Father Details */}
                <div className="pt-16 grid lg:grid-cols-3 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                  <FormField
                    control={form.control}
                    name="father_name"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Name
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Occupation
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          disabled={!isEditable}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Unemployed">
                              Unemployed
                            </SelectItem>
                            <SelectItem value="Self Employed">
                              Self Employed
                            </SelectItem>
                            <SelectItem value="Small Business">
                              Small Business
                            </SelectItem>
                            <SelectItem value="Large Business">
                              Large Business
                            </SelectItem>
                            <SelectItem value="Government Job">
                              Government Job
                            </SelectItem>
                            <SelectItem value="Private Job">
                              Private Job
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="father_contact"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Contact
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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

                  <FormField
                    control={form.control}
                    name="father_annual_income"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Annual Income
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Father's Annual Income"
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
                    name="father_qualification"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Qualification
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          disabled={!isEditable}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Letterless">
                              Letterless
                            </SelectItem>
                            <SelectItem value="Primary">Primary</SelectItem>
                            <SelectItem value="Upper Primary">
                              Upper Primary
                            </SelectItem>
                            <SelectItem value="Secondary">Secondary</SelectItem>
                            <SelectItem value="Higher Secondary">
                              Higher Secondary
                            </SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="father_email"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Email :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Father's Email"
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
                    name="father_whatsapp_no"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn('text-gray-500 font-semibold mb-0.5')}
                        >
                          Father&apos;s Whatsapp Number :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Father's Whatsapp Number"
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

              <div className="bg-[#fff] p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Mother Details
                </h2>

                {/* Mother Details */}
                <div className="pt-16 grid lg:grid-cols-3 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                  <FormField
                    control={form.control}
                    name="mother_name"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Name
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Occupation
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          disabled={!isEditable}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="House Wife">
                              House Wife
                            </SelectItem>
                            <SelectItem value="Self Employed">
                              Self Employed
                            </SelectItem>
                            <SelectItem value="Small Business">
                              Small Business
                            </SelectItem>
                            <SelectItem value="Large Business">
                              Large Business
                            </SelectItem>
                            <SelectItem value="Government Job">
                              Government Job
                            </SelectItem>
                            <SelectItem value="Private Job">
                              Private Job
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mother_contact"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Contact
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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

                  <FormField
                    control={form.control}
                    name="mother_annual_income"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Annual Income
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Mother's Annual Income"
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
                    name="mother_qualification"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Qualification
                          <span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          disabled={!isEditable}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Letterless">
                              Letterless
                            </SelectItem>
                            <SelectItem value="Primary">Primary</SelectItem>
                            <SelectItem value="Upper Primary">
                              Upper Primary
                            </SelectItem>
                            <SelectItem value="Secondary">Secondary</SelectItem>
                            <SelectItem value="Higher Secondary">
                              Higher Secondary
                            </SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mother_email"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Email :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Mother's Email"
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
                    name="mother_whatsapp_no"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Mother&apos;s Whatsapp Number :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
                          <Input
                            placeholder="Mother's Whatsapp Number"
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
            </div>

            <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Guardian Details
              </h2>

              {/* Guardian Details */}
              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="guardian_relationship"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian Relationship
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                  name="guardian_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian&apos;s Name
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                  name="guardian_occupation"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian&apos;s Occupation
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select
                        disabled={!isEditable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Occupation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="House Wife">House Wife</SelectItem>
                          <SelectItem value="Unemployed">Unemployed</SelectItem>
                          <SelectItem value="Self Employed">
                            Self Employed
                          </SelectItem>
                          <SelectItem value="Small Business">
                            Small Business
                          </SelectItem>
                          <SelectItem value="Large Business">
                            Large Business
                          </SelectItem>
                          <SelectItem value="Government Job">
                            Government Job
                          </SelectItem>
                          <SelectItem value="Private Job">
                            Private Job
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardian_contact_no"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian&apos;s Contact Number
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                  name="guardian_whatsapp_no"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian&apos;s WhatsApp Number
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                  name="guardian_email"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Email<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                  name="guardian_qualification"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Guardian&apos;s Qualification
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select
                        disabled={!isEditable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Occupation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Letterless">Letterless</SelectItem>
                          <SelectItem value="Primary">Primary</SelectItem>
                          <SelectItem value="Upper Primary">
                            Upper Primary
                          </SelectItem>
                          <SelectItem value="Secondary">Secondary</SelectItem>
                          <SelectItem value="Higher Secondary">
                            Higher Secondary
                          </SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardian_annual_income"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Annual Income<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Current Address Details
                </h2>

                {/* Current Address Details */}
                <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Village<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Post Office<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Police Station<span className="text-red-500">*</span>{' '}
                          :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          District<span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isEditable || !currentDistrictsList.length}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentDistrictsList.map((district, index) => (
                              <SelectItem key={index} value={district}>
                                {district}
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
                    name="state"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          State<span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isEditable || !currentStatesList.length}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentStatesList.map((state) => (
                              <SelectItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {state.name}
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
                    name="country"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Country
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isEditable}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Country.getAllCountries().map((country) => (
                              <SelectItem
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
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
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Postal Code<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
              </div>

              <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
                <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                  Permanent Address Details
                </h2>

                {/* Permanent Address Details */}
                <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                  <FormField
                    control={form.control}
                    name="permanent_village"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Village<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Post Office<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Police Station<span className="text-red-500">*</span>{' '}
                          :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          District<span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            !isEditable || !permanentDistrictsList.length
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {permanentDistrictsList.map((district, index) => (
                              <SelectItem key={index} value={district}>
                                {district}
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
                    name="permanent_state"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          State<span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isEditable || !permanentStatesList.length}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {permanentStatesList.map((state) => (
                              <SelectItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {state.name}
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
                    name="permanent_country"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Country<span className="text-red-500">*</span> :
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isEditable}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Country.getAllCountries().map((country) => (
                              <SelectItem
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
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
                    name="permanent_postal_code"
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col w-full text-[13px]')}
                      >
                        <FormLabel
                          className={cn(
                            'text-gray-500 font-semibold w-fit mb-0.5'
                          )}
                        >
                          Postal Code<span className="text-red-500">*</span> :
                        </FormLabel>
                        <FormControl
                          className={cn(
                            'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                          )}
                        >
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
            </div>

            <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Previous Institute Details
              </h2>

              {/* Previous Institute Details */}
              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="institute_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Institute Name :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Board Affiliation :
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!isEditable}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Board" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="CBSE">
                            Central Board of Secondary Education (CBSE)
                          </SelectItem>
                          <SelectItem value="ICSE">
                            Indian Certificate of Secondary Education (ICSE)
                          </SelectItem>
                          <SelectItem value="State Board of Education (West Bengal) Bengali Medium">
                            State Board of Education (West Bengal) Bengali
                            Medium
                          </SelectItem>
                          <SelectItem value="State Board of Education (West Bengal) English Medium">
                            State Board of Education (West Bengal) English
                            Medium
                          </SelectItem>
                          <SelectItem value="State Board of Education (others) English Medium">
                            State Board of Education (others) English Medium
                          </SelectItem>
                          <SelectItem value="State Board of Education (others) Religion Language Medium">
                            State Board of Education (others) Religion Language
                            Medium
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previous_class"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous Class :
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!isEditable}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Board" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="Playgroup">Playgroup</SelectItem>
                          <SelectItem value="Lower Kindergarten">
                            Lower Kindergarten
                          </SelectItem>
                          <SelectItem value="Upper Kindergarten">
                            Upper Kindergarten
                          </SelectItem>
                          <SelectItem value="Class One">Class One</SelectItem>
                          <SelectItem value="Class Two">Class Two</SelectItem>
                          <SelectItem value="Class Three">
                            Class Three
                          </SelectItem>
                          <SelectItem value="Class Four">Class Four</SelectItem>
                          <SelectItem value="Class Five">Class Five</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tc_submitted"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        TC Submitted :
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

                <FormField
                  control={form.control}
                  name="previous_section"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous Section :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <Input
                          placeholder="Previous Section"
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
                  name="previous_roll_no"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous Roll No :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <Input
                          placeholder="Previous Roll No"
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
                  name="previous_portal_id"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous Portal ID :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <Input
                          placeholder="Previous Portal ID"
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
                  name="previous_from_date"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous From Date (MM/DD/YYYY) :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <div className="border-2 py-[1px]">
                          <Input
                            type="date"
                            placeholder="Previous From Date"
                            disabled={!isEditable}
                            {...field}
                            className="w-full border-none outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previous_to_date"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Previous To Date (MM/DD/YYYY) :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'text-gray-700 bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <div className="border-2 py-[1px]">
                          <Input
                            type="date"
                            placeholder="Previous To Date"
                            disabled={!isEditable}
                            {...field}
                            className="w-full border-none outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason_for_leaving"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Reason For Leaving :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
                        <Input
                          placeholder="Reason "
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

            <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Medical Details
              </h2>

              {/* Medical Details */}
              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="blood_group"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Blood Group :
                      </FormLabel>
                      <Select
                        disabled={!isEditable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blood Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="A+">A positive (A+)</SelectItem>
                          <SelectItem value="A-">A negative (A-)</SelectItem>
                          <SelectItem value="B+">B positive (B+)</SelectItem>
                          <SelectItem value="B-">B negative (B-)</SelectItem>
                          <SelectItem value="AB+">AB positive (AB+)</SelectItem>
                          <SelectItem value="AB-">AB negative (AB-)</SelectItem>
                          <SelectItem value="O+">O positive (O+)</SelectItem>
                          <SelectItem value="O-">O negative (O-)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

            <div className="bg-[#fff] rounded-lg p-9 border-2 relative">
              <h2 className="uppercase text-gray-700 font-bold text-[12.5px] tracking-wide absolute -top-[9px] left-[29px] bg-[#fff] px-1 rounded-full">
                Bank Details
              </h2>

              {/* Bank Details */}
              <div className="pt-16 grid lg:grid-cols-4 lg:gap-x-3 gap-y-5 lg:gap-y-10 rounded-lg">
                <FormField
                  control={form.control}
                  name="account_holder_name"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Account Holder Name
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Bank Name<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        Account Number<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn(
                          'text-gray-500 font-semibold w-fit mb-0.5'
                        )}
                      >
                        IFSC Code<span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl
                        className={cn(
                          'border-2 px-[10px] text-gray-700 py-[19px] bg-[#fff] rounded-[4px] w-full focus:outline-none placeholder:text-black/25 font-semibold font-sans text-[14px] overflow-scroll'
                        )}
                      >
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
            </div>

            {/* Assign Class, Section & Fees Group to Student Start */}
            <div className="mt-16">
              <div className="text-center py-3">
                <h2 className="uppercase text-gray-700 font-bold text-[20px] tracking-wide mb-1">
                  Admission Information
                </h2>
                <p className="text-gray-600 text-[16px]">
                  Assign Class, Section & Fees Group to Student
                </p>
              </div>

              <div className="p-9 mt-8 grid md:grid-cols-2 md:gap-x-3 lg:gap-x-8 gap-y-5 md:gap-y-10 bg-[#fff] border-2">
                {/* Class Dropdown */}
                <FormField
                  control={form.control}
                  name="class_info"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn('text-gray-500 font-semibold mb-0.5')}
                      >
                        Class
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classOptions.length > 0 &&
                            classOptions.map((item: any) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Academic Era Dropdown */}
                <FormField
                  control={form.control}
                  name="academic_era"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn('text-gray-500 font-semibold mb-0.5')}
                      >
                        Academic Era
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Academic Era" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {session.length > 0 &&
                            session.map((item: any) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Section Dropdown */}
                <FormField
                  control={form.control}
                  name="section_info"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn('text-gray-500 font-semibold mb-0.5')}
                      >
                        Section
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sectionOptions.length > 0 &&
                            sectionOptions.map((item: any) => (
                              <SelectItem
                                key={item._id}
                                value={item._id}
                                disabled={item.currStudents >= item.maxStudents}
                              >
                                {item.name} / Students - {item.currStudents}/
                                {item.maxStudents}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fees Group Dropdown */}
                <FormField
                  control={form.control}
                  name="fees_info"
                  render={({ field }) => (
                    <FormItem
                      className={cn('flex flex-col w-full text-[13px]')}
                    >
                      <FormLabel
                        className={cn('text-gray-500 font-semibold mb-0.5')}
                      >
                        Fees Group
                        <span className="text-red-500">*</span> :
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Fees Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allGroups.length > 0 &&
                            allGroups.map((item: any) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Assign Class, Section & Fees Group to Student End */}

            <div className="mt-8 grid justify-end">
              <div className="flex items-center">
                <Button
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                  className={`w-36 h-12 mr-4 rounded ${
                    isEditable
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                >
                  {isEditable ? 'Cancel' : 'Edit'}
                </Button>
                {isEditable && (
                  <Button
                    onClick={() => setIsEditable(!isEditable)}
                    className="min-w-fit px-6 bg-[#228B22] hover:bg-[#186e18] w-36 h-12"
                  >
                    Apply Changes
                  </Button>
                )}
                {!isEditable && (
                  <Button type="submit" className={cn('w-fit h-12')}>
                    Submit & Admit Student
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Toaster richColors />
    </div>
  );
};

export default EditStudentForm;
