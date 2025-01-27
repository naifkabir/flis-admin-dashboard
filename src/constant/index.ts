export const menuItems = [
  {
    name: "Employees",
    subItems: [
      {
        label: "Add Employees",
        href: "/employees/add",
        description: "Form to add new employees to the system.",
        shouldShowAlert: true,
      },
      {
        label: "Payroll",
        href: "/employees/payroll",
        description: "Manage and review employee payroll information.",
        shouldShowAlert: true,
      },
      {
        label: "Attendance",
        href: "/employees/attendance",
        description: "Track and manage employee attendance records.",
        shouldShowAlert: true,
      },
      {
        label: "Approve Leaves",
        href: "/employees/approve-leaves",
        description: "Review and approve employee leave requests.",
        shouldShowAlert: true,
      },
      {
        label: "Apply Leave",
        href: "/employees/apply-leave",
        description: "Submit leave requests for approval.",
        shouldShowAlert: true,
      },
      {
        label: "Teacher’s Rating",
        href: "/employees/teachers-rating",
        description: "Evaluate and rate teachers based on performance.",
        shouldShowAlert: true,
      },
      {
        label: "Setting",
        href: "/employees/setting",
        description: "Configure employee-related settings and preferences.",
        shouldShowAlert: true,
      },
    ],
  },
  {
    name: "Communication",
    subItems: [
      {
        label: "Notice Board",
        href: "/communication/notice-board",
        description: "View important announcements and notices.",
        shouldShowAlert: true,
      },
      {
        label: "Setting",
        href: "/communication/setting",
        description: "Manage communication preferences and settings.",
        shouldShowAlert: true,
      },
    ],
  },
  {
    name: "Students",
    subItems: [
      {
        label: "Online Application List",
        href: "/student/pending",
        description: "All pending application list of students.",
      },
      {
        label: "Counseling Application List",
        href: "/student/counseling",
        description: "View applications pending for student counseling.",
      },
      {
        label: "Student Information",
        href: "/student/all-admitted-student",
        description:
          "Access detailed information about students admitted on school.",
      },
      {
        label: "School House",
        href: "/students/school-house",
        description: "Manage school house assignments for students.",
        shouldShowAlert: true,
      },
      {
        label: "Archived List",
        href: "/student/reject",
        description: "View a list of archived student applications.",
      },
    ],
  },
  {
    name: "Academics",
    subItems: [
      {
        label: "Batch/Sections",
        href: "/academics/batch-and-section",
        description: "Manage batches and sections for classes.",
      },
      {
        label: "Course/Classes",
        href: "/academics/course-classes",
        description: "Overview and manage available courses and classes.",
        shouldShowAlert: true,
      },
      {
        label: "Subjects",
        href: "/academics/subjects",
        description: "Manage subjects offered in different classes.",
        shouldShowAlert: true,
      },
      {
        label: "Subject Groups",
        href: "/academics/subject-groups",
        description: "Organize subjects into groups for better management.",
        shouldShowAlert: true,
      },
      {
        label: "Time Table",
        href: "/academics/time-table",
        description: "View and manage the academic timetable.",
        shouldShowAlert: true,
      },
      {
        label: "Allot Class Teacher",
        href: "/academics/allot-class-teacher",
        description: "Assign teachers to specific classes.",
        shouldShowAlert: true,
      },
      {
        label: "Student Promotions",
        href: "/academics/student-promotions",
        description: "Manage promotions of students to higher classes.",
        shouldShowAlert: true,
      },
      {
        label: "Setting",
        href: "/academics/setting",
        description: "Configure academic settings and preferences.",
        shouldShowAlert: true,
      },
    ],
  },
  {
    name: "Examinations",
    subItems: [
      {
        label: "Exam Group",
        href: "/examinations/exam-group",
        description: "Manage groups for different examination sessions.",
        shouldShowAlert: true,
      },
      {
        label: "Marks and Grade",
        href: "/examinations/marks-grade",
        description: "View and manage student marks and grading.",
        shouldShowAlert: true,
      },
      {
        label: "Exam Schedule",
        href: "/examinations/exam-schedule",
        description: "View the schedule for upcoming examinations.",
        shouldShowAlert: true,
      },
      {
        label: "Exam Results",
        href: "/examinations/exam-results",
        description: "Review examination results for all students.",
        shouldShowAlert: true,
      },
      {
        label: "Design Marksheet",
        href: "/examinations/design-marksheet",
        description: "Create and customize examination marksheets.",
        shouldShowAlert: true,
      },
      {
        label: "Design Admit Card",
        href: "/examinations/design-admit-card",
        description: "Design admission cards for students.",
        shouldShowAlert: true,
      },
      {
        label: "Print Marksheet",
        href: "/examinations/print-marksheet",
        description: "Print examination marksheets for distribution.",
        shouldShowAlert: true,
      },
      {
        label: "Print Admit Card",
        href: "/examinations/print-admit-card",
        description: "Print admit cards for students.",
        shouldShowAlert: true,
      },
      {
        label: "Restrict Result",
        href: "/examinations/restrict-result",
        description: "Manage restrictions on viewing examination results.",
        shouldShowAlert: true,
      },
      {
        label: "Setting",
        href: "/examinations/setting",
        description: "Configure examination-related settings.",
        shouldShowAlert: true,
      },
    ],
  },
  {
    name: "Fees",
    subItems: [
      {
        label: "Fee Headers",
        href: "/finance/feesHeader",
        description: "Manage the headers for various fee categories.",
      },
      {
        label: "Fee Groups",
        href: "/finance/feesGroup",
        description:
          "Organize fees into different groups for better management.",
      },
      {
        label: "Fee Masters",
        href: "/finance/feesMaster",
        description: "View and manage master fee records.",
      },
      {
        label: "Collect Fee",
        href: "/fees/collect",
        description: "Interface for collecting fees from students.",
        shouldShowAlert: true,
      },
      {
        label: "Search Payment",
        href: "/fees/search-payment",
        description: "Search and view payment records.",
        shouldShowAlert: true,
      },
      {
        label: "Fee Carry Forward",
        href: "/fees/carry-forward",
        description: "Carry forward outstanding fees to the next term.",
        shouldShowAlert: true,
      },
      {
        label: "Advance Fee",
        href: "/fees/advance",
        description: "Manage advance fee payments.",
        shouldShowAlert: true,
      },
      {
        label: "Demand Notice",
        href: "/fees/demand-notice",
        description: "Generate and send demand notices for fee collection.",
        shouldShowAlert: true,
      },
    ],
  },
];

