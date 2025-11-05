<script setup lang="ts">
import { Divider } from 'primevue'
import type { IMenuItem } from '@/interfases'
import { useAppState } from '@/stores/app.ts'
import { useAuthState } from '@/stores/auth.ts'
import { useMenuState } from '@/stores/menu.ts'
import { onBeforeMount, onBeforeUpdate, ref } from 'vue'

const appState = useAppState()
const menuState = useMenuState()
const authState = useAuthState()

const props = defineProps<{
    menuItems: IMenuItem[];
}>();

const items: Ref<IMenuItem[]> = ref([...props.menuItems]);

const setMenuItems = () => {
    const authState = useAuthState();

    const newMenuItems: IMenuItem[] = [];

    for (const menuItem of props.menuItems) {
        if (menuItem.public || authState.userAuthenticate) {
            newMenuItems.push(menuItem);
        }
    }

    items.value = newMenuItems;
}

onBeforeMount(() => {
    setMenuItems();
});

onBeforeUpdate(() => {
    setMenuItems();
});

</script>

<template>
    <div class="BaseMenu__wrapper flex flex-column p-xs full-size-h box-shadow">
        <div class="BaseMenu__logo flex flex-center p-xs">
            <i class="fa-solid fa-face-smile text-3xl text-success"></i>
        </div>
        <Divider />
        <div class="BaseMenu__items full-size-h">
            <div class="BaseMenu__items-item flex flex-center mb-md" v-for="menuItem in items"
                 :key="menuItem.id" :title="menuItem.label">
                <router-link :to="menuItem.path"
                             class="flex flex-center full-size-w link-hovered transition">
                    <i class="fa" :class="'fa-' + menuItem.icon"></i>
                    <span class="ml-xs" v-if="!menuState.collapsed">{{ menuItem.label }}</span>
                </router-link>
            </div>
        </div>
        <Divider />
        <div class="BaseMenu__footer flex-center flex flex-column">
            <div class="BaseMenu__footer-collapsedBtn cursor-pointer link-hovered transition"
                 @click="menuState.toggleCollapsed"
                 :title="menuState.collapsed ? 'Развернуть' : 'Свернуть'">
                <i class="fa-solid"
                   :class="'fa-chevron-' + (menuState.collapsed ? 'right' : 'left')"></i>
                <span class="ml-xs" v-if="!menuState.collapsed">Свернуть</span>
            </div>
            <div class="mt-md BaseMenu__footer-themeBtn cursor-pointer link-hovered transition"
                 @click="appState.toggleAppTheme"
                 :title="appState.darkThemeEnable() ? 'Включить светлую тему' : 'Включить темную тему'"
                 :class="{'mb-xs': !authState.userAuthenticate}"
            >
                <i class="fa-solid"
                   :class="'fa-' + (appState.darkThemeEnable() ? 'sun' : 'moon')"
                ></i>
                <span
                    class="ml-xs"
                    v-if="!menuState.collapsed"
                >
                    {{ (appState.darkThemeEnable() ? 'Светлая' : 'Темная') }}
                </span>
            </div>
            <Divider v-if="authState.userAuthenticate" />
        </div>
    </div>
</template>

<style scoped>
.BaseMenu__items-item {
    transition: width var(--transition) ease;
}

.BaseMenu__items-item a {
    text-decoration: none;
}

.BaseMenu__wrapper {
    background: var(--secondary-background-color);
    border-radius: var(--border-radius-menu);
}

.router-link-active {
    color: var(--primary-color) !important;
}
</style>
