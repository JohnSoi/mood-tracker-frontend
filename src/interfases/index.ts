import type { Component } from 'vue';

export interface IMenuItem {
    label: string;
    id: string;
    icon: string;
    path: string;
    component: () => Promise<Component>;
    public?: boolean;
}

export interface IFormItem {
    id: string;
    label: string;
    icon: string;
    placeholder: string;
    required?: boolean;
    type: 'text' | 'password' | 'email' | 'date';
    minLength?: number;
    maxLength?: number;
    minDate?: Date;
    maxDate?: Date;
    validation?: (value: string | number) => string[] | null;
}

export type TFormBtnCallback = (values: {[key: string]: string | Date}) => Promise<void>

export interface IFormBtnConfig {
    id: string;
    label: string;
    icon: string;
    skipValidate?: boolean;
    style?: 'secondary';
    callback: TFormBtnCallback;
}

export interface IFormData {
    items: IFormItem[];
    buttons: IFormBtnConfig[];
}

export interface IStepFormData extends IFormData {
    title: string;
}
