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
        <router-view/>
    </div>
</template>
