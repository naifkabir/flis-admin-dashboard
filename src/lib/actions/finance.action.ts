"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function GetAllFinanceHeaders() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get(`/fees/header/get-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function CreateNewFinanceHeader(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.post(`/fees/header/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

export async function DeleteHeader(feeHeaderId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.delete(
      `/fees/header/delete/${feeHeaderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { error: `Failed to delete header: ${response.statusText}` };
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetHeaderById(financeId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Fetching headers for financeId:", financeId);

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(`/fees/header/get/${financeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      console.warn("Received non-200 response:", response);
      return { error: `Unexpected status code: ${response.status}` };
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching header:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message || error.message };
    }
    return { error: error.message };
  }
}

export async function UpdateFeeHeader(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.put(`/fees/header/update`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error approving application:", error);
    return { error: error.message };
  }
}

// -------------------------------------------------------------------

export async function GetAllFinanceGroups() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get(`/fees/group/get-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function CreateNewFinanceGroup(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Data: ", data);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.post(`/fees/group/create`, data, {
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

export async function DeleteGroup(feeGroupId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.delete(
      `/fees/group/delete/${feeGroupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { error: `Failed to delete group: ${response.statusText}` };
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GetGroupById(id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Fetching headers for financeId:", id);

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.get(`/fees/group/get/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      console.warn("Received non-200 response:", response);
      return { error: `Unexpected status code: ${response.status}` };
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching group:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message || error.message };
    }
    return { error: error.message };
  }
}

export async function UpdateFeeGroup(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.put(`/fees/group/update`, data, {
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

// -------------------------------------------------------------------

export async function GetAllFinanceMaster() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get(`/fees/master/get-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function SetAmountInMaster(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.put(`/fees/master/set-amount`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating amount:", error);
    return { error: error.message };
  }
}

export async function DeleteHeaderInMaster(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.put(`/fees/master/delete-header`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function DeleteMaster(masterId: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.delete(`/fees/master/delete/${masterId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      return { error: `Failed to delete group: ${response.statusText}` };
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function CreateNewFinanceMaster(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("data: ", data);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.post(`/fees/master/create`, data, {
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

export async function AddHeaderInMaster(data: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("Data: ", data);

  if (!accessToken) {
    return { error: "No access token found." };
  }

  try {
    const response = await apiClient.put(`/fees/master/add-header`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}
