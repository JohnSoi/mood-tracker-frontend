<script setup lang="ts">

import {
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel
} from 'primevue'
import { useRegisterForm } from '@/composables/auth/useRegisterForm.ts'
import BaseForm from '@/components/form/BaseForm.vue'
import type { IFormBtnConfig, IFormData, IFormItem } from '@/interfases'

const registerFormController = useRegisterForm()
const currentStep = registerFormController.currentStep

</script>

<template>
    <div class="RegisterForm__wrapper full-size flex">
        <div class="RegisterForm__content half-size-w">
            <Stepper :value="currentStep" class="full-size">
                <StepList>
                    <Step :value="index" v-for="index in (Object.keys(registerFormController.stepFormData).map(Number) as number[])" :key="index">
                        {{ (registerFormController.stepFormData[index] as IFormData).title }}
                    </Step>
                </StepList>
                <StepPanels class="full-size">
                    <StepPanel :value="index" class="full-size"
                               v-for="index in (Object.keys(registerFormController.stepFormData).map(Number) as number[])"
                               :key="index">
                        <BaseForm
                            :items="(registerFormController.stepFormData[index] as IFormData).items as IFormItem[]"
                            :buttons="(registerFormController.stepFormData[index] as IFormData).buttons as IFormBtnConfig[]"
                            :values="registerFormController.registerFormData"
                        />
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
