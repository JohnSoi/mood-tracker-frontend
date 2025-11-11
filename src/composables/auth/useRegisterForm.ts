import { type Ref, ref } from 'vue'
import type { IStepFormData } from '@/interfases'
import {
    BASE_REGISTER_DATA,
    MAX_REGISTER_YEAR,
    MIN_REGISTER_YEAR,
    REGISTER_STEP_1_FORM_DATA, REGISTER_STEP_2_FORM_DATA, REGISTER_STEP_3_FORM_DATA
} from '@/consts/auth.ts'
import type { IRegisterFormComposable, IRegisterFormData } from '@/interfases/auth.ts'
import { getSubtractYearFromCurrentDate } from '@/utils/date.ts'


export function useRegisterForm(): IRegisterFormComposable {
    const maxBirthDayValue: Date = getSubtractYearFromCurrentDate(MIN_REGISTER_YEAR);
    const minBirthdayValue: Date = getSubtractYearFromCurrentDate(MAX_REGISTER_YEAR);

    const registerFormData: Ref<IRegisterFormData> = ref({
        ...BASE_REGISTER_DATA,
        date_birthday: minBirthdayValue
    })

    const stepFormData: {[key: number]: IStepFormData} = {
        1: REGISTER_STEP_1_FORM_DATA(minBirthdayValue, maxBirthDayValue, async (values) => {
            registerFormData.value = {
                ...registerFormData.value,
                ...values
            }
            await nextStep()
        }),
        2: REGISTER_STEP_2_FORM_DATA(async (values) => {
            prevStep()
        }, async (values) => {
            registerFormData.value = {
                ...registerFormData.value,
                ...values
            }
            await nextStep()
        }),
        3: REGISTER_STEP_3_FORM_DATA()
    };

    const registerInProcess: Ref<boolean> = ref(false)
    const currentStep: Ref<number> = ref(1)

    const register = async (): Promise<boolean> => {
        registerInProcess.value = true
        setTimeout(() => {
            registerInProcess.value = false
        }, 1000)
        return true
    }

    const nextStep = async (): Promise<void> => {
        currentStep.value++
    }

    const prevStep = (): void => {
        currentStep.value--
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
        stepFormData
    }
}
