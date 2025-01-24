"use client";

import AddPaymentHistoryDialog from "@/components/AddPaymentHistoryDialog";
import PageLoader from "@/components/ui-components/PageLoading";
import { Button } from "@/components/ui/button";
import { GetStudentFee } from "@/lib/actions/studentFees.action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CollectFeesPage() {
  const params = useParams();
  const { params: dynamicParams } = params || {}; // Access [...params]
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    return <div>Invalid URL or failed to fetch data</div>;
  }

  return (
    <div className="grid gap-10">
      <div>
        <div className="mb-5 flex justify-end">
          <Button onClick={() => window.history.back()}>Back</Button>
        </div>
        <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
          Fees Details
        </h2>
        {data?.fees?.map((fee: any) => (
          <div key={fee._id} className="flex flex-col border-2 mb-10">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-[12px]">
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
                    <td className="px-4 py-2 text-center">{fee.name}</td>
                    <td className="px-4 py-2 text-center">{fee.occurrence}</td>
                    <td className="px-4 py-2 text-center">{fee.amount}</td>
                    <td className="px-4 py-2 text-center">
                      {fee.discountAmount}
                    </td>
                    <td className="px-4 py-2 text-center">{fee.finalAmount}</td>
                    <td className="px-4 py-2 text-center">
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">{fee.paidAmount}</td>
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
                        <span className="text-green-600">Fully Paid</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="m-3 grid grid-cols-5 gap-5">
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
                  <Button variant="outline" className="my-2">
                    Get Receipt
                  </Button>
                </div>
              ))}
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
