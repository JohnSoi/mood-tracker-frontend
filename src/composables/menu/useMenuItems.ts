import { ref, type Ref, watch } from 'vue'
import { useAuthState } from '@/stores/auth.ts'
import type { IMenuItem } from '@/interfases'

/**
 * Хук для работы с элементами меню и их фильтрацией
 */
export function useMenuItems(initialItems: IMenuItem[]) {
    const authState = useAuthState()
    const items: Ref<IMenuItem[]> = ref([...initialItems])

    /**
     * Фильтрует элементы меню на основе аутентификации
     */
    const filterMenuItems = (): IMenuItem[] => {
        return initialItems.filter(menuItem =>
            menuItem.public || authState.userAuthenticate
        )
    }

    /**
     * Обновляет элементы меню
     */
    const updateMenuItems = (): void => {
        items.value = filterMenuItems()
    }

    // Автоматически обновляем меню при изменении аутентификации
    watch(
        () => authState.userAuthenticate,
        () => {
            updateMenuItems()
        }
    )

    return {
        items,
        updateMenuItems
    }
}
