import { ref, onMounted, onUnmounted, type Ref } from "vue";
import { isClient } from "@/utils/environment.ts";
import type { IWindowsSizeComposable } from "@/interfases/base.ts";

/**
 * Vue 3 Composition API функция для отслеживания размеров окна браузера
 *
 * @remarks
 * Этот composable предоставляет реактивные размеры окна браузера и утилиты для работы с breakpoints.
 * Автоматически обновляет размеры при изменении окна и очищает слушатели событий при размонтировании.
 * Поддерживает SSR (Server-Side Rendering) через проверку наличия window объекта.
 *
 * @example
 * ```typescript
 * // Использование в компоненте
 * const { width, height, isWidthGreaterThan } = useWindowSize()
 *
 * // Реактивное отслеживание изменений
 * watch(width, (newWidth) => {
 *   console.log('Ширина окна изменилась:', newWidth)
 * })
 *
 * // Использование в шаблоне
 * <div v-if="isWidthGreaterThan(768)">
 *   Этот контент виден только на широких экранах
 * </div>
 *
 * <div>
 *   Текущий размер: {{ width }} x {{ height }}
 * </div>
 * ```
 *
 * @returns Объект с реактивными размерами окна и утилитными методами
 */
export function useWindowSize(): IWindowsSizeComposable {
    /**
     * Реактивная ссылка на текущую ширину окна браузера в пикселях
     *
     * @remarks
     * Инициализируется текущей шириной окна или 0 при SSR
     * Автоматически обновляется при изменении размера окна
     *
     * @example
     * ```typescript
     * // Отслеживание изменений ширины
     * watch(width, (newWidth) => {
     *   if (newWidth < 768) {
     *     enableMobileLayout()
     *   }
     * })
     *
     * // Использование в computed свойствах
     * const isMobile = computed(() => width.value < 768)
     * ```
     */
    const width: Ref<number> = ref(isClient() ? window.innerWidth : 0);

    /**
     * Реактивная ссылка на текущую высоту окна браузера в пикселях
     *
     * @remarks
     * Инициализируется текущей высотой окна или 0 при SSR
     * Автоматически обновляется при изменении размера окна
     *
     * @example
     * ```typescript
     * // Адаптация интерфейса по высоте
     * const availableHeight = computed(() => height.value - 100)
     *
     * // Скрытие элементов при недостаточной высоте
     * const showFooter = computed(() => height.value > 600)
     * ```
     */
    const height: Ref<number> = ref(isClient() ? window.innerHeight : 0);

    /**
     * Обновляет реактивные размеры окна текущими значениями
     *
     * @remarks
     * Вызывается автоматически при событии resize
     * Может быть вызван вручную для принудительного обновления
     *
     * @example
     * ```typescript
     * // Принудительное обновление после асинхронной операции
     * await loadContent()
     * updateSize() // Обновить размеры после изменения DOM
     *
     * // Обработчик кастомного события
     * window.addEventListener('orientationchange', updateSize)
     * ```
     */
    const updateSize = (): void => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    /**
     * Проверяет, превышает ли текущая ширина окна заданный breakpoint
     *
     * @param breakpoint - Значение breakpoint в пикселях для проверки
     * @returns true если ширина окна больше breakpoint, иначе false
     *
     * @example
     * ```typescript
     * // Определение типа устройства
     * const isDesktop = isWidthGreaterThan(1024)
     * const isTablet = isWidthGreaterThan(768) && !isDesktop
     * const isMobile = !isTablet && !isDesktop
     *
     * // Условный рендеринг
     * <DesktopNav v-if="isWidthGreaterThan(1024)" />
     * <MobileNav v-else />
     * ```
     */
    const isWidthGreaterThan = (breakpoint: number): boolean => {
        return width.value > breakpoint;
    };

    /**
     * Инициализация отслеживания размеров окна
     *
     * @remarks
     * Вызывается автоматически при монтировании компонента
     * Устанавливает слушатель события resize и выполняет первоначальное обновление
     */
    onMounted((): void => {
        if (isClient()) {
            window.addEventListener("resize", updateSize);
            updateSize(); // Инициализация текущих размеров
        }
    });

    /**
     * Очистка ресурсов и удаление слушателей событий
     *
     * @remarks
     * Вызывается автоматически при размонтировании компонента
     * Предотвращает утечки памяти удаляя слушатель события resize
     */
    onUnmounted((): void => {
        if (isClient()) {
            window.removeEventListener("resize", updateSize);
        }
    });

    return {
        width,
        height,
        isWidthGreaterThan,
    };
}
