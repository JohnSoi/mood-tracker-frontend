import { EMAIL_REG_EXP } from "@/consts/form.ts";

/**
 * Сервис для валидации email с дополнительными проверками
 */
class EmailValidator {
    private static readonly EMAIL_REG_EXP = EMAIL_REG_EXP;

    static isValid(email: string): boolean {
        if (!email) {
            return false;
        }

        const trimmedEmail = email.trim();

        // Базовая проверка регулярным выражением
        if (!this.EMAIL_REG_EXP.test(trimmedEmail)) {
            return false;
        }

        // Дополнительные проверки
        return this.hasValidLength(trimmedEmail) &&
            this.hasValidDomain(trimmedEmail);
    }


    private static hasValidLength(email: string): boolean {
        return email.length <= 254;
    }


    private static hasValidDomain(email: string): boolean {
        const domain: string | undefined = email.split('@')[1];
        return !!domain && domain.length > 0 && domain.indexOf('.') > 0;
    }


    static extractDomain(email: string): string | null {
        if (!this.isValid(email)) {
            return null;
        }

        return email.split('@')[1] || null;
    }
}

export { EmailValidator };
