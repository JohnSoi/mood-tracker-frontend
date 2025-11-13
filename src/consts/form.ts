/**
 * Более строгое регулярное выражение для валидации email
 * 
 * @constant
 * @type {RegExp}
 *
 * @remarks
 * Соответствует стандарту RFC 5322 более точно.
 * Поддерживает большинство валидных email форматов.
 *
 * @example
 * ```typescript
 * const STRICT_EMAIL_REG_EXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
 * ```
 */
const EMAIL_REG_EXP: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export { EMAIL_REG_EXP };
