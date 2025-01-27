"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

interface ApiResponse<T> {
  message: string;
  data?: T;
}

interface LogoutResponse {
  success: boolean;
  statusCode?: number;
}

export const Logout = async (): Promise<LogoutResponse> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // console.log("Access Token actions: ", accessToken);

  // Check if the access token exists
  if (!accessToken) {
    return { success: false, statusCode: 401 }; // 401 : if no access token
  }

  try {
    const response = await apiClient.post<ApiResponse<{}>>(
      "/user/log-out",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // If logout is successful, delete the access token cookie
    if (response.data.message === "Logged out successfully.") {
      const cookie = cookies();
      cookie.set("accessToken", "", {
        path: "/",
        maxAge: -1, // Set max age to -1 to expire the cookie
      });

      return { success: true, statusCode: response.status };
    }

    return { success: false, statusCode: response.status };
  } catch (error: any) {
    return { success: false, statusCode: error.response?.status || 500 };
  }
};
