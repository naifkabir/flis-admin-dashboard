export const menuItems = [
  {
    name: "Employees",
    subItems: [
      { label: "Add Employees", href: "/employees/add" },
      { label: "Payroll", href: "/employees/payroll" },
      { label: "Attendance", href: "/employees/attendance" },
      { label: "Approve Leaves", href: "/employees/approve-leaves" },
      { label: "Apply Leave", href: "/employees/apply-leave" },
      { label: "Teacher’s Rating", href: "/employees/teachers-rating" },
      { label: "Setting", href: "/employees/setting" },
    ],
  },
  {
    name: "Communication",
    subItems: [
      { label: "Notice Board", href: "/communication/notice-board" },
      { label: "Setting", href: "/communication/setting" },
    ],
  },
  {
    name: "Students",
    subItems: [
      {
        label: "Online Application List",
        href: "/student/pending",
      },
      {
        label: "counseling Application List",
        href: "/student/counseling",
      },
      { label: "Student Information", href: "/dashboard/list/students" },
      { label: "School House", href: "/students/school-house" },
      {
        label: "Archived List",
        href: "/student/reject",
      },
      { label: "Approved List", href: "/student/approve" },
    ],
  },
  {
    name: "Academics",
    subItems: [
      { label: "Batch/Sections", href: "/academics/batch-sections" },
      { label: "Course/Classes", href: "/academics/course-classes" },
      { label: "Subjects", href: "/academics/subjects" },
      { label: "Subject Groups", href: "/academics/subject-groups" },
      { label: "Time Table", href: "/academics/time-table" },
      {
        label: "Allot Class Teacher",
        href: "/academics/allot-class-teacher",
      },
      { label: "Student Promotions", href: "/academics/student-promotions" },
      { label: "Setting", href: "/academics/setting" },
    ],
  },
  {
    name: "Examinations",
    subItems: [
      { label: "Exam Group", href: "/examinations/exam-group" },
      { label: "Marks and Grade", href: "/examinations/marks-grade" },
      { label: "Exam Schedule", href: "/examinations/exam-schedule" },
      { label: "Exam Results", href: "/examinations/exam-results" },
      { label: "Design Marksheet", href: "/examinations/design-marksheet" },
      { label: "Design Admit Card", href: "/examinations/design-admit-card" },
      { label: "Print Marksheet", href: "/examinations/print-marksheet" },
      { label: "Print Admit Card", href: "/examinations/print-admit-card" },
      { label: "Restrict Result", href: "/examinations/restrict-result" },
      { label: "Setting", href: "/examinations/setting" },
    ],
  },
  {
    name: "Fees",
    subItems: [
      { label: "Fee Headers", href: "/finance/feesHeader" },
      { label: "Collect Fee", href: "/fees/collect" },
      { label: "Search Payment", href: "/fees/search-payment" },
      { label: "Fee Carry Forward", href: "/fees/carry-forward" },
      { label: "Advance Fee", href: "/fees/advance" },
      { label: "Demand Notice", href: "/fees/demand-notice" },
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
