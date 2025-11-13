import type { Ref } from "vue";
import type { Component } from "vue";

interface IMenuItem {
    label: string;
    id: string;
    icon: string;
    path: string;
    component: () => Promise<Component>;
    public?: boolean;
}

interface IMenuItemsComposable {
    items: Ref<IMenuItem[]>;
    updateMenuItems: () => void;
}

interface IResponsibleMenuComposable {
    checkMenuCollapseState: () => void;
    initResponsiveMenu: () => void;
    cleanup: () => void;
}

export type { IMenuItem, IMenuItemsComposable, IResponsibleMenuComposable };
