"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function GetAllApplication(applicationStatus: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(
      `/admission/get-applications/${applicationStatus}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetStudentsByStatus(applicationStatus: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(
      `/student/get-students/${applicationStatus}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetStudentDetails(id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(
      `/student/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetStudentById(studentId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(
      `/admission/get-application/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
    return null;
  }

  try {
    const response = await apiClient.post(`/communication/counselling`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

export async function submitAfterEditApplication(data: any, id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Data: ", id);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.put(`/admission/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

export async function submitWithoutEditApplication(
  data: any,
  application_id: string
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Data: ", application_id);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.post(
      `/student/create/${application_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

export async function deleteAdmissionFromDatabase(id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // console.log("Data: ", id);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.delete(`/admission/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

export async function DeleteDocument(id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // console.log("Data: ", id);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.delete(`/document/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting document:", error);
    return { error: error.message };
  }
}
