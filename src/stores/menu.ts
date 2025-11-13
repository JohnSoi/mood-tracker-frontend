import { defineStore } from "pinia";
import { type Ref, ref } from "vue";
import { getValueByKey, setValueByKey } from "@/utils/localStorage.ts";

/**
 * Ключ для хранения состояния меню в localStorage
 * @constant {string}
 * @default 'menuCollapsed'
 */
const MENU_STORAGE_KEY: string = "menuCollapsed";

/**
 * Store для управления состоянием бокового меню
 *
 * Отвечает за свернутое/развернутое состояние навигационного меню
 * с автоматическим сохранением в localStorage.
 *
 * @version 1.0.0
 *
 * @example
 * // Использование в компоненте Vue Composition API
 * import { useMenuState } from '@/stores/menuState';
 *
 * const menuState = useMenuState();
 *
 * // Переключение состояния меню
 * menuState.toggleCollapsed();
 *
 * // Реактивное использование состояния
 * const isCollapsed = computed(() => menuState.collapsed);
 *
 * @example
 * // Использование в template
 * <template>
 *   <div class="sidebar" :class="{ 'sidebar--collapsed': menuState.collapsed }">
 *     <button @click="menuState.toggleCollapsed()">
 *       {{ menuState.collapsed ? '▶' : '◀' }}
 *     </button>
 *     <!-- содержимое меню -->
 *   </div>
 * </template>
 */
const useMenuState = defineStore("menuState", () => {
    /**
     * Реактивная ссылка на состояние свернутости меню
     * @type {Ref<boolean>}
     *
     * @remarks
     * - `true` - меню свернуто (отображаются только иконки)
     * - `false` - меню развернуто (отображаются иконки и текст)
     *
     * Значение автоматически загружается из localStorage при инициализации
     *
     * @example
     * // Подписка на изменения состояния
     * watch(() => menuState.collapsed, (isCollapsed) => {
     *   console.log('Состояние меню изменилось:', isCollapsed);
     * });
     */
    const collapsed: Ref<boolean> = ref<boolean>(getValueByKey<boolean>(MENU_STORAGE_KEY, true));

    /**
     * Переключает состояние свернутости меню
     *
     * @function toggleCollapsed
     * @memberof useMenuState
     *
     * @remarks
     * При переключении автоматически сохраняет новое состояние в localStorage
     * для сохранения выбора пользователя между сессиями.
     *
     * @example
     * // Программное переключение
     * function handleMenuToggle() {
     *   menuState.toggleCollapsed();
     * }
     *
     * @example
     * // Обработка клика по кнопке
     * <button @click="menuState.toggleCollapsed" class="menu-toggle">
     *   <span v-if="menuState.collapsed">📖</span>
     *   <span v-else>📕</span>
     * </button>
     *
     * @throws {Error} Если произошла ошибка при сохранении в localStorage
     *
     * @returns {void}
     */
    function toggleCollapsed(): void {
        collapsed.value = !collapsed.value;
        setValueByKey<boolean>(MENU_STORAGE_KEY, collapsed.value);
    }

    function setCollapsed(value: boolean): void {
        collapsed.value = value;
    }

    return { collapsed, toggleCollapsed, setCollapsed };
});

export { useMenuState, MENU_STORAGE_KEY };
