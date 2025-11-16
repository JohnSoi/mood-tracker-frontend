import type {
    IApiError,
    IEntityWithId,
    IListParams,
    IListResponse,
    ISourceServiceContract,
    ISourceServiceOptions,
    THttpMethod
} from "@/interfases/sourceService.ts";
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { BASE_BL_URL, BASE_KEY_PROPERTY, BASE_TIMEOUT } from "@/consts/sourceService.ts";
import { deleteValueByKey, getValueByKey } from "@/utils/localStorage.ts";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, REFRESH_TOKEN_LOCAL_STORAGE_KEY } from "@/consts/auth.ts";

class SourceService {
    protected readonly _address: string;
    protected readonly _endpoint: string;
    protected readonly _client: AxiosInstance;
    protected readonly _keyProperty: string;
    protected readonly _onError?: (error: IApiError) => void;
    protected readonly _onAuthRequired?: () => void;

    constructor(options: ISourceServiceOptions) {
        const isSimplyConfig = typeof options.contract === 'string';

        this._validateOptions(options, isSimplyConfig);

        this._address = this._resolveAddress(options, isSimplyConfig);
        this._endpoint = this._resolveEndpoint(options, isSimplyConfig);

        this._keyProperty = options.keyProperty || BASE_KEY_PROPERTY;
        this._onError = options.onError;
        this._onAuthRequired = options.onAuthRequired;

        this._client = axios.create({
            baseURL: this._address,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: options.timeout || BASE_TIMEOUT,
            withCredentials: false
        });

        this._setupInterceptors();
    }

    /**
     * Получить одну сущность по ID
     */
    async get<TResponse extends IEntityWithId>(id: number | string): Promise<TResponse> {
        this._validateId(id);
        return await this._request<TResponse>('GET', this._getEntityUrl(id));
    }

    /**
     * Получить список сущностей с поддержкой фильтрации, пагинации и сортировки
     */
    async list<TResponse extends IEntityWithId>(
        params?: IListParams
    ): Promise<TResponse[]> {
        const response = await this._request<TResponse[]>('GET', this._getEntityUrl(), undefined, {
            params: this._buildQueryParams(params)
        });

        return this._validateAndDeduplicateList(response);
    }

    /**
     * Получить пагинированный список сущностей
     */
    async paginatedList<TResponse extends IEntityWithId>(
        params?: IListParams
    ): Promise<IListResponse<TResponse>> {
        return await this._request<IListResponse<TResponse>>("GET", this._getEntityUrl(), undefined, {
            params: this._buildQueryParams(params),
        });
    }

    /**
     * Создать новую сущность
     */
    async create<TRequest, TResponse extends IEntityWithId>(data: TRequest): Promise<TResponse> {
        return await this._request<TResponse>('POST', this._getEntityUrl(), data);
    }

    /**
     * Обновить сущность (полное обновление)
     */
    async update<TRequest extends IEntityWithId, TResponse extends IEntityWithId>(
        id: number | string,
        data: TRequest
    ): Promise<TResponse> {
        this._validateId(id);

        return await this._request<TResponse>('PUT', this._getEntityUrl(id), data);
    }

    /**
     * Удалить сущность
     */
    async delete(id: number | string): Promise<void> {
        this._validateId(id);
        await this._request<void>('DELETE', this._getEntityUrl(id));
    }

    /**
     * Универсальный метод для кастомных запросов
     */
    async call<TRequest, TResponse>(
        method: THttpMethod,
        path: string,
        data?: TRequest,
        config?: Partial<AxiosRequestConfig>
    ): Promise<TResponse> {
        this._validatePath(path);
        return await this._request<TResponse>(method, path, data, config);
    }

    private _validateOptions(options: ISourceServiceOptions, isSimplyConfig: boolean): void {
        if (!options?.contract) {
            throw new Error('SourceService: опция "contract" обязательна');
        }

        if (!isSimplyConfig) {
            const contract = options.contract as ISourceServiceContract;

            if (!contract.address?.trim()) {
                throw new Error('SourceService: "contract.address" обязателен и не может быть пустым');
            }

            if (!contract.endpoint?.trim()) {
                throw new Error('SourceService: "contract.endpoint" обязателен и не может быть пустым');
            }
        }
    }

    private _resolveAddress(options: ISourceServiceOptions, isSimplyConfig: boolean): string {
        return isSimplyConfig
            ? BASE_BL_URL
            : (options.contract as ISourceServiceContract).address;
    }

    private _resolveEndpoint(options: ISourceServiceOptions, isSimplyConfig: boolean): string {
        return isSimplyConfig
            ? (options.contract as string)
            : (options.contract as ISourceServiceContract).endpoint;
    }

