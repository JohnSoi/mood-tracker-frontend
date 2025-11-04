import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { getValueByKey, setValueByKey } from '@/utils/localStorage.ts'

const APP_THEME_STORAGE_KEY: string = 'appTheme';

type TAppTheme = "light" | "dark";

const useAppState = defineStore('appState', () => {
    const appTheme: Ref<TAppTheme> = ref(getValueByKey<TAppTheme>(APP_THEME_STORAGE_KEY, "light"));

    function toggleAppTheme(): void {
        appTheme.value = appTheme.value === "light" ? "dark" : "light";
        setValueByKey<TAppTheme>(APP_THEME_STORAGE_KEY, appTheme.value);
    }

    function darkThemeEnable(): boolean {
        return appTheme.value === "dark";
    }

    return {
        toggleAppTheme,
        darkThemeEnable,
    }
});


export { useAppState };
