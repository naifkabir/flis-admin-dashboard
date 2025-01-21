'use client';

import AddPaymentHistoryDialog from '@/components/AddPaymentHistoryDialog';
import PageLoader from '@/components/ui-components/PageLoading';
import { Button } from '@/components/ui/button';
import { GetStudentFee } from '@/lib/actions/studentFees.action';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
          toast.error('Failed to fetch data', error);
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
      <div className="bg-white rounded shadow border border-red-600">
        <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
          Fees Details
        </h2>
        {data?.fees.map((fee: any, index: string) => (
          <div
            key={fee._id}
            className="flex flex-col border border-red-500 m-2 rounded-sm"
          >
            <div className="flex flex-row justify-around items-center">
              <h3>Fee Type: {fee.name}</h3>
              <h3>Occurrence: {fee.occurrence}</h3>
              <h3>Amount: {fee.amount}</h3>
              <h3>Discount Amount: {fee.discountAmount}</h3>
              <h3>Final Amount: {fee.finalAmount}</h3>
              <h3>Due Date: {fee.dueDate}</h3>
              <h3>Paid Amount: {fee.paidAmount}</h3>
              <h3>Payment Status: {fee.paymentStatus}</h3>
              <AddPaymentHistoryDialog
                feesStructureId={data._id}
                feeId={fee._id}
              />
            </div>
            {fee?.paymentHistory.map((pay: any, index: string) => (
              <div
                key={index}
                className="flex flex-row border justify-around items-center border-red-500 m-2 rounded-sm"
              >
                <h3>Paid Amount: {pay.amountPaid}</h3>
                <h3>Payment Method: {pay.paymentMethod}</h3>
                <h3>Transaction Id: {pay.transactionId}</h3>
                <h3>Payment Date: {pay.paymentDate}</h3>
                <Button className="my-2">Get Receipt</Button>
              </div>
            ))}
          </div>
        ))}
        {/* Overall Results Section */}
        <div className="mt-8">
          <table className="table-auto w-full text-sm border-collapse">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Total Amount</td>
                <td className="border px-4 py-2">{data?.totalFinalAmount}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Total Paid Amount
                </td>
                <td className="border px-4 py-2">{data?.totalPaidAmount}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Overall Payment Status
                </td>
                <td className="border px-4 py-2">
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
