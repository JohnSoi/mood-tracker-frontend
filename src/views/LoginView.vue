<script setup lang="ts">
import {
    IftaLabel,
    IconField,
    InputIcon,
    InputText,
    Button,
    SelectButton,
    DatePicker,
} from 'primevue'
import { type Ref, ref } from 'vue'
import LoginForm from '@/components/form/auth/LoginForm.vue'
import RegisterForm from '@/components/form/auth/RegisterForm.vue'

const currentViewForm: Ref<'login' | 'register'> = ref('login')
const viewOptions: Ref<{ value: 'login' | 'register'; name: string }[]> = ref([
    { value: 'login', name: 'Вход' },
    { value: 'register', name: 'Регистрация' },
])
const changeViewForm = (): void => {
    if (currentViewForm.value === 'register') {
        currentViewForm.value = 'login';
    } else {
        currentViewForm.value = 'register';
    }
}
</script>

<template>
    <div class="position-relative LoginView__wrapper full-size flex flex-center">
        <SelectButton
            class="t-0 position-absolute"
            v-model="currentViewForm"
            :options="viewOptions"
            optionLabel="name"
            optionValue="value"
            dataKey="value"
        />
        <div class="LoginView__form flex border-radius overflow-hidden box-shadow">
            <LoginForm v-if="currentViewForm === 'login'" @change-view="changeViewForm" />
            <RegisterForm v-if="currentViewForm === 'register'" @change-view="changeViewForm" />
        </div>
    </div>
</template>

<style scoped>
.LoginView__form {
    width: 80%;
    height: 80%;
}
</style>
