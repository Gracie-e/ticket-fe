import type { ApiError, ApiResponse } from '@/types/api/common.ts';

type FetchArgs = [input: RequestInfo | URL, init?: RequestInit];
type Fetcher = <T>(input: RequestInfo | URL, init?: RequestInit) => Promise<T>;

function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}

const fetcher: Fetcher = async <T>(...[input, init]: FetchArgs): Promise<T> => {
    try {
        const response = await fetch(input, init);

        if (!response.ok) {
            throw {
                message: response.statusText || `HTTP ERROR | STATUS CODE - ${response.status}`,
                status: response.status
            } satisfies ApiError;
        }

        const apiResponse: ApiResponse<T> = await response.json();

        if (apiResponse.error) {
            throw apiResponse.error;
        }

        if (apiResponse.data === null) {
            throw {
                message: 'Response data is null',
                status: 500
            } satisfies ApiError;
        }

        return apiResponse.data;
    } catch (err) {
        if (isApiError(err)) {
            throw err;
        }

        throw {
            message: err instanceof Error ? err.message : 'Unknown error occurred',
            status: 500
        } satisfies ApiError;
    }
};

export default fetcher;