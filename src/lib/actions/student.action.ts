"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function GetAllApplication(applicationStatus: string) {
  try {
    const response = await apiClient.get(
      `/admission/get-applications/${applicationStatus}`
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetStudentById(studentId: string) {
  try {
    const response = await apiClient.get(
      `/admission/get-application/${studentId}`
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function RejectApplication(studentId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.delete(
      `/admission/archive-application/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function ApproveApplicationForCounselling(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null; // You might consider logging a message for debugging
  }

  try {
    const response = await apiClient.delete(
      `/admission/archive-application`, // Correct URL with quotes
      {
        data, // Send data as an object, this is where you send necessary parameters
        headers: {
          Authorization: `Bearer ${accessToken}`, // Corrected string interpolation
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error approving application:", error); // Log error for debugging
    return { error: error.message }; // Return error message
  }
}
