export interface MyResponse {
    success: boolean;
    message: string;
    data: Record<string, any>;
}

export interface MyResponseParam {
    success?: boolean;
    message?: string;
    data?: Record<string, any>;
}