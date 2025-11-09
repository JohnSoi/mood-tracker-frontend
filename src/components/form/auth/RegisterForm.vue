<script setup lang="ts">

import { Button, DatePicker, IconField, IftaLabel, InputIcon, InputText } from 'primevue';
import { useRegisterForm } from '@/composables/auth/useRegisterForm.ts'

const {
    registerFormData,
    maxBirthDayValue,
    minBirthdayValue,
    registerInProcess,
    register,
    nextStep,
    prevStep,
    currentStep
} = useRegisterForm();
</script>

<template>
    <div class="RegisterForm__wrapper full-size flex">
        <div class="RegisterForm__content half-size-w">
            <div
                class="RegisterForm__step1 full-size flex flex-center flex-column gap-xs"
                v-if="currentStep === 1"
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
                            v-model="registerFormData.name"
                            placeholder="Ваше имя"
                        />
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
        </div>
        <div class="RegisterForm__image half-size-w position-relative full-size-h box-shadow">
            <img
                class="position-absolute full-size"
                src="@/assets/images/RegisterView.jpg"
                alt="Человек, на вершине горы"
            />
        </div>
    </div>
</template>

<style scoped>
.RegisterForm__content {
    background-color: var(--secondary-background-color);
}

@media screen and (width < 1300px) {
    .RegisterForm__image {
        display: none;
    }

    .RegisterForm__content {
        width: 100%;
    }
}
</style>
