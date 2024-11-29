"use server";

import apiClient from "../axios";
import { cookies } from "next/headers";

export async function GetActiveSession() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const response = await apiClient.get(`/session/get-active`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data;
    } catch (error: any) {
        return { error: error.message };
    }
}