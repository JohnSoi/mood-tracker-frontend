import { APP_NAME } from "@/consts";

/**
 * Сервис для управления мета-данными страницы
 */
class MetaService {
    /**
     * Устанавливает заголовок страницы
     */
    static setTitle(pageTitle?: string): void {
        const title = pageTitle
            ? `${pageTitle} | ${APP_NAME}`
            : APP_NAME;

        document.title = title;

        // Обновление meta-тегов для SEO
        this.updateMetaTag('og:title', title);
        this.updateMetaTag('twitter:title', title);
    }

    /**
     * Обновляет значение meta-тега
     */
    private static updateMetaTag(property: string, content: string): void {
        let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;

        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            document.head.appendChild(metaTag);
        }

        metaTag.content = content;
    }

    /**
     * Устанавливает описание страницы
     */
    static setDescription(description: string): void {
        this.updateMetaTag('description', description);
        this.updateMetaTag('og:description', description);
        this.updateMetaTag('twitter:description', description);
    }
}

export { MetaService };
