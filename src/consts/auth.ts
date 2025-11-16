import type { IRegisterFormData } from "@/interfases/auth";
import type { IStepFormData, TFormBtnCallback } from "@/interfases/form";

/**
 * Минимальный возраст пользователя для регистрации в годах
 *
 * @constant
 * @type {number}
 * @default 14
 *
 * @remarks
 * Используется для расчета максимальной допустимой даты рождения.
 * Пользователь должен быть не младше этого возраста.
 *
 * @example
 * ```typescript
 * // Расчет максимальной даты рождения (самый ранний возраст)
 * const maxBirthDate = new Date(currentDate.getFullYear() - MIN_REGISTER_YEAR, currentDate.getMonth(), currentDate.getDate())
 * ```
 */
const MIN_REGISTER_YEAR: number = 14;

/**
 * Максимальный возраст пользователя для регистрации в годах
 *
 * @constant
 * @type {number}
 * @default 80
 *
 * @remarks
 * Используется для расчета минимальной допустимой даты рождения.
 * Пользователь должен быть не старше этого возраста.
 *
 * @example
 * ```typescript
 * // Расчет минимальной даты рождения (самый поздний возраст)
 * const minBirthDate = new Date(currentDate.getFullYear() - MAX_REGISTER_YEAR, currentDate.getMonth(), currentDate.getDate())
 * ```
 */
const MAX_REGISTER_YEAR: number = 80;

/**
 * Базовые начальные данные для формы регистрации
 *
 * @constant
 * @type {IRegisterFormData}
 *
 * @remarks
 * Содержит начальные значения для всех полей формы регистрации.
 * Используется для инициализации реактивного состояния формы.
 *
 * @example
 * ```typescript
 * // Инициализация формы регистрации
 * const registerFormData = ref({ ...BASE_REGISTER_DATA })
 *
 * // Сброс формы к начальным значениям
 * Object.assign(registerFormData.value, BASE_REGISTER_DATA)
 * ```
 */
const BASE_REGISTER_DATA: IRegisterFormData = {
    date_birthday: new Date(),
    name: "",
    surname: "",
    patronymic: null,
    login: "",
    password: "",
    password_confirmation: "",
    default_post_visible: "all",
    default_profile_visible: "all",
};

/**
 * Фабричная функция для создания конфигурации первого шага регистрации
 *
 * @param minBirthdayValue - Минимальная допустимая дата рождения
 * @param maxBirthDayValue - Максимальная допустимая дата рождения
 * @param callback - Функция обратного вызова для кнопки "Далее"
 * @returns {IStepFormData} Конфигурация первого шага формы регистрации
 *
 * @remarks
 * Первый шаг содержит персональные данные пользователя:
 * - Имя, фамилия, отчество
 * - Дата рождения с валидацией по возрасту
 *
 * @example
 * ```typescript
 * const step1Data = REGISTER_STEP_1_FORM_DATA(
 *   minBirthDate,
 *   maxBirthDate,
 *   handleStep1Submit
 * )
 * ```
 */
const REGISTER_STEP_1_FORM_DATA = (
    minBirthdayValue: Date,
    maxBirthDayValue: Date,
    callback: TFormBtnCallback,
): IStepFormData => {
    return {
        title: "О себе",
        items: [
            {
                id: "name",
                label: "Имя",
                placeholder: "Введите Ваше имя",
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-user",
                type: "text",
            },
            {
                id: "surname",
                label: "Фамилия",
                placeholder: "Введите Вашу фамилию",
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-user",
                type: "text",
            },
            {
                id: "patronymic",
                label: "Отчество",
                placeholder: "Введите Ваше отчество",
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-user",
                type: "text",
            },
            {
                id: "date_birthday",
                label: "Дата рождения",
                placeholder: "Введите Вашу дату рождения",
                required: true,
                icon: "fa fa-calendar",
                type: "date",
                defaultValue: maxBirthDayValue,
                minDate: minBirthdayValue,
                maxDate: maxBirthDayValue,
            },
        ],
        buttons: [
            {
                id: "next",
                label: "Далее",
                icon: "fa fa-arrow-right",
                callback,
            },
        ],
    };
};

/**
 * Фабричная функция для создания конфигурации второго шага регистрации
 *
 * @param prevCallback - Функция обратного вызова для кнопки "Назад"
 * @param nextCallback - Функция обратного вызова для кнопки "Далее"
 * @returns {IStepFormData} Конфигурация второго шага формы регистрации
 *
 * @remarks
 * Второй шаг содержит данные для аутентификации:
 * - Логин
 * - Пароль с подтверждением и кастомной валидацией
 * - Кнопки навигации (Назад/Далее)
 *
 * @example
 * ```typescript
 * const step2Data = REGISTER_STEP_2_FORM_DATA(
 *   handleStep2Back,
 *   handleStep2Submit
 * )
 * ```
 */
