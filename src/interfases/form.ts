import type { Ref } from "vue";
import type { TRegisterStepKey } from "@/interfases/auth.ts";

interface IBaseFormComposable {
    values: { [key: string]: string | Date };
    btnIsLoading: Ref<Record<string, boolean>>;
    fieldErrors: Ref<Record<string, string[]>>;
    validateAndNext: (buttonConfig: IFormBtnConfig) => Promise<void>;
}

interface IFormItem {
    id: string;
    label: string;
    icon?: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | Date;
    type: "text" | "password" | "email" | "date" | "select";
    minLength?: number;
    maxLength?: number;
    minDate?: Date;
    maxDate?: Date;
    validation?: (
        value: string | Date,
        values: {
            [key: string]: string | Date;
        },
    ) => string[] | null;
    selectValues?: { name: string; value: string }[];
}

type TFormBtnCallback = (values: { [key: string]: string | Date }) => Promise<void> | void;

interface IFormBtnConfig {
    id: string;
    label: string;
    icon: string;
    skipValidate?: boolean;
    style?: "secondary";
    callback: TFormBtnCallback;
}

interface IFormData {
    items: IFormItem[];
    buttons: IFormBtnConfig[];
}

interface IBaseForm extends IFormData {
    isLoading: boolean;
}

interface IStepFormData extends IFormData {
    title: string;
}

type TValidateStepEnd = (step: TRegisterStepKey, stepDisable: boolean) => void;

export type {
    IBaseFormComposable,
    IFormItem,
    IFormBtnConfig,
    IFormData,
    TFormBtnCallback,
    IStepFormData,
    IBaseForm,
    TValidateStepEnd,
};
