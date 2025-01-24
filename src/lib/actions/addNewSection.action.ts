"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function AddNewSection(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.post("/section/create", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}
