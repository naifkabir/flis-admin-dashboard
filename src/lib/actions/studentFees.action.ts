"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function GetStudentFee(
  studentId: string,
  sessionId: string,
  classId: string
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get(
      `/student-fees/get-fees-structure?studentId=${studentId}&sessionId=${sessionId}&classId=${classId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function AddPaymentRecord(
  feesStructureId: string,
  feeId: string,
  data: any
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.put(
      `/student-fees/add-payment-history?feesStructureId=${feesStructureId}&feeId=${feeId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.response.data.message || error.message };
  }
}
