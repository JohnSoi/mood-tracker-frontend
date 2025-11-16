type THttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ISourceServiceContract {
    address: string;
    endpoint: string;
}

interface ISourceServiceOptions {
    contract: string | ISourceServiceContract;
    keyProperty?: string;
    timeout?: number;
    onError?: (error: IApiError) => boolean;
    onAuthRequired?: () => boolean;
}

interface IApiError {
    message: string;
    code: string;
    status: number;
    details?: unknown;
    config?: {
        url?: string;
        method?: string;
    };
}

interface IEntityWithId {
    [key: string]: unknown;
    id: number;
}

interface INavigation {
    page: number;
    limit: number;
}

interface ISortingParams {
    field: string;
    order: "desc" | "asc";
}

interface IListParams {
    filters?: Record<string, unknown>;
    navigation?: INavigation;
    sort?: ISortingParams[];
}

interface IListResponse<TResponse> {
    data: TResponse[];
    hasNextPage?: boolean;
}

export type {
    ISourceServiceContract,
    IApiError,
    ISourceServiceOptions,
    THttpMethod,
    IEntityWithId,
    IListParams,
    IListResponse,
};
