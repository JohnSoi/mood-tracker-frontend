import type { Ref } from 'vue'
import type { IMenuItem } from '@/interfases/index.ts'

interface IMenuItemsComposable {
    items: Ref<IMenuItem[]>;
    updateMenuItems: () => void;
}

interface IResponsibleMenuComposable {
    checkMenuCollapseState: () => void;
    initResponsiveMenu: () => void;
    cleanup: () => void;
}

export type {
    IMenuItemsComposable,
    IResponsibleMenuComposable,
}
