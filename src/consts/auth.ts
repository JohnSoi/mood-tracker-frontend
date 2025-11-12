import type { IRegisterFormData } from '@/interfases/auth'
import type { IStepFormData, TFormBtnCallback } from '@/interfases'

const MIN_REGISTER_YEAR: number = 14
const MAX_REGISTER_YEAR: number = 80
const BASE_REGISTER_DATA: IRegisterFormData = {
    date_birthday: new Date(),
    name: '',
    surname: '',
    patronymic: null,
    login: '',
    password: '',
    password_confirmation: '',
    default_post_visible: 'all',
    default_profile_visible: 'all'
}

const REGISTER_STEP_1_FORM_DATA = (minBirthdayValue: Date, maxBirthDayValue: Date, callback: TFormBtnCallback): IStepFormData => {
    return {
        title: 'Расскажите о себе',
        items: [
            {
                id: 'name',
                label: 'Имя',
                placeholder: 'Введите Ваше имя',
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-user',
                type: 'text'
            },
            {
                id: 'surname',
                label: 'Фамилия',
                placeholder: 'Введите Вашу фамилию',
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-user',
                type: 'text'
            },
            {
                id: 'patronymic',
                label: 'Отчество',
                placeholder: 'Введите Ваше отчество',
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-user',
                type: 'text'
            },
            {
                id: 'date_birthday',
                label: 'Дата рождения',
                placeholder: 'Введите Вашу дату рождения',
                required: true,
                icon: 'fa fa-calendar',
                type: 'date',
                defaultValue: maxBirthDayValue,
                minDate: minBirthdayValue,
                maxDate: maxBirthDayValue
            }
        ],
        buttons: [
            {
                id: 'next',
                label: 'Далее',
                icon: 'fa fa-arrow-right',
                callback
            }
        ]
    }
}

const REGISTER_STEP_2_FORM_DATA = (prevCallback: TFormBtnCallback, nextCallback: TFormBtnCallback): IStepFormData => {
    return {
        title: 'Данные для входа',
        items: [
            {
                id: 'login',
                label: 'Логин',
                placeholder: 'Введите Ваш логин',
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-user',
                type: 'text'
            },
            {
                id: 'password',
                label: 'Пароль',
                placeholder: 'Введите Ваше пароль',
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-key',
                type: 'password'
            },
            {
                id: 'password_confirmation',
                label: 'Повторите пароль',
                placeholder: 'Повторите пароль для проверки',
                required: true,
                minLength: 4,
                maxLength: 50,
                icon: 'fa fa-key',
                type: 'password',
                validation: (value: string | Date, values: {[key: string]: string | Date}): string[] | null => {
                    const errors: string[] = [];

                    if (value != values.password) {
                        errors.push('Введенные пароли не совпадают')
                    }

                    return errors.length ? errors : null;
                },
            }
        ],
        buttons: [
            {
                id: 'back',
                label: 'Назад',
                icon: 'fa fa-arrow-left',
                skipValidate: true,
                style: 'secondary',
                callback: prevCallback
            },
            {
                id: 'next',
                label: 'Далее',
                icon: 'fa fa-arrow-right',
                callback: nextCallback
            }
        ]
    }
}

const REGISTER_STEP_3_FORM_DATA = (nextCallback: TFormBtnCallback): IStepFormData => {
    return {
        title: 'Настройки приватности',
        items: [
            {
                id: 'default_post_visible',
                label: 'Кто видит мои посты: ',
                type: 'select',
                defaultValue: 'all',
                selectValues: [
                    {
                        name: 'Все',
                        value: 'all'
                    },
                    {
                        name: 'Только друзья',
                        value: 'friends'
                    },
                    {
                        name: 'Только я',
                        value: 'onlyMe'
                    }
                ]
            },
            {
                id: 'default_profile_visible',
                label: 'Кто видит мой профиль: ',
                type: 'select',
                defaultValue: 'all',
                selectValues: [
                    {
                        name: 'Все',
                        value: 'all'
                    },
                    {
                        name: 'Только друзья',
                        value: 'friends'
                    },
                    {
                        name: 'Только я',
                        value: 'onlyMe'
                    }
                ]
            }
        ],
        buttons: [{
            id: 'next',
            label: 'Войти',
            icon: 'fa fa-unlock',
            callback: nextCallback
        }]
    }
}

const MAX_REGISTER_STEP: number = 3;
const MIN_REGISTER_STEP: number = 1;

export {
    MIN_REGISTER_YEAR,
    MAX_REGISTER_YEAR,
    BASE_REGISTER_DATA,
    REGISTER_STEP_1_FORM_DATA,
    REGISTER_STEP_2_FORM_DATA,
    REGISTER_STEP_3_FORM_DATA,
    MAX_REGISTER_STEP,
    MIN_REGISTER_STEP
}