const REGISTER_STEP_2_FORM_DATA = (
    prevCallback: TFormBtnCallback,
    nextCallback: TFormBtnCallback
): IStepFormData => {
    return {
        title: "Вход",
        items: [
            {
                id: "login",
                label: "Логин",
                placeholder: "Введите Ваш логин",
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-user",
                type: "text",
            },
            {
                id: "password",
                label: "Пароль",
                placeholder: "Введите Ваше пароль",
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-key",
                type: "password",
            },
            {
                id: "password_confirmation",
                label: "Повторите пароль",
                placeholder: "Повторите пароль для проверки",
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: "fa fa-key",
                type: "password",
                /**
                 * Кастомная валидация для подтверждения пароля
                 * @param value - Значение поля подтверждения пароля
                 * @param values - Все значения формы
                 * @returns Массив ошибок или null если ошибок нет
                 */
                validation: (value: string | Date, values: { [key: string]: string | Date }): string[] | null => {
                    const errors: string[] = [];

                    if (value != values.password) {
                        errors.push("Введенные пароли не совпадают");
                    }

                    return errors.length ? errors : null;
                },
            },
        ],
        buttons: [
            {
                id: "back",
                label: "Назад",
                icon: "fa fa-arrow-left",
                skipValidate: true, // Пропускает валидацию при нажатии
                style: "secondary",
                callback: prevCallback,
            },
            {
                id: "next",
                label: "Далее",
                icon: "fa fa-arrow-right",
                callback: nextCallback,
            },
        ],
    };
};

/**
 * Фабричная функция для создания конфигурации третьего шага регистрации
 *
 * @param nextCallback - Функция обратного вызова для кнопки "Войти"
 * @returns {IStepFormData} Конфигурация третьего шага формы регистрации
 *
 * @remarks
 * Третий шаг содержит настройки приватности пользователя:
 * - Видимость постов
 * - Видимость профиля
 * - Финальная кнопка завершения регистрации
 *
 * @example
 * ```typescript
 * const step3Data = REGISTER_STEP_3_FORM_DATA(handleRegistrationComplete)
 * ```
 */
const REGISTER_STEP_3_FORM_DATA = (nextCallback: TFormBtnCallback): IStepFormData => {
    return {
        title: "Приватность",
        items: [
            {
                id: "default_post_visible",
                label: "Кто видит мои посты: ",
                type: "select",
                defaultValue: "all",
                selectValues: [
                    {
                        name: "Все",
                        value: "all",
                    },
                    {
                        name: "Только друзья",
                        value: "friends",
                    },
                    {
                        name: "Только я",
                        value: "onlyMe",
                    },
                ],
            },
            {
                id: "default_profile_visible",
                label: "Кто видит мой профиль: ",
                type: "select",
                defaultValue: "all",
                selectValues: [
                    {
                        name: "Все",
                        value: "all",
                    },
                    {
                        name: "Только друзья",
                        value: "friends",
                    },
                    {
                        name: "Только я",
                        value: "onlyMe",
                    },
                ],
            },
        ],
        buttons: [
            {
                id: "next",
                label: "Войти",
                icon: "fa fa-unlock",
                callback: nextCallback,
            },
        ],
    };
};

/**
 * Максимальное количество шагов в форме регистрации
 *
 * @constant
 * @type {number}
 * @default 3
 *
 * @remarks
 * Используется для валидации навигации между шагами
 * и расчета прогресса заполнения формы.
 *
 * @example
 * ```typescript
 * // Проверка возможности перехода к следующему шагу
 * if (currentStep < MAX_REGISTER_STEP) {
 *   currentStep++
 * }
 *
 * // Расчет прогресса
 * const progress = (currentStep / MAX_REGISTER_STEP) * 100
 * ```
 */
const MAX_REGISTER_STEP: number = 3;

/**
 * Минимальный номер шага в форме регистрации
 *
 * @constant
 * @type {number}
 * @default 1
 *
 * @remarks
 * Используется для валидации навигации между шагами
 * и предотвращения перехода к несуществующим шагам.
 *
 * @example
 * ```typescript
 * // Проверка возможности возврата к предыдущему шагу
 * if (currentStep > MIN_REGISTER_STEP) {
 *   currentStep--
 * }
 * ```
 */
const MIN_REGISTER_STEP: number = 1;

/**
 * Имя поля в локальном хранилище, котором лежит токен доступа
 *
 * @constant
 * @type {string}
 * @default "access_token"
 *
 * @remarks
 * Используется для работы с токеном доступа в локальном хранилище
 *
 * @example
 * ```typescript
 * // Получить токен доступа из локального хранилища
 * getValueByKey(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
 * ```
 */
const ACCESS_TOKEN_LOCAL_STORAGE_KEY: string = "access_token";

/**
 * Имя поля в локальном хранилище, котором лежит токен обновления
 *
 * @constant
 * @type {string}
 * @default "access_token"
 *
 * @remarks
 * Используется для работы с токеном обновления в локальном хранилище
 *
 * @example
 * ```typescript
 * // Получить токен обновления из локального хранилища
 * getValueByKey(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
 * ```
 */
const REFRESH_TOKEN_LOCAL_STORAGE_KEY: string = "refresh_token";

export {
    MIN_REGISTER_YEAR,
    MAX_REGISTER_YEAR,
    BASE_REGISTER_DATA,
    REGISTER_STEP_1_FORM_DATA,
    REGISTER_STEP_2_FORM_DATA,
    REGISTER_STEP_3_FORM_DATA,
    MAX_REGISTER_STEP,
    MIN_REGISTER_STEP,
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY
};
