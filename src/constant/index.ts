export const menuItems = [
  {
    name: "Employees",
    subItems: [
      {
        label: "Add Employees",
        href: "/employees/add",
        description: "Form to add new employees to the system.",
      },
      {
        label: "Payroll",
        href: "/employees/payroll",
        description: "Manage and review employee payroll information.",
      },
      {
        label: "Attendance",
        href: "/employees/attendance",
        description: "Track and manage employee attendance records.",
      },
      {
        label: "Approve Leaves",
        href: "/employees/approve-leaves",
        description: "Review and approve employee leave requests.",
      },
      {
        label: "Apply Leave",
        href: "/employees/apply-leave",
        description: "Submit leave requests for approval.",
      },
      {
        label: "Teacher’s Rating",
        href: "/employees/teachers-rating",
        description: "Evaluate and rate teachers based on performance.",
      },
      {
        label: "Setting",
        href: "/employees/setting",
        description: "Configure employee-related settings and preferences.",
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
      },
      {
        label: "Setting",
        href: "/communication/setting",
        description: "Manage communication preferences and settings.",
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
        href: "/academics/batch-sections",
        description: "Manage batches and sections for classes.",
      },
      {
        label: "Course/Classes",
        href: "/academics/course-classes",
        description: "Overview and manage available courses and classes.",
      },
      {
        label: "Subjects",
        href: "/academics/subjects",
        description: "Manage subjects offered in different classes.",
      },
      {
        label: "Subject Groups",
        href: "/academics/subject-groups",
        description: "Organize subjects into groups for better management.",
      },
      {
        label: "Time Table",
        href: "/academics/time-table",
        description: "View and manage the academic timetable.",
      },
      {
        label: "Allot Class Teacher",
        href: "/academics/allot-class-teacher",
        description: "Assign teachers to specific classes.",
      },
      {
        label: "Student Promotions",
        href: "/academics/student-promotions",
        description: "Manage promotions of students to higher classes.",
      },
      {
        label: "Setting",
        href: "/academics/setting",
        description: "Configure academic settings and preferences.",
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
      },
      {
        label: "Marks and Grade",
        href: "/examinations/marks-grade",
        description: "View and manage student marks and grading.",
      },
      {
        label: "Exam Schedule",
        href: "/examinations/exam-schedule",
        description: "View the schedule for upcoming examinations.",
      },
      {
        label: "Exam Results",
        href: "/examinations/exam-results",
        description: "Review examination results for all students.",
      },
      {
        label: "Design Marksheet",
        href: "/examinations/design-marksheet",
        description: "Create and customize examination marksheets.",
      },
      {
        label: "Design Admit Card",
        href: "/examinations/design-admit-card",
        description: "Design admission cards for students.",
      },
      {
        label: "Print Marksheet",
        href: "/examinations/print-marksheet",
        description: "Print examination marksheets for distribution.",
      },
      {
        label: "Print Admit Card",
        href: "/examinations/print-admit-card",
        description: "Print admit cards for students.",
      },
      {
        label: "Restrict Result",
        href: "/examinations/restrict-result",
        description: "Manage restrictions on viewing examination results.",
      },
      {
        label: "Setting",
        href: "/examinations/setting",
        description: "Configure examination-related settings.",
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
      },
      {
        label: "Search Payment",
        href: "/fees/search-payment",
        description: "Search and view payment records.",
      },
      {
        label: "Fee Carry Forward",
        href: "/fees/carry-forward",
        description: "Carry forward outstanding fees to the next term.",
      },
      {
        label: "Advance Fee",
        href: "/fees/advance",
        description: "Manage advance fee payments.",
      },
      {
        label: "Demand Notice",
        href: "/fees/demand-notice",
        description: "Generate and send demand notices for fee collection.",
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
      id: item.id,
      name: item.student_details.name,
      photo: item.student_details.photo,
      admission_id: item.student_details.admission_id,
      admission_date: item.student_details.admission_date,
      dob: item.student_details.date_of_birth,
      academic_era: item.student_details.academic_era,
      gender: item.student_details.gender,
    };
  });
  return result;
};
