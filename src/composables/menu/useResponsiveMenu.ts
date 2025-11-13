import { MENU_STORAGE_KEY, useMenuState } from "@/stores/menu.ts";
import { getValueByKey } from "@/utils/localStorage.ts";
import { WIDTH_FOR_COLLAPSE_MENU } from "@/consts";
import type { IResponsibleMenuComposable } from "@/interfases/menu.ts";
import { DEBOUNCE_RESIZE_HANDLER_MS } from "@/consts/menu.ts";
import { debounce } from "@/utils/performance.ts";
import { isClient } from "@/utils/environment.ts";

/**
 * Vue 3 Composition API функция для управления адаптивным поведением меню
 *
 * @remarks
 * Этот composable предоставляет функционал для автоматического сворачивания/разворачивания
 * меню в зависимости от ширины экрана. Он интегрируется с хранилищем состояния меню и
 * localStorage для сохранения пользовательских предпочтений.
 *
 * @example
 * ```typescript
 * // Использование в компоненте макета
 * const { initResponsiveMenu, cleanup } = useResponsiveMenu()
 *
 * onMounted(() => {
 *   initResponsiveMenu()
 * })
 *
 * onUnmounted(() => {
 *   cleanup()
 * })
 *
 * // Или в компоненте с setup
 * const { checkMenuCollapseState } = useResponsiveMenu()
 *
 * // Принудительная проверка при изменении layout
 * const onLayoutChange = () => {
 *   checkMenuCollapseState()
 * }
 * ```
 *
 * @returns Объект с методами для управления адаптивным меню
 */
export function useResponsiveMenu(): IResponsibleMenuComposable {
    /**
     * Состояние меню из хранилища Pinia
     *
     * @remarks
     * Содержит текущее состояние свернутости меню и функцию для его изменения
     */
    const { collapsed, setCollapsed } = useMenuState();

    /**
     * Проверяет и обновляет состояние свернутости меню на основе ширины экрана
     *
     * @remarks
     * Логика работы:
     * - На широких экранах (> WIDTH_FOR_COLLAPSE_MENU): восстанавливает состояние из localStorage
     * - На узких экранах (<= WIDTH_FOR_COLLAPSE_MENU): принудительно сворачивает меню
     *
     * @example
     * ```typescript
     * // При изменении ориентации устройства
     * window.addEventListener('orientationchange', () => {
     *   checkMenuCollapseState()
     * })
     * ```
     */
    const checkMenuCollapseState = (): void => {
        if (!isClient()) return;

        const isWideScreen = window.innerWidth > WIDTH_FOR_COLLAPSE_MENU;

        if (isWideScreen) {
            // На широких экранах: восстанавливаем сохраненное состояние
            const savedState = getValueByKey<boolean>(MENU_STORAGE_KEY, collapsed);
            if (collapsed !== savedState) {
                setCollapsed(savedState);
            }
        } else {
            // На узких экранах: принудительно сворачиваем меню
            if (!collapsed) {
                setCollapsed(true);
            }
        }
    };

    /**
     * Обработчик события изменения размера окна
     *
     * @remarks
     * Вызывается при каждом изменении размера окна браузера
     * Делегирует логику методу checkMenuCollapseState
     *
     * @private
     */
    const handleResize = debounce((): void => {
        checkMenuCollapseState();
    }, DEBOUNCE_RESIZE_HANDLER_MS);

    /**
     * Инициализирует систему адаптивного меню
     *
     * @remarks
     * Выполняет:
     * 1. Первоначальную проверку состояния меню
     * 2. Устанавливает слушатель события resize
     *
     * @example
     * ```typescript
     * // В хуке mounted компонента
     * onMounted(() => {
     *   initResponsiveMenu()
     * })
     * ```
     */
    const initResponsiveMenu = (): void => {
        if (!isClient()) return;

        checkMenuCollapseState();
        window.addEventListener("resize", handleResize);
    };

    /**
     * Очищает ресурсы и удаляет слушатели событий
     *
     * @remarks
     * Должен вызываться в хуке onUnmounted для предотвращения утечек памяти
     *
     * @example
     * ```typescript
     * // В хуке unmounted компонента
     * onUnmounted(() => {
     *   cleanup()
     * })
     * ```
     */
    const cleanup = (): void => {
        window.removeEventListener("resize", handleResize);
    };

    return {
        checkMenuCollapseState,
        initResponsiveMenu,
        cleanup,
    };
}