    private _setupInterceptors(): void {
        // Request interceptor
        this._client.interceptors.request.use(
            (config) => {
                // Добавляем токен аутентификации
                const token: string | null = getValueByKey<string>(ACCESS_TOKEN_LOCAL_STORAGE_KEY, "");

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Логирование для разработки
                console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
                    data: config.data,
                    params: config.params
                });

                return config;
            },
            (error) => {
                console.error('SourceService: ошибка интерцептора запроса', error);
                return Promise.reject(this._normalizeError(error));
            }
        );

        // Response interceptor
        this._client.interceptors.response.use(
            (response: AxiosResponse) => {
                // Логирование успешных ответов
                console.log(`✅ [API] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
                return response;
            },
            (error) => {
                const apiError = this._normalizeError(error);

                // Глобальная обработка ошибок
                this._handleGlobalError(apiError);

                // Кастомный обработчик ошибок
                if (this._onError) {
                    this._onError(apiError);
                }

                // Логирование ошибок
                console.error('SourceService: API ошибка', apiError);

                return Promise.reject(apiError);
            }
        );
    }

    private _normalizeError(error: any): IApiError {
        return {
            message: error.response?.data?.message || error.message || 'Неизвестная ошибка',
            code: error.response?.data?.code || 'UNKNOWN_ERROR',
            status: error.response?.status || 500,
            details: error.response?.data?.details,
            config: {
                url: error.config?.url,
                method: error.config?.method
            }
        };
    }

    private _handleGlobalError(error: IApiError): void {
        // Обработка 401 ошибки (Unauthorized)
        if (error.status === 401) {
            deleteValueByKey(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
            deleteValueByKey(REFRESH_TOKEN_LOCAL_STORAGE_KEY);

            if (this._onAuthRequired) {
                this._onAuthRequired();
            } else {
                // Дефолтное поведение - диспатч события
                window.dispatchEvent(new CustomEvent('auth-required'));
            }
        }

        // Обработка сетевых ошибок
        if (error.status === 0) {
            console.error('SourceService: сеть недоступна');
        }

        // Обработка 500 ошибок (Server Error)
        if (error.status >= 500) {
            // Можно интегрировать с системой мониторинга
            console.error('SourceService: серверная ошибка', error);
        }
    }

    private _validateId(id: number | string): void {
        if (id == null || id === '' || (typeof id === 'number' && isNaN(id))) {
            throw new Error(`SourceService: невалидный ID: ${id}`);
        }
    }

    protected async _request<TResponse>(
        method: THttpMethod,
        path: string,
        data?: unknown,
        config?: Partial<AxiosRequestConfig>
    ): Promise<TResponse> {
        try {
            const response: AxiosResponse<TResponse> = await this._client.request({
                method,
                url: path,
                data,
                ...config
            });

            return response.data;
        } catch (error) {
            // Ошибки уже обработаны в интерцепторе, просто пробрасываем дальше
            throw error;
        }
    }

    protected _getEntityUrl(id?: number | string): string {
        if (!id) {
            return this._endpoint;
        }

        this._validateId(id);
        return `${this._endpoint}/${id}`;
    }


    private _buildQueryParams(params?: IListParams): Record<string, unknown> {
        if (!params) return {};

        const queryParams: Record<string, unknown> = {};

        // Фильтры
        if (params.filters) {
            Object.assign(queryParams, params.filters);
        }

        // Пагинация
        if (params.navigation) {
            Object.assign(queryParams, {
                page: params.navigation.page,
                limit: params.navigation.limit
            });
        }

        // Сортировка
        if (params.sort?.length) {
            queryParams.sort = params.sort
                .map(sort => `${sort.field}:${sort.order}`)
                .join(',');
        }

        return queryParams;
    }

    private _validatePath(path: string): void {
        if (!path?.trim()) {
            throw new Error('SourceService: путь для вызова не может быть пустым');
        }
    }

    private _validateAndDeduplicateList<T extends IEntityWithId>(list: T[]): T[] {
        if (!Array.isArray(list)) {
            throw new Error('SourceService: ответ должен быть массивом');
        }

        const seenKeys = new Set<string>();
        const deduplicatedList: T[] = [];

        for (const item of list) {
            const key = item[this._keyProperty];

            if (key == null) {
                console.warn('SourceService: элемент списка без ключа', item);
                continue;
            }

            const keyString = String(key);

            if (seenKeys.has(keyString)) {
                throw new Error(`SourceService: дублирующий ключ ${keyString}`);
            }

            seenKeys.add(keyString);
            deduplicatedList.push(item);
        }

        return deduplicatedList;
    }
}

export {
    SourceService
}
