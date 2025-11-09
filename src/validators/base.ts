import type { IValidatorResult } from '@/interfases'

function fieldRequired(value: unknown): IValidatorResult {
    let valueIsEmpty = false
    const result: IValidatorResult = {
        hasError: false,
    }

    if (typeof value !== 'object' && !Array.isArray(value)) {
        valueIsEmpty = !value
    }

    if (Array.isArray(value)) {
        valueIsEmpty = !value.length
    }

    if (typeof value === 'object') {
        valueIsEmpty = !Object.keys(value as Object).length
    }

    if (valueIsEmpty) {
        result.hasError = true
        result.error = 'Занчение поял обязательно для заполнения'
    }

    return result
}

function minValueLength(value: unknown, minValueLength: number = 4): IValidatorResult {
    const result: IValidatorResult = {
        hasError = false,
    }
    let lengthLessMin: boolean = false

    if (typeof value === 'string' || Array.isArray(value)) {
        lengthLessMin = value.length < minValueLength
    }

    if (typeof value === 'number') {
        lengthLessMin = value < minValueLength
    }

    if (typeof value === 'object') {
        lengthLessMin = Object.keys(value).length < minValueLength
    }

    if (lengthLessMin) {
        result.hasError = true
        result.error = `Длинна поля должна быть не меньше ${minValueLength}`
    }

    return result
}

function maxValueLength(value: unknown, maxValueLength: number = 50): IValidatorResult {
    const result: IValidatorResult = {
        hasError = false,
    }
    let lengthGreatMin: boolean = false

    if (typeof value === 'string' || Array.isArray(value)) {
        lengthGreatMin = value.length < maxValueLength
    }

    if (typeof value === 'number') {
        lengthGreatMin = value < maxValueLength
    }

    if (typeof value === 'object') {
        lengthGreatMin = Object.keys(value).length < maxValueLength
    }

    if (lengthGreatMin) {
        result.hasError = true
        result.error = `Длинна поля должна быть не больше ${maxValueLength}`
    }

    return result
}

export {fieldRequired, maxValueLength, minValueLength}
