import { SourceService } from "./source";
import type { IApiError, ISourceServiceOptions } from "@/interfases/sourceService";

/**
 * Фабрика для создания сервисов данных
 */
class ServiceFactory {
    /**
     * Создать сервис для работы с сущностью
     */
    static createEntityService<T extends SourceService>(endpoint: string, options?: Partial<ISourceServiceOptions>): T {
        const defaultOptions: ISourceServiceOptions = {
            contract: endpoint,
            ...options,
        };

        return new SourceService(defaultOptions) as T;
    }

    /**
     * Создать сервис аутентификации
     */
    static createAuthService(options?: Partial<ISourceServiceOptions>): SourceService {
        return this.createEntityService("/auth", {
            onError: (error: IApiError): boolean => {
                console.error("Auth error:", error);
                return false;
            },
            ...options,
        });
    }
}

export { ServiceFactory };
