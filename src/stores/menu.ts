import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { getValueByKey, setValueByKey } from '@/utils/localStorage.ts'

const MENU_STORAGE_KEY: string = 'menuCollapsed';

const useMenuState = defineStore('menuState', () => {

    const collapsed: Ref<boolean> = ref<boolean>(getValueByKey<boolean>(MENU_STORAGE_KEY, true));

    function toggleCollapsed(): void {
        collapsed.value = !collapsed.value
        setValueByKey<boolean>(MENU_STORAGE_KEY, collapsed.value)
    }

    return { collapsed, toggleCollapsed }
})

export { useMenuState }
