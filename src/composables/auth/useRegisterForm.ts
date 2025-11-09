import { type Ref, ref } from 'vue'
import type { IRegisterFormComposable, IRegisterFormData } from '@/composables/auth/interfaces.ts'
import { fieldRequired, maxValueLength, minValueLength } from '@/validators/base.ts'
import type {
    IFieldsFormValidators, IFieldFormValidators,
    IValidationResultByField,
    IValidatorResult, TValidator
} from '@/interfases/validators.ts'


export function useRegisterForm(): IRegisterFormComposable {
    const currentDate: Date = new Date()
    const maxBirthDayValue: Date = new Date(
        currentDate.getFullYear() - 14,
        currentDate.getMonth(),
        currentDate.getDate() + 1
    )
    const minBirthdayValue: Date = new Date(
        currentDate.getFullYear() - 100,
        currentDate.getMonth(),
        currentDate.getDate() + 1
    )
    const registerFormData: Ref<IRegisterFormData> = ref({
        name: '',
        surname: '',
        patronymic: null,
        date_birthday: maxBirthDayValue,
        login: '',
        password: '',
        password_confirmation: '',
        default_post_visible: 'all',
        default_profile_visible: 'all'
    })

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
        currentStep
    }
}
