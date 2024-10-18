// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// type Student = {
//   [x: string]: any;
//   id: string;
//   name: string;
//   dob: string;
//   class: string;
//   photo: string;
//   contact: string;
//   g_name: string;
//   g_contact: string;
//   g_relation: string;
//   address: string;
//   status: string;
// };

// export const columns: ColumnDef<Student>[] = [
//   {
//     id: "serial_number",
//     header: () => <span>Sl. No.</span>,
//     cell: ({ row }) => {
//       return (
//         <div className="flex justify-center items-center">
//           0<span>{row.index + 1}</span>{" "}
//         </div>
//       );
//     },
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <div className="">
//         <DataTableColumnHeader column={column} title="Information" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original;
//       const student_gender = data?.gender || "N/A";
//       const studentPhoto = data?.photo || "/path/to/placeholder.jpg";

//       return (
//         <div className="gap-5 w-fit flex items-center justify-center">
//           {studentPhoto ? (
//             <Image
//               src={row.original.photo}
//               alt="student_photo"
//               width={500}
//               height={500}
//               className="rounded-full transition-all duration-300 object-cover object-center w-10 h-10 hover:scale-150"
//             />
//           ) : (
//             <div className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center">
//               <span className="text-gray-600">No Image</span>
//             </div>
//           )}
//           <div className="flex flex-col items-start">
//             <span className="font-semibold">{row.getValue("name")}</span>
//             <span>{row.original.gender}</span>
//           </div>
//         </div>
//       );
//     },
//     enableHiding: true,
//     enableSorting: true,
//   },
//   {
//     accessorKey: "dob",
//     header: ({ column }) => (
//       <div className="flex justify-center">
//         <DataTableColumnHeader column={column} title="Date of Birth" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original.student_details;
//       return <p>{new Date(row.getValue("dob")).toLocaleDateString("gd-IN")}</p>;
//     },
//   },
//   {
//     accessorKey: "class",
//     header: ({ column }) => (
//       <div className="flex justify-center">
//         <DataTableColumnHeader column={column} title="Class" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original.student_details;

//       return <p>{row.getValue("class")}</p>;
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     enableHiding: true,
//     enableSorting: true,
//   },
//   {
//     accessorKey: "g_name",
//     header: ({ column }) => (
//       <div className="flex justify-center">
//         <DataTableColumnHeader column={column} title="Guardian" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original.guardian_details;
//       return <p>{row.getValue("g_name")}</p>;
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     enableHiding: true,
//     enableSorting: true,
//   },
//   {
//     accessorKey: "g_contact",
//     header: ({ column }) => (
//       <div className="flex justify-center">
//         <DataTableColumnHeader column={column} title="Phone" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original.guardian_details;
//       return <p>{row.getValue("g_contact")}</p>;
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//     enableHiding: true,
//     enableSorting: true,
//   },
//   {
//     accessorKey: "address",
//     header: ({ column }) => (
//       <div className="flex justify-center">
//         <DataTableColumnHeader column={column} title="Address" />
//       </div>
//     ),
//     cell: ({ row }) => {
//       const data = row.original.address;
//       return <p>{row.getValue("address")}</p>;
//     },
//     enableHiding: true,
//     enableSorting: true,
//   },
//   {
//     accessorKey: "action",
//     header: "Action",
//     cell: ({ row }) => {
//       const data = row.original;
//       const status = row.original.status;
//       console.log(status);

//       return (
//         <div className="flex justify-center gap-4">
//           <Link href={`/student/${data.id}`}>
//             <Button>View</Button>
//           </Link>
//           {status == "PENDING" && <Button>Reject</Button>}{" "}
//         </div>
//       );
//     },
//   },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Student = {
  [x: string]: any;
  id: string;
  name: string;
  gender: string;
  dob: string;
  class: string;
  photo: string;
  contact: string;
  g_name: string;
  g_contact: string;
  g_relation: string;
  address: string;
  status: string;
};

export const columns = (
  handleReject?: (studentId: string) => Promise<void>
): ColumnDef<Student>[] => [
  {
    id: "serial_number",
    header: () => <span>Sl. No.</span>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.index + 1}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Information" />
      </div>
    ),
    cell: ({ row }) => {
      const studentPhoto = row.original.photo || "/path/to/placeholder.jpg";

      return (
        <div className="gap-5 w-fit flex items-center justify-center">
          <Image
            src={studentPhoto}
            alt="student_photo"
            width={500}
            height={500}
            className="rounded-full transition-all duration-300 object-cover object-center w-10 h-10 hover:scale-150"
          />
          <div className="flex flex-col items-start">
            <span className="font-semibold">{row.getValue("name")}</span>
            <span>{row.original.gender || "N/A"}</span>
          </div>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "dob",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Date of Birth" />
      </div>
    ),
    cell: ({ row }) => (
      <p>{new Date(row.getValue("dob")).toLocaleDateString("gd-IN")}</p>
    ),
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Class" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue("class")}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "g_name",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Guardian" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue("g_name")}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "g_contact",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Phone" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue("g_contact")}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Address" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue("address")}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;
      const status = row.original.status;

      return (
        <div className="flex justify-center gap-4">
          <Link href={`/student/${data.id}`}>
            <Button>View</Button>
          </Link>
          {(status === "PENDING" || status === "UNDER-COUNSELLING") &&
            handleReject && (
              <Button onClick={() => handleReject(data.id)}>Reject</Button>
            )}
        </div>
      );
    },
  },
];
