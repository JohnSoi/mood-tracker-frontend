import type { Ref } from 'vue'
import type { IValidationResultByField } from '@/interfases/validators.ts'

interface ILoginForm {
    login: string;
    password: string;
}

interface ILoginFormComposable {
    loginFormData: Ref<ILoginForm>;
    authInProcess: Ref<boolean>;
    login: () => Promise<boolean>;
}

interface IRegisterFormStep1 {
    name: string;
    surname: string;
    patronymic?: string | null;
    date_birthday: Date;
}

interface IRegisterFormStep2 extends ILoginForm {
    password_confirmation: string;
}

type TRegisterFormVisibleValue = 'all' | 'friends' | 'onlyMe';

interface IRegisterFormStep3 {
    default_post_visible: TRegisterFormVisibleValue;
    default_profile_visible: TRegisterFormVisibleValue;
}

interface IRegisterFormData extends IRegisterFormStep1, IRegisterFormStep2, IRegisterFormStep3 {}

interface IRegisterFormComposable {
    registerFormData: Ref<IRegisterFormData>;
    minBirthdayValue: Date;
    maxBirthDayValue: Date;
    registerInProcess: Ref<boolean>;
    register: () => Promise<boolean>;
    nextStep: () => Promise<void>;
    prevStep: () => void;
    currentStep: Ref<number>;
}

export type {ILoginForm, ILoginFormComposable, IRegisterFormData, IRegisterFormComposable};
