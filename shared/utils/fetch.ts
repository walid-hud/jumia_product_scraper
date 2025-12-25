import axios, { AxiosError, type AxiosRequestConfig , isAxiosError } from "axios";
import type { API_RESPONSE } from "../types.ts";

const fetch_page = async (
    url: string,
    config: AxiosRequestConfig 
): Promise<API_RESPONSE<string>> => {
    let result: API_RESPONSE<string> = { success: false };
    try {
        const response = await axios.get<string>(url , {
            ...config,
            timeout: 10_000,
            validateStatus: () => true,
        });

        if (
            response.status < 200 ||
            response.status >= 300 ||
            typeof response.data !== "string" 
        ) {
            result.error = {
                message: "target site didn't respond",
                status: response.status,
                type: "SERVICE",
            };
        } else {
            result.success = true;
            result.data = response.data;
        }
    } catch (error) {
        if(isAxiosError(error)){
            const err = error as AxiosError
            result.error = {message:err.message, status:err.status??404, type:
                "SERVICE"
             }
        }
    }finally{
        return result;
    }
};

export {fetch_page}