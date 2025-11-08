<script setup lang="ts">
import type { IMenuItem } from '@/interfases';
import BaseMenu from '@/components/ui/BaseMenu.vue'

defineProps<{
    menuItems: IMenuItem[];
    appName: string;
}>();
</script>
<template>
    <div class="BaseLayout__wrapper full-size flex p-md">
        <BaseMenu :menu-items="menuItems"/>
        <div class="flex flex-center p-xs full-size">
            <router-view/>
        </div>
    </div>
</template>

<style>
@media screen and (width < 800px) {
    .BaseLayout__wrapper {
        flex-direction: column-reverse;
    }
}
</style>
