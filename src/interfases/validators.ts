interface IValidatorResult {
    hasError: boolean;
    error?: string;
}

interface IValidationResultByField {
    hasError: boolean;
    errors: string[];
}

type TValidator = () => IValidatorResult;

interface IFieldFormValidators<TFormInterface> {
    [key: string]: TValidator[];

}

interface IFieldsFormValidators<TFormInterface> {
    [key: number]: IFieldFormValidators<TFormInterface>
}

export type {
    IValidatorResult,
    IValidationResultByField,
    IFieldsFormValidators,
    IFieldFormValidators,
    TValidator
}
