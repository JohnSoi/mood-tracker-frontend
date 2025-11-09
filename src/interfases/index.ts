import type { Component } from 'vue';

export interface IMenuItem {
    label: string;
    id: string;
    icon: string;
    path: string;
    component: () => Promise<Component>;
    public?: boolean;
}

export interface IValidatorResult {
    hasError: boolean;
    error?: string;
}

export interface IValidationResultByField {
    hasError: boolean;
    errors: string[];
}
