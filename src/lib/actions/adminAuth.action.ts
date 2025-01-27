"use server";

import apiClient from "../axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse<T> {
  message: string;
  data?: T;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// ----------------------------------------------------------------------
// Login User Authentication
export async function LoginUser(
  data: LoginData
): Promise<
  | { redirect: { destination: string; permanent: boolean }; message: string }
  | { error: string }
> {
  try {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      "/user/log-in",
      data
    );

    revalidatePath("/dashboard");
    cookies().set({
      name: "accessToken",
      value: response.data.data?.accessToken || "",
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
    });

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      error:
        error.response?.data?.message || error.message || "An error occurred.",
    };
  }
}

// ----------------------------------------------------------------------
// Sign Up New User
export async function SignUpFormApi(data: SignUpData): Promise<any> {
  try {
    const response = await apiClient.post<ApiResponse<{}>>(
      "/user/sign-up",
      data
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error:
        error.response?.data?.message || error.message || "An error occurred.",
    };
  }
}

// ----------------------------------------------------------------------
// Get Current Admin Details
export const GetCurrentAdminApi = async (): Promise<any | null> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get<ApiResponse<any>>(
      "/user/get-current-admin",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data || null;
  } catch (error: any) {
    console.error("Fetch user failed:", error);
    return null;
  }
};

// ----------------------------------------------------------------------
// Change Password
export const ChangePasswordApi = async (
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Access token not found." };
  }

  try {
    const response = await apiClient.post(
      "/user/change-password",
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Password changed successfully.",
    };
  } catch (error: any) {
    console.error("Change password failed:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "An error occurred.",
    };
  }
};
