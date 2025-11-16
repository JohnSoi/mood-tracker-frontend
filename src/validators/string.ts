class StringValidator {
    protected _value: string | undefined;
    protected _fieldName: string | null;
    protected _isString: boolean;
    protected _validatorSettings: { minLength: number; maxLength: number, required: boolean };
    protected _errors: string[] = [];

    constructor(
        value: unknown,
        minLength: number | null = null,
        maxLength: number | null = null,
        fieldRequired: boolean = true,
        fieldName: string | null = null,
    ) {
        this._isString = typeof value === "string";
        this._fieldName = fieldName;
        this._validatorSettings = {
            minLength: minLength || 0,
            maxLength: maxLength || Number.MAX_VALUE,
            required: fieldRequired
        };

        if (this._isString) {
            this._value = (value as string).trim();
        }
    }

    get(): string | null {
        return this._isString ? this._value as string : null;
    }

    isValid(): boolean {
        this.checkRequired();
        this.checkLength();

        return !this._errors.length;
    }

    getErrors(): string[] {
        return this._errors;
    }

    checkRequired(): void {
        if (!this._isString || this._value || !this._validatorSettings.required) {
            return;
        }

        this._errors.push(this._createErrorMessage("Поле ${fieldName} обязательно для заполнения"));
    }

    checkMinLength(): void {
        if (!this._isString || !this._value || this._value.length > this._validatorSettings.minLength) {
            return;
        }

        this._errors.push(
            this._createErrorMessage("Поле ${fieldName} должно быть не меньше ${fieldMinLength} символов"),
        );
    }

    checkMaxLength(): void {
        if (!this._isString || !this._value || this._value.length < this._validatorSettings.maxLength) {
            return;
        }

        this._errors.push(
            this._createErrorMessage("Поле ${fieldName} должно быть не больше ${fieldMaxLength} символов"),
        );
    }

    checkLength(): void {
        this.checkMinLength();
        this.checkMaxLength()
    }

    _createErrorMessage(errorMsg: string): string {
        const fieldPrefix: string = this._fieldName ? `"${this._fieldName}"` : "";

        errorMsg = errorMsg
            .replace("${fieldName}", fieldPrefix)
            .replace("${fieldMinLength}", String(this._validatorSettings.minLength))
            .replace("${fieldMaxLength}", String(this._validatorSettings.maxLength));

        return errorMsg;
    }
}

export { StringValidator };
