import { type Ref, ref } from 'vue'
import type { ILoginForm, ILoginFormComposable } from '@/interfases/auth.ts'

/**
 * Vue 3 Composition API функция для управления формой авторизации
 *
 * @remarks
 * Этот composable предоставляет реактивное состояние и методы для работы с формой входа в систему.
 * Он управляет данными формы, состоянием процесса аутентификации и выполняет логику авторизации.
 *
 * @example
 * ```typescript
 * // Использование в компоненте Vue
 * const {
 *   loginFormData,
 *   authInProcess,
 *   login
 * } = useLoginForm()
 *
 * // Обработка отправки формы
 * const handleSubmit = async () => {
 *   const success = await login()
 *   if (success) {
 *     // Перенаправление или другие действия при успешной авторизации
 *   }
 * }
 * ```
 *
 * @returns {ILoginFormComposable} Объект с реактивными данными и методами для авторизации
 */
export function useLoginForm(): ILoginFormComposable {
    /**
     * Реактивные данные формы авторизации
     *
     * @remarks
     * Содержит поля для ввода логина и пароля. Инициализируется пустыми значениями.
     *
     * @example
     * ```typescript
     * // Двустороннее связывание с формой
     * <input v-model="loginFormData.login" />
     * <input v-model="loginFormData.password" type="password" />
     * ```
     */
    const loginFormData: Ref<ILoginForm> = ref({
        login: '',
        password: ''
    });

    /**
     * Реактивный флаг, указывающий на выполнение процесса аутентификации
     *
     * @remarks
     * Используется для отображения состояния загрузки в UI (спиннеры, блокировка кнопок и т.д.)
     *
     * @defaultValue false
     *
     * @example
     * ```typescript
     * // Использование в шаблоне
     * <button :disabled="authInProcess">
     *   {{ authInProcess ? 'Вход...' : 'Войти' }}
     * </button>
     * ```
     */
    const authInProcess: Ref<boolean> = ref(false);

    /**
     * Выполняет процесс аутентификации пользователя
     *
     * @remarks
     * Функция имитирует процесс авторизации с помощью setTimeout. В реальном приложении
     * здесь должен быть вызов API endpoint для проверки учетных данных.
     *
     * @returns {Promise<boolean>} Promise, который разрешается в true при успешной авторизации
     *
     * @example
     * ```typescript
     * // Обработка результата авторизации
     * const success = await login()
     * if (success) {
     *   router.push('/dashboard')
     * } else {
     *   showError('Неверные учетные данные')
     * }
     * ```
     *
     * @beta
     * @todo Заменить setTimeout на реальный API вызов с обработкой ошибок
     */
    const login = async (): Promise<boolean> => {
        authInProcess.value = true;

        // Имитация API вызова
        setTimeout(() => {
            authInProcess.value = false;
        }, 1000);

        return true;
    }

    return {
        loginFormData,
        authInProcess,
        login
    }
}
