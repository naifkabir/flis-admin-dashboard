"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

interface ApiResponse<T> {
  message: string;
  data?: T;
}

export const GetAllClasses = async (): Promise<any | null> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get<ApiResponse<any>>("/class/get-all", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data || null;
  } catch (error: any) {
    console.error("Fetch user failed:", error);
    return null;
  }
};
