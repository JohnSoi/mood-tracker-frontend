import type { ComputedRef, Ref } from "vue";
import type { IFormData } from "@/interfases/form";
import type { Store, StoreDefinition } from "pinia";

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

type TRegisterFormVisibleValue = "all" | "friends" | "onlyMe";

interface IRegisterFormStep3 {
    default_post_visible: TRegisterFormVisibleValue;
    default_profile_visible: TRegisterFormVisibleValue;
}

interface IRegisterFormData extends IRegisterFormStep1, IRegisterFormStep2, IRegisterFormStep3 {
}

interface IRegisterFormComposable {
    registerFormData: Ref<IRegisterFormData>;
    minBirthdayValue: Date;
    maxBirthDayValue: Date;
    registerInProcess: Ref<boolean>;
    register: (formValue: IRegisterFormData) => Promise<void>;
    nextStep: () => void;
    prevStep: () => void;
    currentStep: Ref<number>;
    stepFormData: { [key in TRegisterStepKey]: IFormData };
    progressPercentage: ComputedRef<number>;
}

type TRegisterStepKey = 1 | 2 | 3;

interface IAuthStore {
    userAuthenticate: Ref<boolean>;
}

type TAuthStoreDef = StoreDefinition<"authState", IAuthStore>;
type TAuthStore = Store<"authState", IAuthStore>;

export type {
    ILoginForm,
    ILoginFormComposable,
    IRegisterFormData,
    IRegisterFormComposable,
    TRegisterStepKey,
    IAuthStore,
    TAuthStoreDef,
    TAuthStore
};
