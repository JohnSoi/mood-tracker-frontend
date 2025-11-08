import { MENU_STORAGE_KEY, useMenuState } from '@/stores/menu.ts'
import { getValueByKey } from '@/utils/localStorage.ts'
import { WIDTH_FOR_COLLAPSE_MENU } from '@/consts'

/**
 * Хук для адаптивного управления состоянием меню
 */
export function useResponsiveMenu() {
    const menuState = useMenuState()

    /**
     * Проверяет и обновляет состояние свертывания меню
     */
    const checkMenuCollapseState = (): void => {
        const isWideScreen = window.innerWidth > WIDTH_FOR_COLLAPSE_MENU

        if (isWideScreen) {
            // На широких экранах используем сохраненное состояние
            const savedState = getValueByKey<boolean>(MENU_STORAGE_KEY, menuState.collapsed)
            if (menuState.collapsed !== savedState) {
                menuState.setCollapsed(savedState)
            }
        } else {
            // На узких экранах принудительно сворачиваем
            if (!menuState.collapsed) {
                menuState.setCollapsed(true)
            }
        }
    }

    /**
     * Обработчик изменения размера окна
     */
    const handleResize = (): void => {
        checkMenuCollapseState()
    }

    /**
     * Инициализирует отслеживание размера экрана
     */
    const initResponsiveMenu = (): void => {
        checkMenuCollapseState()
        window.addEventListener('resize', handleResize)
    }

    /**
     * Очищает слушатели событий
     */
    const cleanup = (): void => {
        window.removeEventListener('resize', handleResize)
    }

    return {
        checkMenuCollapseState,
        initResponsiveMenu,
        cleanup
    }
}
