'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

function CollectFeesPage() {
  const params = useParams();
  const { params: dynamicParams } = params || {}; // Access [...params]
  const [data, setData] = useState<any | null>(null);

  if (Array.isArray(dynamicParams) && dynamicParams.length >= 3) {
    const [studentId, sessionId, classId] = dynamicParams;

    // Do something with the dynamic parameters
    console.log(studentId, sessionId, classId);
  } else {
    // handle the case where dynamicParams is not an array or has less than 3 elements
    return <div>Invalid URL or missing parameters</div>;
  }

  return (
    <div className="grid gap-10">
      <div className="bg-white rounded shadow border border-red-600">
        <h2 className="text-lg font-semibold mb-5 text-center py-3 bg-red-600 text-white">
          Fees Details
        </h2>
        <table className="table-auto w-full p-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-3">Fees Type</th>
              <th className="border px-4 py-3">Occurrence</th>
              <th className="border px-4 py-3">Amount</th>
              <th className="border px-4 py-3">Discount Amount</th>
              <th className="border px-4 py-3">Final Amount</th>
              <th className="border px-4 py-3">Paid Amount</th>
              <th className="border px-4 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="border px-4 py-3">01/10/2024</td>
              <td className="border px-4 py-3">Mathematics</td>
              <td className="border px-4 py-3">100</td>
              <td className="border px-4 py-3">35</td>
              <td className="border px-4 py-3">85</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">02/10/2024</td>
              <td className="border px-4 py-3">Science</td>
              <td className="border px-4 py-3">100</td>
              <td className="border px-4 py-3">35</td>
              <td className="border px-4 py-3">70</td>
            </tr>
          </tbody>
        </table>

        {/* Overall Results Section */}
        <div className="mt-8">
          <table className="table-auto w-full text-sm border-collapse">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Total Amount</td>
                <td className="border px-4 py-2">200/500</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Total Paid Amount
                </td>
                <td className="border px-4 py-2">80%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Overall Payment Status
                </td>
                <td className="border px-4 py-2">A</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Rank</td>
                <td className="border px-4 py-2">01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollectFeesPage;
