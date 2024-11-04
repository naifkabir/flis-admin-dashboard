"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function ApproveApplicationCounsellingDone(
  data: Record<string, any>
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const params = new URLSearchParams(data).toString();

    const response = await apiClient.put(
      `/admission/change-counselling-status?${params}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}