// //function
export const studentTableFilter = (data: any) => {
  const result = data.map((item: any) => {
    const address = item.address;

    return {
      id: item.id,
      name: item.student_details.name,
      gender: item.student_details.gender,
      photo: item.student_details.photo,
      dob: item.student_details.date_of_birth,
      class: item.student_details.class,
      contact: item.student_details.contact_no,
      g_name: item.guardian_details.name,
      g_contact: item.guardian_details.phone,
      counselling_date: item.counselling_date || "Not Available",
      counselling_time: item.counselling_time || "Not Available",
      g_relation: item.guardian_details.relation,
      address: `${address.village || ""}${
        address.post_office ? `, ${address.post_office}` : ""
      }${address.police_station ? `, ${address.police_station}` : ""}${
        address.district ? `, ${address.district}` : ""
      }${address.state ? `, ${address.state}` : ""}${
        address.postal_code ? `, ${address.postal_code}` : ""
      }`,
      status: item.status,
    };
  });
  return result;
};

// function
export const admittedStudentTableFilter = (data: any) => {
  const result = data.map((item: any) => {
    return {
      id: item._id,
      name: item.name,
      photo: item.photo,
      admission_id: item.admission_id,
      admission_date: item.admission_date,
      dob: item.date_of_birth,
      academic_era: item.academic_era,
      gender: item.gender,
      class: item.class,
      section: item.section,
    };
  });
  return result;
};

