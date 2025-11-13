import { computed, type Ref, ref } from "vue";
import type { IBaseFormComposable, IFormBtnConfig, IFormData, IFormItem } from "@/interfases/form";
import { EMAIL_REG_EXP } from "@/consts/form.ts";
import { EmailValidator } from "@/validators/email.ts";

/**
 * Vue 3 Composition API функция для управления базовой формой с валидацией
 *
 * @remarks
 * Этот composable предоставляет полный набор инструментов для работы с формами:
 * - Управление значениями полей формы
 * - Валидация полей по различным правилам
 * - Обработка ошибок валидации
 * - Управление состоянием загрузки кнопок
 * - Интеграция с родительским компонентом через emits
 *
 * @example
 * ```typescript
 * // Использование в компоненте формы
 * const props = defineProps<{
 *   formData: IFormData
 * }>()
 *
 * const emit = defineEmits<{
 *   stepErrorCheck: []
 *   stepEndCheck: []
 * }>()
 *
 * const { values, btnIsLoading, fieldErrors, validateAndNext } = useBaseForm(props.formData, emit)
 *
 * // В шаблоне
 * <form @submit.prevent="validateAndNext(submitButtonConfig)">
 *   <input v-model="values.email" />
 *   <div v-if="fieldErrors.email">{{ fieldErrors.email[0] }}</div>
 *   <button :disabled="btnIsLoading.submit">
 *     {{ btnIsLoading.submit ? 'Загрузка...' : 'Отправить' }}
 *   </button>
 * </form>
 * ```
 *
 * @param props - Конфигурация формы (поля, кнопки)
 * @param emits - Функция для emitting событий в родительский компонент
 * @returns Объект с реактивными данными формы и методами управления
 */
