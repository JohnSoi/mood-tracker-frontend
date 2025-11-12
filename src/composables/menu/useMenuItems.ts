import { ref, type Ref, watch } from 'vue'
import { useAuthState } from '@/stores/auth.ts'
import type { IMenuItem } from '@/interfases'
import type { IMenuItemsComposable } from '@/interfases/menu.ts'

/**
 * Vue 3 Composition API функция для управления элементами меню с учетом авторизации
 *
 * @remarks
 * Этот composable предоставляет реактивный список элементов меню, который автоматически
 * фильтруется в зависимости от статуса аутентификации пользователя. Он отслеживает изменения
 * в состоянии авторизации и динамически обновляет доступные пункты меню.
 *
 * @example
 * ```typescript
 * // Использование в компоненте навигации
 * const initialMenuItems = [
 *   { id: 1, title: 'Главная', path: '/', public: true },
 *   { id: 2, title: 'Профиль', path: '/profile', public: false }
 * ]
 *
 * const { items, updateMenuItems } = useMenuItems(initialMenuItems)
 *
 * // В шаблоне
 * <nav>
 *   <a v-for="item in items" :key="item.id" :href="item.path">
 *     {{ item.title }}
 *   </a>
 * </nav>
 * ```
 *
 * @param initialItems - Начальный массив элементов меню для фильтрации
 * @returns Объект с реактивным списком элементов меню и методом для принудительного обновления
 */
export function useMenuItems(initialItems: IMenuItem[]): IMenuItemsComposable {
    /**
     * Экземпляр хранилища состояния аутентификации
     *
     * @remarks
     * Используется для проверки статуса авторизации пользователя и отслеживания его изменений
     */
    const authState = useAuthState()

    /**
     * Реактивный массив отфильтрованных элементов меню
     *
     * @remarks
     * Содержит только те элементы, которые доступны текущему пользователю
     * на основе его статуса аутентификации и флага `public` каждого элемента
     */
    const items: Ref<IMenuItem[]> = ref([...initialItems])

    /**
     * Фильтрует элементы меню на основе статуса аутентификации пользователя
     *
     * @remarks
     * Возвращает массив элементов, где:
     * - Публичные элементы (`public: true`) доступны всегда
     * - Приватные элементы (`public: false`) доступны только аутентифицированным пользователям
     *
     * @returns {IMenuItem[]} Отфильтрованный массив элементов меню
     *
     * @example
     * ```typescript
     * const visibleItems = filterMenuItems()
     * // Для аутентифицированного пользователя: все элементы
     * // Для гостя: только элементы с public: true
     * ```
     */
    const filterMenuItems = (): IMenuItem[] => {
        return initialItems.filter(menuItem =>
            menuItem.public || authState.userAuthenticate
        )
    }

    /**
     * Обновляет реактивный список элементов меню
     *
     * @remarks
     * Принудительно применяет фильтрацию и обновляет реактивный массив `items`
     * Может быть полезен для ручного обновления при изменении прав пользователя
     */
    const updateMenuItems = (): void => {
        items.value = filterMenuItems()
    }

    /**
     * Наблюдатель за изменением статуса аутентификации пользователя
     *
     * @remarks
     * Автоматически обновляет список элементов меню при изменении
     * значения `userAuthenticate` в хранилище аутентификации
     */
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
