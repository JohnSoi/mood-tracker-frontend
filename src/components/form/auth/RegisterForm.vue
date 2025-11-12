<script setup lang="ts">

import {
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    ProgressBar
} from 'primevue'
import { useRegisterForm } from '@/composables/auth/useRegisterForm.ts'
import BaseForm from '@/components/form/BaseForm.vue'
import type { IFormBtnConfig, IFormItem, IStepFormData } from '@/interfases'
import { type Ref, ref } from 'vue'
import type { TStepKey } from '@/interfases/auth.ts'

const registerFormController = useRegisterForm()
const currentStep = registerFormController.currentStep
const stepDisables: Ref<{ [key in TStepKey]: boolean }> = ref({
    1: false,
    2: true,
    3: true,
})

const validateStepEnd = (step: TStepKey, stepDisable: boolean) => {
    stepDisables.value[step] = stepDisable
}

</script>

<template>
    <div class="RegisterForm__wrapper full-size flex">
        <div class="RegisterForm__content half-size-w">
            <Stepper :value="currentStep" class="full-size flex flex-column">
                <StepList>
                    <Step :value="index"
                          v-for="index in (Object.keys(registerFormController.stepFormData).map(Number) as TStepKey[])"
                          :key="index" :disabled="stepDisables[index]"
                    >
                        {{
                            (registerFormController.stepFormData[index] as IStepFormData).title as string
                        }}
                    </Step>
                </StepList>
                <StepPanels class="full-size flex flex-column">
                    <StepPanel :value="index" class="full-size"
                               v-for="index in (Object.keys(registerFormController.stepFormData).map(Number) as number[])"
                               :key="index">
                        <BaseForm
                            :items="(registerFormController.stepFormData[index as TStepKey] as IStepFormData).items as IFormItem[]"
                            :buttons="(registerFormController.stepFormData[index as TStepKey] as IStepFormData).buttons as IFormBtnConfig[]"
                            :values="registerFormController.registerFormData"
                            :isLoading="registerFormController.registerInProcess.value"
                            @step-error-check="validateStepEnd(index as TStepKey, true)"
                            @step-end-check="validateStepEnd(index as TStepKey, false)"
                        />
                    </StepPanel>
                    <ProgressBar :value="registerFormController.progressPercentage.value"></ProgressBar>
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
