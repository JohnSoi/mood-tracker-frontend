<script setup lang="ts">

import { Button, DatePicker, IconField, IftaLabel, InputIcon, InputText, Message } from 'primevue';
import type { IRegisterFormComposable } from '@/composables/auth/interfaces.ts'

const props = defineProps<{
    controller: IRegisterFormComposable;
}>();

const {
    registerFormData,
    maxBirthDayValue,
    minBirthdayValue,
    registerInProcess,
    nextStep,
    validationResult
} = props.controller;

</script>

<template>
    <div
        class="RegisterForm__step1 full-size flex flex-center flex-column gap-xs"
    >
        <IftaLabel class="half-size-w">
            <IconField>
                <InputIcon>
                    <i class="fa fa-user"></i>
                </InputIcon>
                <InputText
                    class="full-size-w"
                    id="name"
                    name="name"
                    :invalid="validationResult?.name?.hasError"
                    v-model="registerFormData.name"
                    placeholder="Ваше имя"
                />
                <Message size="small" v-for="error in validationResult?.name?.errors" :key="error">{{ error }}</Message>
            </IconField>
            <label for="name">Имя</label>
        </IftaLabel>
        <IftaLabel class="half-size-w">
            <IconField>
                <InputIcon>
                    <i class="fa fa-user"></i>
                </InputIcon>
                <InputText
                    class="full-size-w"
                    id="surname"
                    name="surname"
                    v-model="registerFormData.surname"
                    placeholder="Ваша фамилия"
                />
            </IconField>
            <label for="surname">Фамилия</label>
        </IftaLabel>
        <IftaLabel class="half-size-w">
            <IconField>
                <InputIcon>
                    <i class="fa fa-user"></i>
                </InputIcon>
                <InputText
                    class="full-size-w"
                    id="patronymic"
                    name="patronymic"
                    v-model="registerFormData.patronymic"
                    placeholder="Ваше отчетсво"
                />
            </IconField>
            <label for="patronymic">Отчество</label>
        </IftaLabel>
        <IftaLabel class="half-size-w">
            <IconField>
                <InputIcon>
                    <i class="fa fa-calendar"></i>
                </InputIcon>
                <DatePicker
                    class="full-size-w"
                    id="date_birthday"
                    name="date_birthday"
                    v-model="registerFormData.date_birthday"
                    dateFormat="dd MM yy"
                    placeholder="Ваша дата рождения"
                    :min-date="minBirthdayValue"
                    :max-date="maxBirthDayValue"
                />
            </IconField>
            <label for="date_birthday">Дата рождения</label>
        </IftaLabel>
        <Button
            class="half-size-w mt-sm"
            type="button"
            label="Далее"
            icon="fa fa-arrow-right"
            :loading="registerInProcess"
            @click="nextStep"
        />
    </div>
</template>

<style scoped>

</style>
