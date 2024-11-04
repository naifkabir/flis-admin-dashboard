"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function UploadStudentDocs(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Data: ", data);

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.post(`/document/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}
