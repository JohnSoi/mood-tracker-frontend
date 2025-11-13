import type { Ref } from "vue";

interface IWindowsSizeComposable {
    width: Ref<number>;
    height: Ref<number>;
    isWidthGreaterThan: (breakpoint: number) => boolean;
}

export type {
    IWindowsSizeComposable
}
