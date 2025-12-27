import axios, { AxiosError, isAxiosError } from "axios";
import { state } from "../context/index";
import type { API_RESPONSE, JUMIA_PRODUCT } from "../../../shared/types";

async function fetch_products(
    query: string,
    page: number = state.current_page
): Promise<API_RESPONSE<JUMIA_PRODUCT[] | null>> {
    let products: JUMIA_PRODUCT[] = [];
    const url = new URL("http://localhost:3000/products");
    url.searchParams.set("query", query);
    url.searchParams.set("page", page.toString());
    
    try {
        const response = await axios.get<API_RESPONSE<JUMIA_PRODUCT[] | null>>(
            url.toString(),
            {
                timeout: 10_000,
                validateStatus: () => true,
            }
        );
        console.log(response);
        const { status } = response;
        
        if (status >= 500 || typeof response.data !== "object") {
            return {
                success: false,
                error: {
                    message: "server error",
                    status: 500,
                    type: "SERVER",
                },
            };
        }
        
        if (status === 404) {
            return {
                success: false,
                error: {
                    message: "couldn't find any products",
                    status: 404,
                    type: "SERVICE",
                },
            };
        }
        
        if (status === 200) {
            const result = response.data as API_RESPONSE<JUMIA_PRODUCT[] | null>;
            if (result.success && result.data) {
                products = result.data; 
                return {
                    success: true,
                    data: result.data,
                };
            } else {
                return {
                    success: false,
                    error: {
                        message: "couldn't find any products",
                        status: 404,
                        type: "SERVICE",
                    },
                };
            }
        }
        
        return {
            success: false,
            error: {
                message: `Unexpected status code: ${status}`,
                status: status,
                type: "SERVICE",
            },
        };
        
    } catch (error) {
        if (isAxiosError(error)) {
            const err = error as AxiosError;
            return {
                success: false,
                error: {
                    message: err.message,
                    status: err.status ?? 404,
                    type: "SERVICE",
                },
            };
        } else {
            return {
                success: false,
                error: {
                    message: "unknown error occurred",
                    status: 500,
                    type: "SERVER",
                },
            };
        }
    } 
}

export { fetch_products };