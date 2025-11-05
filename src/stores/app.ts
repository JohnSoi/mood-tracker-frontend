import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { getValueByKey, setValueByKey } from '@/utils/localStorage.ts'

/**
 * Ключ для хранения темы в localStorage
 * @constant {string}
 * @default 'appTheme'
 * @private
 */
const APP_THEME_STORAGE_KEY: string = 'appTheme';

/**
 * Доступные темы приложения
 * @variation light - светлая
 * @variation dark - темная
 */
type TAppTheme = "light" | "dark";

/**
 * Store для управления глобальным состоянием приложения
 *
 * @version 1.0.0
 * @author Ваше Имя
 *
 * @example
 * // Использование в компоненте Vue
 * import { useAppState } from '@/stores/appState';
 *
 * const appState = useAppState();
 *
 * // Переключение темы
 * appState.toggleAppTheme();
 *
 * // Проверка активной темы
 * if (appState.darkThemeEnable()) {
 *   console.log('Темная тема активна');
 * }
 *
 * @example
 * // Реактивное использование в template
 * <template>
 *   <div :class="{ 'dark-theme': appState.darkThemeEnable() }">
 *     <button @click="appState.toggleAppTheme()">
 *       {{ appState.darkThemeEnable() ? '☀️' : '🌙' }}
 *     </button>
 *   </div>
 * </template>
 */
const useAppState = defineStore('appState', () => {
    /**
     * Текущая тема приложения
     * @type {Ref<TAppTheme>}
     * @private
     */
    const appTheme: Ref<TAppTheme> = ref(getValueByKey<TAppTheme>(APP_THEME_STORAGE_KEY, "light"));

    /**
     * Переключает тему приложения между светлой и темной
     *
     * @function toggleAppTheme
     * @memberof useAppState
     *
     * @example
     * // Переключение темы по клику кнопки
     * <button @click="appState.toggleAppTheme()">
     *   Сменить тему
     * </button>
     *
     * @example
     * // Программное переключение темы
     * function handleThemeChange() {
     *   appState.toggleAppTheme();
     *   // Тема автоматически сохраняется в localStorage
     * }
     *
     * @returns {void}
     */
    function toggleAppTheme(): void {
        appTheme.value = appTheme.value === "light" ? "dark" : "light";
        setValueByKey<TAppTheme>(APP_THEME_STORAGE_KEY, appTheme.value);
    }

    /**
     * Проверяет, активна ли темная тема
     *
     * @function darkThemeEnable
     * @memberof useAppState
     *
     * @example
     * // Условный рендеринг в template
     * <template>
     *   <div v-if="appState.darkThemeEnable()">
     *     Показываем только в темной теме
     *   </div>
     * </template>
     *
     * @example
     * // Использование в computed свойствах
     * import { computed } from 'vue';
     *
     * const themeClass = computed(() => ({
     *   'dark-theme': appState.darkThemeEnable(),
     *   'light-theme': !appState.darkThemeEnable()
     * }));
     *
     * @returns {boolean} true если активна темная тема, false если светлая
     */
    function darkThemeEnable(): boolean {
        return appTheme.value === "dark";
    }

    return {
        toggleAppTheme,
        darkThemeEnable,
    }
});

export { useAppState };
