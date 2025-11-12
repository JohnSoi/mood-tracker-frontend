import { computed, ref } from 'vue'
import type { IFormBtnConfig, IFormData, IFormItem } from '@/interfases'

export function useBaseForm(props: IFormData, emits: (event: ('stepErrorCheck' | 'stepEndCheck'), ...args: unknown[]) => void) {
    const values: { [key: string]: string | Date } = {}
    const fieldErrors = ref<Record<string, string[]>>({})
    const btnIsLoading = ref<Record<string, boolean>>({})

    const hasErrors = computed(() =>
        Object.values(fieldErrors.value).some(errors => errors.length > 0)
    )

    props.items.forEach(item => {
        values[item.id] = item.defaultValue || ''
    })

    props.buttons.forEach((button: IFormBtnConfig) => {
        btnIsLoading.value[button.id] = false
    })

    const validateField = (field: IFormItem): string[] => {
        let errors: string[] = []
        let fieldValue: string | Date = values[field.id] as string | Date

        if (typeof fieldValue === 'string') {
            fieldValue = fieldValue.trim()
        }

        if (field.required && !fieldValue) {
            errors.push(`Поле "${field.label}" обязательно для заполнения`)
            return errors
        }

        if (fieldValue && typeof fieldValue === 'string' && field.minLength && fieldValue.length < field.minLength) {
            errors.push(`Поле "${field.label}" должно быть не меньше ${field.minLength} символов`)
        }

        if (fieldValue && typeof fieldValue === 'string' && field.maxLength && fieldValue.length > field.maxLength) {
            errors.push(`Поле "${field.label}" должно быть не более ${field.maxLength} символов`)
        }

        if (field.validation) {
            const customErrors: string[] | null = field.validation(fieldValue, values)

            if (customErrors && customErrors.length > 0) {
                errors = [...errors, ...customErrors]
            }
        }

        values[field.id] = fieldValue

        return errors
    }

    const validateForm = (): boolean => {
        fieldErrors.value = {}
        emits('stepErrorCheck');
        props.items.forEach((item: IFormItem) => {
            const errors = validateField(item)

            if (errors.length) {
                fieldErrors.value[item.id] = errors
            }
        })


        return !hasErrors.value
    }

    const validateAndNext = async (buttonConfig: IFormBtnConfig) => {
        btnIsLoading.value[buttonConfig.id] = true
        if (buttonConfig.skipValidate || validateForm()) {
            emits('stepEndCheck')
            await buttonConfig.callback(values)
        }

        if (buttonConfig.skipValidate) {
            emits('stepEndCheck')
        }

        btnIsLoading.value[buttonConfig.id] = false
    }

    return {
        values,
        btnIsLoading,
        fieldErrors,
        validateAndNext
    }
}
