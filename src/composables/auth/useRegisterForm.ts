import { computed, type ComputedRef, type Ref, ref } from "vue";
import type { IStepFormData } from "@/interfases/form";
import {
    BASE_REGISTER_DATA,
    MAX_REGISTER_STEP,
    MAX_REGISTER_YEAR,
    MIN_REGISTER_STEP,
    MIN_REGISTER_YEAR,
    REGISTER_STEP_1_FORM_DATA,
    REGISTER_STEP_2_FORM_DATA,
    REGISTER_STEP_3_FORM_DATA,
} from "@/consts/auth.ts";
import type { IRegisterFormComposable, IRegisterFormData, TRegisterStepKey } from "@/interfases/auth.ts";
import { getSubtractYearFromCurrentDate } from "@/utils/date.ts";
import type { SourceService } from "@/services/source.ts";
import { ServiceFactory } from "@/services/serviceFactory.ts";

/**
 * Vue 3 Composition API функция для управления многошаговой формой регистрации
 *
 * @remarks
 * Этот composable предоставляет полный набор инструментов для работы с многошаговой формой,
 * включая управление состоянием, навигацию между шагами, валидацию и обработку данных.
 *
 * @example
 * ```typescript
 * // Использование в компоненте Vue
 * const {
 *   registerFormData,
 *   currentStep,
 *   nextStep,
 *   prevStep,
 *   progressPercentage,
 *   stepFormData
 * } = useRegisterForm()
 * ```
 *
 * @returns {IRegisterFormComposable} Объект с реактивными данными и методами управления формой
 */
export function useRegisterForm(): IRegisterFormComposable {
    /**
     * Максимальная допустимая дата рождения (минимальный возраст пользователя)
     *
     * @remarks
     * Рассчитывается как текущая дата минус MIN_REGISTER_YEAR лет
     */
    const maxBirthDayValue: Date = getSubtractYearFromCurrentDate(MIN_REGISTER_YEAR);

    /**
     * Минимальная допустимая дата рождения (максимальный возраст пользователя)
     *
     * @remarks
     * Рассчитывается как текущая дата минус MAX_REGISTER_YEAR лет
     */
    const minBirthdayValue: Date = getSubtractYearFromCurrentDate(MAX_REGISTER_YEAR);

    /**
     * Реактивные данные формы регистрации
     *
     * @remarks
     * Объединяет базовые данные из BASE_REGISTER_DATA с начальным значением даты рождения
     */
    const registerFormData: Ref<IRegisterFormData> = ref({
        ...BASE_REGISTER_DATA,
        date_birthday: minBirthdayValue,
    })

    /**
     * Источник для запросов аутентификации
     *
     * @remarks
     * Через фабрику сервисов создает точку входа запросов аутентификации
     */
    const authService: SourceService = ServiceFactory.createAuthService();

    /**
     * Выполняет процесс регистрации пользователя
     * @param formValue - Полные данные формы для регистрации
     * @returns Promise, который разрешается после завершения регистрации
     *
     * @example
     * ```typescript
     * await register(formData)
     * ```
     *
     * @beta
     * @todo Заменить setTimeout на реальный API вызов
     */
    const register = async (formValue: IRegisterFormData): Promise<void> => {
        registerInProcess.value = true;
        await authService.call<IRegisterFormData, {AccessToken: string, RefreshToken: string}>(
            'POST',
            '/register',
            formValue,
        );
        registerInProcess.value = false;
    };

    /**
     * Обрабатывает отправку данных первого шага формы
     * @param values - Данные, введенные на первом шаге формы
     * @returns Promise, который разрешается после обработки данных и перехода к следующему шагу
     */
    const handleStep1Submit = (values: Partial<IRegisterFormData>): void => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values,
        };
        nextStep();
    };

    /**
     * Обрабатывает отправку данных второго шага формы
     * @param values - Данные, введенные на втором шаге формы
     * @returns Promise, который разрешается после обработки данных и перехода к следующему шагу
     */
    const handleStep2Submit = (values: Partial<IRegisterFormData>): void => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values,
        };
        nextStep();
    };

    /**
     * Обрабатывает возврат на предыдущий шаг со второго шага формы
     *
     * @returns Promise, который разрешается после возврата на предыдущий шаг
     */
    const handleStep2Prev = (): void => {
        prevStep();
    };

    /**
     * Обрабатывает отправку данных третьего шага формы и инициирует процесс регистрации
     *
     * @param values - Данные, введенные на третьем шаге формы
     * @returns Promise, который разрешается после обработки данных и выполнения регистрации
     */
    const handleStep3Submit = async (values: Partial<IRegisterFormData>): Promise<void> => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values,
        };
        await register(registerFormData.value);
    };

    /**
     * Конфигурация данных для каждого шага формы
     *
     * @remarks
     * Объект, содержащий конфигурацию для всех трех шагов формы.
     * Каждый шаг использует соответствующую фабричную функцию для создания своей конфигурации.
     */
    const stepFormData: { [key in TRegisterStepKey]: IStepFormData } = {
        /** Конфигурация первого шага формы с валидацией даты рождения */
        1: REGISTER_STEP_1_FORM_DATA(minBirthdayValue, maxBirthDayValue, handleStep1Submit),

        /** Конфигурация второго шага формы с обработчиками отправки и возврата */
        2: REGISTER_STEP_2_FORM_DATA(handleStep2Prev, handleStep2Submit),

        /** Конфигурация третьего шага формы с обработчиком финальной отправки */
        3: REGISTER_STEP_3_FORM_DATA(handleStep3Submit),
    };

    /**
     * Реактивный флаг, указывающий на выполнение процесса регистрации
     *
     * @defaultValue false
     */
    const registerInProcess: Ref<boolean> = ref(false);

    /**
     * Реактивная ссылка на текущий активный шаг формы
     *
     * @defaultValue 1
     */
    const currentStep: Ref<TRegisterStepKey> = ref(1);

    /**
     * Вычисляемое свойство, возвращающее процент заполнения формы в виде строки
     *
     * @remarks
     * Рассчитывается как отношение текущего шага к максимальному количеству шагов,
     * преобразованное в процентное значение и отформатированное в строку без десятичных знаков.
     *
     * @example
     * ```typescript
     * progressPercentage.value // "33", "66", "100"
     * ```
     */
    const progressPercentage: ComputedRef<number> = computed(() =>
        Math.round((currentStep.value / MAX_REGISTER_STEP) * 100),
    );

    /**
     * Переходит к следующему шагу формы, если это возможно
     *
     * @returns Promise, который разрешается после выполнения перехода
     *
     * @example
     * ```typescript
     * nextStep()
     * ```
     */
    const nextStep = (): void => {
        if (currentStep.value < MAX_REGISTER_STEP) {
            currentStep.value++;
        }
    };

    /**
     * Возвращает к предыдущему шагу формы, если это возможно
     *
     * @example
     * ```typescript
     * prevStep()
     * ```
     */
    const prevStep = (): void => {
        if (currentStep.value > MIN_REGISTER_STEP) {
            currentStep.value--;
        }
    };

    return {
        registerFormData,
        minBirthdayValue,
        maxBirthDayValue,
        registerInProcess,
        register,
        nextStep,
        prevStep,
        currentStep,
        stepFormData,
        progressPercentage,
    };
}