export const useBaseForm = (
    props: IFormData,
    emits: (event: "stepErrorCheck" | "stepEndCheck", ...args: unknown[]) => void
): IBaseFormComposable => {
    /**
     * Объект значений полей формы
     *
     * @remarks
     * Ключи - идентификаторы полей, значения - текущие данные полей
     * Инициализируется значениями по умолчанию из конфигурации полей
     *
     * @example
     * ```typescript
     * // Доступ к значению поля
     * const email = values.email
     *
     * // Установка значения (в компоненте через v-model)
     * values.email = 'user@example.com'
     * ```
     */
    const values: { [key: string]: string | Date } = {};

    /**
     * Реактивный объект ошибок валидации полей
     *
     * @remarks
     * Ключи - идентификаторы полей, значения - массивы строк с ошибками
     * Пустой массив означает отсутствие ошибок для данного поля
     *
     * @example
     * ```typescript
     * // Проверка наличия ошибок для поля
     * if (fieldErrors.email?.length > 0) {
     *   console.log('Ошибки email:', fieldErrors.email)
     * }
     * ```
     */
    const fieldErrors: Ref<Record<string, string[]>> = ref<Record<string, string[]>>({});

    /**
     * Реактивный объект состояний загрузки кнопок
     *
     * @remarks
     * Ключи - идентификаторы кнопок, значения - флаги загрузки
     * Используется для блокировки кнопок во время выполнения операций
     *
     * @example
     * ```typescript
     * // Блокировка кнопки отправки
     * <button :disabled="btnIsLoading.submit">Отправить</button>
     * ```
     */
    const btnIsLoading: Ref<Record<string, boolean>> = ref<Record<string, boolean>>({});

    /**
     * Вычисляемое свойство наличия ошибок в форме
     *
     * @remarks
     * Возвращает true, если хотя бы одно поле имеет ошибки валидации
     *
     * @example
     * ```typescript
     * // Блокировка кнопки при наличии ошибок
     * <button :disabled="hasErrors">Отправить</button>
     * ```
     */
    const hasErrors = computed(() => Object.values(fieldErrors.value).some((errors) => errors.length > 0));

    // Инициализация значений полей по умолчанию
    props.items.forEach((item) => {
        values[item.id] = item.defaultValue || "";
    });

    // Инициализация состояний загрузки кнопок
    props.buttons.forEach((button: IFormBtnConfig) => {
        btnIsLoading.value[button.id] = false;
    });

    /**
     * Валидирует отдельное поле формы по заданным правилам
     *
     * @param field - Конфигурация поля для валидации
     * @returns Массив строк с ошибками валидации (пустой массив если ошибок нет)
     *
     * @remarks
     * Выполняет следующие проверки:
     * - Обязательность заполнения (required)
     * - Минимальная длина (minLength)
     * - Максимальная длина (maxLength)
     * - Кастомная валидация (validation function)
     *
     * @example
     * ```typescript
     * const emailField = props.items.find(item => item.id === 'email')
     * if (emailField) {
     *   const errors = validateField(emailField)
     *   if (errors.length > 0) {
     *     fieldErrors.value.email = errors
     *   }
     * }
     * ```
     */
    const validateField = (field: IFormItem): string[] => {
        let errors: string[] = [];
        let fieldValue: string | Date = values[field.id] as string | Date;

        // Тримминг строковых значений
        if (typeof fieldValue === "string") {
            fieldValue = fieldValue.trim();
        }

        // Проверка обязательности заполнения
        if (field.required && !fieldValue) {
            errors.push(`Поле "${field.label}" обязательно для заполнения`);
            return errors;
        }

        // Проверка минимальной длины (только для строк)
        if (fieldValue && typeof fieldValue === "string" && field.minLength && fieldValue.length < field.minLength) {
            errors.push(`Поле "${field.label}" должно быть не меньше ${field.minLength} символов`);
        }

        // Проверка максимальной длины (только для строк)
        if (fieldValue && typeof fieldValue === "string" && field.maxLength && fieldValue.length > field.maxLength) {
            errors.push(`Поле "${field.label}" должно быть не более ${field.maxLength} символов`);
        }

        if (field.type === "email" && fieldValue && typeof fieldValue === "string" && EmailValidator.isValid(fieldValue)) {
            errors.push("Некорректный формат email");
        }

        // Валидация даты
        if (fieldValue instanceof Date && field.minDate && fieldValue < field.minDate) {
            errors.push(`Дата должна быть не раньше ${field.minDate.toLocaleDateString()}`);
        }

        // Кастомная валидация
        if (field.validation) {
            const customErrors: string[] | null = field.validation(fieldValue, values);

            if (customErrors && customErrors.length > 0) {
                errors = [...errors, ...customErrors];
            }
        }

        // Сохранение обработанного значения
        values[field.id] = fieldValue;

        return errors;
    };

    /**
     * Валидирует всю форму и обновляет объект ошибок
     *
     * @returns true если форма валидна, false если есть ошибки
     *
     * @remarks
     * Вызывает событие 'stepErrorCheck' после завершения валидации
     *
     * @example
     * ```typescript
     * const isValid = validateForm()
     * if (isValid) {
     *   // Отправка формы
     * } else {
     *   // Показать ошибки
     * }
     * ```
     */
    const validateForm = (): boolean => {
        // Сброс предыдущих ошибок
        fieldErrors.value = {};

        // Валидация всех полей
        props.items.forEach((item: IFormItem) => {
            const errors = validateField(item);

            if (errors.length) {
                fieldErrors.value[item.id] = errors;
            }
        });

        if (hasErrors.value) {
            // Уведомление родительского компонента о наличии ошибок
            emits("stepErrorCheck");
        }

        return !hasErrors.value;
    };

    /**
     * Выполняет валидацию формы и запускает callback кнопки
     *
     * @param buttonConfig - Конфигурация кнопки, вызвавшей валидацию
     * @returns Promise, который разрешается после завершения операции
     *
     * @remarks
     * Автоматически управляет состоянием загрузки кнопки
     * Вызывает события 'stepEndCheck' при успешной валидации
     * Поддерживает пропуск валидации через skipValidate
     *
     * @example
     * ```typescript
     * // Обработчик клика по кнопке
     * const onSubmit = () => {
     *   validateAndNext(submitButtonConfig)
     * }
     * ```
     */
    const validateAndNext = async (buttonConfig: IFormBtnConfig): Promise<void> => {
        // Установка состояния загрузки
        btnIsLoading.value[buttonConfig.id] = true;

        try {
            // Пропуск валидации или выполнение валидации
            if (buttonConfig.skipValidate || validateForm()) {
                // Уведомление об успешной проверке шага
                emits("stepEndCheck");

                // Вызов callback функции кнопки
                await buttonConfig.callback(values);
            }

            // Дополнительное уведомление при пропуске валидации
            if (buttonConfig.skipValidate) {
                emits("stepEndCheck");
            }
        } finally {
            // Сброс состояния загрузки независимо от результата
            btnIsLoading.value[buttonConfig.id] = false;
        }
    };

    return {
        values,
        btnIsLoading,
        fieldErrors,
        validateAndNext
    };
};
