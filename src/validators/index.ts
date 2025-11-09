import type { IValidationResultByField } from '@/interfases'

const BASE_VALIDATOR_NAME: string[] = ['fieldRequired', 'maxValueLength', 'minValueLength']

function validateByNameFields<TObjectForValidate>(
    validatorName: string,
    nameFields: keyof TObjectForValidate[],
    objectForValidate: TObjectForValidate
): {[key: keyof TObjectForValidate]: IValidationResultByField} {

}

export
