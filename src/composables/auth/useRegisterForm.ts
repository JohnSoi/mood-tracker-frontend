import { computed, type ComputedRef, type Ref, ref } from 'vue'
import type { IStepFormData } from '@/interfases'
import {
    BASE_REGISTER_DATA, MAX_REGISTER_STEP,
    MAX_REGISTER_YEAR,
    MIN_REGISTER_YEAR,
    REGISTER_STEP_1_FORM_DATA, REGISTER_STEP_2_FORM_DATA, REGISTER_STEP_3_FORM_DATA
} from '@/consts/auth.ts'
import type { IRegisterFormComposable, IRegisterFormData, TStepKey } from '@/interfases/auth.ts'
import { getSubtractYearFromCurrentDate } from '@/utils/date.ts'


export function useRegisterForm(): IRegisterFormComposable {
    const maxBirthDayValue: Date = getSubtractYearFromCurrentDate(MIN_REGISTER_YEAR)
    const minBirthdayValue: Date = getSubtractYearFromCurrentDate(MAX_REGISTER_YEAR)

    const registerFormData: Ref<IRegisterFormData> = ref({
        ...BASE_REGISTER_DATA,
        date_birthday: minBirthdayValue
    })

    const register = async (formValue: IRegisterFormData): Promise<void> => {
        registerInProcess.value = true
        setTimeout(() => {
            registerInProcess.value = false
        }, 1000)
    }

    const handleStep1Submit = async (values: Partial<IRegisterFormData>): Promise<void> => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values
        }
        await nextStep()
    }

    const handleStep2Submit = async (values: Partial<IRegisterFormData>): Promise<void> => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values
        }
        await nextStep()
    }

    const handleStep2Prev = async (): Promise<void> => {
        prevStep()
    }

    const handleStep3Submit = async (values: Partial<IRegisterFormData>): Promise<void> => {
        registerFormData.value = {
            ...registerFormData.value,
            ...values
        }
        await register(registerFormData.value)
    }

    const stepFormData: { [key in TStepKey]: IStepFormData } = {
        1: REGISTER_STEP_1_FORM_DATA(minBirthdayValue, maxBirthDayValue, handleStep1Submit),
        2: REGISTER_STEP_2_FORM_DATA(handleStep2Prev, handleStep2Submit),
        3: REGISTER_STEP_3_FORM_DATA(handleStep3Submit)
    }

    const registerInProcess: Ref<boolean> = ref(false)
    const currentStep: Ref<TStepKey> = ref(1)
    const progressPercentage: ComputedRef<string> = computed(() => ((currentStep.value / MAX_REGISTER_STEP) * 100).toFixed(0))

    const nextStep = async (): Promise<void> => {
        if (currentStep.value < MAX_REGISTER_STEP) {
            currentStep.value++
        }
    }

    const prevStep = (): void => {
        if (currentStep.value > MAX_REGISTER_STEP) {
            currentStep.value--
        }
    }

    return {
        registerFormData,
        minBirthdayValue,
        maxBirthDayValue,
        registerInProcess,
        register,
        nextStep,
        prevStep,
        currentStep,
        stepFormData,
        progressPercentage
    }
}
