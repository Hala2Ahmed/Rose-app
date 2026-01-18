declare type ErrorResponse = {
    error: string;
}

declare type SuccessResponse<T> = {
    message: string;
} & T;

declare type PaginationData<T> = {
    metadata: {
        currentPage: number,
        totalPages: number,
        limit: number,
        totalItems: number,
    }
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;