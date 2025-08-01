"use client";

import AddPaymentHistoryDialog from "@/components/AddPaymentHistoryDialog";
import PageLoader from "@/components/ui-components/PageLoading";
import { Button } from "@/components/ui/button";
import { GetStudentFee } from "@/lib/actions/studentFees.action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";

function CollectFeesPage() {
  const params = useParams();
  const { params: dynamicParams } = params || {}; // Access [...params]
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];
  const changeDueDateFormat = (date: string) => {
    const dateString = new Date(date).toISOString().split("T")[0];
    return dateString;
  };

  useEffect(() => {
    if (Array.isArray(dynamicParams) && dynamicParams.length >= 3) {
      const [studentId, sessionId, classId] = dynamicParams;

      const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
          const result = await GetStudentFee(studentId, sessionId, classId);

          if (result) {
            setData(result);
          }
        } catch (error: any) {
          toast.error("Failed to fetch data", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [dynamicParams]);

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PageLoader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Invalid URL or failed to fetch data
      </div>
    );
  }

  console.log(data);

  return (
    <div className="grid gap-10 min-h-full pb-10">
      <div>
        <div className="mb-5 mt-3 flex justify-end">
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
          Fees Details
        </h2>
        {data?.fees?.map((fee: any) => (
          <div key={fee._id}>
            <div
              className={`flex flex-col mb-10 ${
                changeDueDateFormat(fee.dueDate) >= todayDate &&
                fee.amount !== fee.paidAmount + fee.discountAmount
                  ? "border-2 border-red-500"
                  : fee.amount === fee.paidAmount + fee.discountAmount
                  ? "border-2 border-green-500"
                  : "border-2"
              }`}>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr
                      className={`${
                        changeDueDateFormat(fee.dueDate) >= todayDate &&
                        fee.amount != fee.paidAmount + fee.discountAmount
                          ? ""
                          : "bg-gray-200"
                      } text-[12px]  `}>
                      <th className="px-4 py-2 text-center">Fee Type</th>
                      <th className="px-4 py-2 text-center">Occurrence</th>
                      <th className="px-4 py-2 text-center">Amount</th>
                      <th className="px-4 py-2 text-center">Discount Amount</th>
                      <th className="px-4 py-2 text-center">Final Amount</th>
                      <th className="px-4 py-2 text-center">Due Date</th>
                      <th className="px-4 py-2 text-center">Paid Amount</th>
                      <th className="px-4 py-2 text-center">Payment Status</th>
                      <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-[13.5px]">
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`${
                            changeDueDateFormat(fee.dueDate) >= todayDate &&
                            fee.amount != fee.paidAmount + fee.discountAmount
                              ? "bg-red-500 text-white px-2 py-0.5 rounded-md text-[11px]"
                              : fee.amount ===
                                fee.paidAmount + fee.discountAmount
                              ? "bg-green-500 text-white px-2 py-0.5 rounded-md text-[11px]"
                              : ""
                          }`}>
                          {fee.name}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {fee.occurrence}
                      </td>
                      <td className="px-4 py-2 text-center">{fee.amount}</td>
                      <td className="px-4 py-2 text-center">
                        {fee.discountAmount}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {fee.finalAmount}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={` ${
                            changeDueDateFormat(fee.dueDate) >= todayDate &&
                            fee.amount != fee.paidAmount + fee.discountAmount
                              ? "bg-red-500 text-white px-2 py-0.5 rounded-md text-[11px]"
                              : fee.amount ===
                                fee.paidAmount + fee.discountAmount
                              ? "bg-green-500 text-white px-2 py-0.5 rounded-md text-[11px]"
                              : ""
                          }`}>
                          {new Date(fee.dueDate).toLocaleDateString()}
                        </span>
                        {changeDueDateFormat(fee.dueDate) >= todayDate &&
                          fee.amount != fee.paidAmount + fee.discountAmount && (
                            <span className="py-0.5 text-[11px] block font-semibold mt-1">
                              This payment is due
                            </span>
                          )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {fee.paidAmount}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {fee.paymentStatus}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {fee.finalAmount != fee.paidAmount ? (
                          <AddPaymentHistoryDialog
                            feesStructureId={data._id}
                            feeId={fee._id}
                          />
                        ) : (
                          <span className="bg-green-600 text-white px-2 py-0.5 text-[11px] rounded-md">
                            Fully Paid
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="m-3 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {fee?.paymentHistory?.map((pay: any, index: string) => (
                  <div
                    key={index}
                    className="border-2 p-5 text-[13.5px] flex flex-col gap-1.5 bg-white rounded-md">
                    <div>
                      <span className="text-gray-600">Paid Amount:</span>{" "}
                      <span className="font-semibold">{pay.amountPaid}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>{" "}
                      <span className="font-semibold">{pay.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Transaction Id:</span>{" "}
                      <span className="font-semibold">{pay.transactionId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Date:</span>{" "}
                      <span className="font-semibold">
                        {new Date(pay.paymentDate).toLocaleString()}
                      </span>
                    </div>
                    <div className="my-2 flex items-center justify-between">
                      <Button variant="destructive">
                        <FaRegTrashCan />
                      </Button>
                      <span className="space-x-2">
                        <Button variant="default">
                          <FaEdit />
                        </Button>
                        <Button variant="outline">
                          <IoReceiptOutline />
                        </Button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Overall Results Section */}
        <div className="mt-10 bg-white">
          <table className="table-auto w-full text-sm border-collapse">
            <tbody>
              <tr>
                <td className="border-2 px-4 py-2 font-semibold">
                  Total Amount
                </td>
                <td className="border-2 px-4 py-2">{data?.totalFinalAmount}</td>
              </tr>
              <tr>
                <td className="border-2 px-4 py-2 font-semibold">
                  Total Paid Amount
                </td>
                <td className="border-2 px-4 py-2">{data?.totalPaidAmount}</td>
              </tr>
              <tr>
                <td className="border-2 px-4 py-2 font-semibold">
                  Overall Payment Status
                </td>
                <td className="border-2 px-4 py-2">
                  {data?.overallPaymentStatus}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollectFeesPage;
