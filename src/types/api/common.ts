interface ApiError {
    message: string;
    status: number;
}

interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
}

export type {
    ApiResponse,
    ApiError
}