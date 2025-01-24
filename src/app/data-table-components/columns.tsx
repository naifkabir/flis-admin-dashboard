'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FinanceHeader } from '@/types/types';

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
    id: 'serial_number',
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
    accessorKey: 'name',
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Information" />
      </div>
    ),
    cell: ({ row }) => {
      const studentPhoto = row.original.photo || '/path/to/placeholder.jpg';

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
            <span className="font-semibold">{row.getValue('name')}</span>
            <span>{row.original.gender || 'N/A'}</span>
          </div>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Date of Birth" />
      </div>
    ),
    cell: ({ row }) => (
      <p>{new Date(row.getValue('dob')).toLocaleDateString('gd-IN')}</p>
    ),
  },
  {
    accessorKey: 'class',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Class" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('class')}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'g_name',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Guardian" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('g_name')}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'g_contact',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Phone" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('g_contact')}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Address" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('address')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const data = row.original;
      const status = row.original.status;

      const handleDelete = async () => {
        const result = await deleteAdmissionFromDatabase(data.id);

        if (result.error) {
          toast.error('Something went wrong while deleting the admission', {
            position: 'top-center',
          });
        } else {
          toast.success('Admission deleted successfully');
          window.location.reload();
        }
      };

      return (
        <div className="flex justify-center gap-4">
          <Link href={`/student/${data.id}`}>
            <Button>View</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          {(status === 'PENDING' || status === 'UNDER-COUNSELLING') &&
            handleReject && (
              <Button onClick={() => handleReject(data.id)}>Reject</Button>
            )}
        </div>
      );
    },
  },
];

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

export const admittedStudent = (
  handleReject?: (studentId: string) => Promise<void>
): ColumnDef<Student>[] => [
  {
    id: 'serial_number',
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
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Student Name" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="gap-5 w-full flex items-center justify-center">
          <div className="flex flex-col items-start">
            <span className="font-semibold">{row.getValue('name')}</span>
          </div>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'student_photo',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Photo" />
      </div>
    ),
    cell: ({ row }) => {
      const studentPhoto = row.original.photo || '/path/to/placeholder.jpg';

      return (
        <div className="gap-5 w-full flex items-center justify-center">
          <Image
            src={studentPhoto}
            alt="student_photo"
            width={500}
            height={500}
            className="object-cover object-center w-20 h-24"
          />
        </div>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: 'admission_id',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Admission Id" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('admission_id')}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'admission_date',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Admission Date" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('admission_date')}</p>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Date of Birth" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('dob')}</p>,
  },
  {
    accessorKey: 'academic_era',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Academic Era" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue('academic_era')}
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'Gender',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Gender" />
      </div>
    ),
    cell: ({ row }) => (
      <p>
        <span>{row.original.gender || 'N/A'}</span>
      </p>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-center gap-4">
          <Link href={`/school/${data.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      );
    },
  },
];

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

export const FinanceColumnFeeHeaders = (
  handleEdit?: (termId: number) => void,
  handleDeleteHeader?: (termId: string) => Promise<void>
): ColumnDef<any>[] => [
  {
    id: 'serial_number',
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
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'feesCode',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Fees Code" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('feesCode')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'occurrence',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Occurrence" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('occurrence')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Due Date" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('dueDate')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Description" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('description')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-center gap-4">
          <Link href={`/finance/editFeeHeader/${data._id}`}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={() => handleDeleteHeader?.(data._id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

export const FinanceColumnFeeGroups = (
  handleDeleteGroup?: (termId: string) => Promise<void>
): ColumnDef<any>[] => [
  {
    id: 'serial_number',
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
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'groupCode',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Group Code" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('groupCode')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Description" />
      </div>
    ),
    cell: ({ row }) => <p>{row.getValue('description')}</p>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-center gap-4">
          <Link href={`/finance/editFeeGroup/${data._id}`}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={() => handleDeleteGroup?.(data._id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

import { FaRegTrashCan } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'sonner';
import { deleteAdmissionFromDatabase } from '@/lib/actions/student.action';

export const FinanceColumnFeeMasters = (
  handleEditAmount?: (amountData: any) => void,
  handleDeleteHeader?: (deleteHeaderInMasterData: any) => Promise<void>,
  handleAddHeader?: (master_id: string) => void,
  handleDeleteMaster?: (master_id: string) => Promise<void>
): ColumnDef<any>[] => [
  {
    id: 'serial_number',
    header: () => <span>Sl. No.</span>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.index + 1}</span>
      </div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: 'group',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Group" />
      </div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      // console.log("Col Data: ", data);
      return (
        <div>
          <p className="mb-1">
            <span className="text-[11px] justify-self-start">
              Group Name :{' '}
              <strong className="text-[13px] font-bold tracking-wider">
                {data?.group?.name}
              </strong>
            </span>
          </p>
          <p>
            <span className="text-[11px] justify-self-start">
              Group Code : {data?.group?.groupCode}
            </span>
          </p>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'headers',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Assigned Fee Headers" />
      </div>
    ),
    cell: ({ row }) => {
      const master_id = row.original?._id;
      const headers = (row.getValue('headers') as FinanceHeader[]) || [];

      return (
        <div>
          {headers.length > 0 ? (
            headers.map((header) => {
              const amountBgClass =
                header.amount == '0' ? 'text-red-600' : 'text-green-600';

              const obj_id = header._id;
              const amount = header.amount;

              return (
                <div
                  key={header._id}
                  className="grid grid-cols-3 gap-3 place-items-center p-2"
                >
                  <span className="text-[11px] justify-self-start">
                    Header Name :{' '}
                    <strong className="text-[13px] font-bold tracking-wider">
                      {header.name}
                    </strong>
                  </span>
                  <span
                    className={`p-1 font-bold tracking-wide justify-self-start" ${amountBgClass}`}
                  >
                    {header.amount}
                  </span>
                  <div className="flex">
                    <section
                      // href={`/finance/editFeeHeader/${header._id}`}
                      className="m-1"
                    >
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleEditAmount?.({
                            obj_id,
                            master_id,
                            amount,
                          })
                        }
                        className="font-extrabold bg-gray-950 text-[#fff] hover:bg-gray-800 hover:text-[#fff]"
                      >
                        <FaEdit />
                      </Button>
                    </section>
                    <Button
                      onClick={() =>
                        handleDeleteHeader?.({ obj_id, master_id })
                      }
                      variant="destructive"
                      className="text-[16px] font-extrabold m-1"
                    >
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="text-xs text-red-500">No headers available</span>
          )}
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-center gap-4">
          <Button onClick={() => handleAddHeader?.(data._id)}>
            Add Header
          </Button>
          <Button
            onClick={() => handleDeleteMaster?.(data._id)}
            variant="destructive"
          >
            Delete Master
          </Button>
        </div>
      );
    },
  },
];