export const admittedStudentDetails = (data: any) => {
  const result = {
    _id: data._id,
    flisId: data.flisId,
    basic_details: {
      name:
        data.student_details.first_name +
          " " +
          data.student_details.middle_name +
          " " +
          data.student_details.last_name || "N/A",
      gender: data.student_details.gender || "N/A",
      date_of_birth:
        new Date(data.student_details.date_of_birth).toLocaleDateString() ||
        "N/A",
      religion: data.student_details.religion || "N/A",
      mother_tongue: data.student_details.mother_tongue || "N/A",
      language_spoken_at_home:
        data.student_details.language_spoken_at_home || "N/A",
      caste_certificate_number:
        data.student_details.caste_certificate_number || "N/A",
      student_photo: data.student_details.student_photo,
    },
    medical_details: {
      blood_group: data.medical_details.blood_group || "N/A",
      special_medical_conditions:
        data.medical_details.special_medical_conditions.details || "N/A",
      special_assistance:
        data.medical_details.special_assistance.details || "N/A",
      regular_medication:
        data.medical_details.regular_medication.details || "N/A",
      allergies: data.medical_details.allergies.details || "N/A",
      height: data.medical_details.height || "N/A",
      weight: data.medical_details.weight || "N/A",
    },
    bank_details: {
      account_holder_name: data.bank_details.account_holder_name || "N/A",
      account_number: data.bank_details.account_no || "N/A",
      bank_name: data.bank_details.bank_name || "N/A",
      ifsc_code: data.bank_details.ifsc_code || "N/A",
    },
    father_details: {
      name: data.parent_guardian_details.father_information.name || "N/A",
      qualification:
        data.parent_guardian_details.father_information.qualification || "N/A",
      occupation:
        data.parent_guardian_details.father_information.occupation || "N/A",
      annual_income:
        data.parent_guardian_details.father_information.annual_income || "N/A",
      contact_no:
        data.parent_guardian_details.father_information.contact_no || "N/A",
      whatsapp_no:
        data.parent_guardian_details.father_information.whatsapp_no || "N/A",
    },
    mother_details: {
      name: data.parent_guardian_details.mother_information.name || "N/A",
      qualification:
        data.parent_guardian_details.mother_information.qualification || "N/A",
      occupation:
        data.parent_guardian_details.mother_information.occupation || "N/A",
      annual_income:
        data.parent_guardian_details.mother_information.annual_income || "N/A",
      contact_no:
        data.parent_guardian_details.mother_information.contact_no || "N/A",
      whatsapp_no:
        data.parent_guardian_details.mother_information.whatsapp_no || "N/A",
    },
    guardian_details: {
      name: data.parent_guardian_details.guardian_information.name || "N/A",
      qualification:
        data.parent_guardian_details.guardian_information.qualification ||
        "N/A",
      occupation:
        data.parent_guardian_details.guardian_information.occupation || "N/A",
      annual_income:
        data.parent_guardian_details.guardian_information.annual_income ||
        "N/A",
      contact_no:
        data.parent_guardian_details.guardian_information.contact_no || "N/A",
      whatsapp_no:
        data.parent_guardian_details.guardian_information.whatsapp_no || "N/A",
      email: data.parent_guardian_details.guardian_information.email || "N/A",
      relationship:
        data.parent_guardian_details.guardian_information.relationship || "N/A",
    },
    current_address: {
      village: data.communication_address.current_address.village || "N/A",
      post_office:
        data.communication_address.current_address.post_office || "N/A",
      police_station:
        data.communication_address.current_address.police_station || "N/A",
      district: data.communication_address.current_address.district || "N/A",
      postal_code:
        data.communication_address.current_address.postal_code || "N/A",
      state: data.communication_address.current_address.state || "N/A",
      country: data.communication_address.current_address.country || "N/A",
    },
    permanent_address: {
      village: data.communication_address.permanent_address.village || "N/A",
      post_office:
        data.communication_address.permanent_address.post_office || "N/A",
      police_station:
        data.communication_address.permanent_address.police_station || "N/A",
      district: data.communication_address.permanent_address.district || "N/A",
      postal_code:
        data.communication_address.permanent_address.postal_code || "N/A",
      state: data.communication_address.permanent_address.state || "N/A",
      country: data.communication_address.permanent_address.country || "N/A",
    },
    previous_institute_details: {
      institute_name: data.previous_institute_details.institute_name || "N/A",
      previous_section:
        data.previous_institute_details.previous_section || "N/A",
      previous_roll_no:
        data.previous_institute_details.previous_roll_no || "N/A",
      reason_for_leaving:
        data.previous_institute_details.reason_for_leaving || "N/A",
      board_affiliation:
        data.previous_institute_details.board_affiliation || "N/A",
      previous_class: data.previous_institute_details.previous_class || "N/A",
      previous_portal_id:
        data.previous_institute_details.previous_portal_id || "N/A",
    },
    fees: data.fees,
    class: data.class.name,
    classId: data.class._id,
    section: data.section,
    session: data.session.name,
    sessionId: data.session._id,
    admission_date: new Date(data.admission_date).toLocaleDateString(),
    documents: data.documents,
  };
  return result;
};
