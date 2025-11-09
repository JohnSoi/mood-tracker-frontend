<script setup lang="ts">

import {
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel
} from 'primevue'
import { useRegisterForm } from '@/composables/auth/useRegisterForm.ts'
import RegisterStep1 from '@/components/form/auth/register/RegisterStep1.vue'

const registerFormController = useRegisterForm()
const currentStep = registerFormController.currentStep;

</script>

<template>
    <div class="RegisterForm__wrapper full-size flex">
        <div class="RegisterForm__content half-size-w">
            <Stepper :value="currentStep" class="full-size">
                <StepList>
                    <Step :value="1">Расскажите о себе</Step>
                    <Step :value="2">Данные для входа</Step>
                    <Step :value="3">Настройки приватности</Step>
                </StepList>
                <StepPanels class="full-size">
                    <StepPanel :value="1" class="full-size">
                        <RegisterStep1 :controller="registerFormController"/>
                    </StepPanel>
                </StepPanels>
            </Stepper>
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
