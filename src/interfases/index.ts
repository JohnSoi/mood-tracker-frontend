import type { Component } from 'vue';

export interface IMenuItem {
    label: string;
    id: string;
    icon: string;
    path: string;
    component: () => Promise<Component>;
    public?: boolean;
}
