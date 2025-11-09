<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue'
import { APP_NAME, MENU_ITEMS } from '@/consts'
import { useAppState } from '@/stores/app.ts'
const appState = useAppState();
appState.setBodyTheme();
</script>

<template>
  <BaseLayout class="BaseLayout__wrapper full-size" :menu-items="MENU_ITEMS" :app-name="APP_NAME" :class="appState.darkThemeEnable() ? 'app-dark' : ''"/>
</template>

