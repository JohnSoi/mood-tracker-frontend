/**
 * Создает и возвращает новую функцию, которая откладывает вызов исходной функции
 * до истечения указанного времени задержки после последнего вызова
 *
 * @param func - Исходная функция для отложенного вызова
 * @param delay - Задержка в миллисекундах
 * @returns Новая функция с debounce поведением
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query)
 * }, 300)
 *
 * // При быстром вводе функция будет вызвана только один раз
 * debouncedSearch('a')
 * debouncedSearch('ab')
 * debouncedSearch('abc') // Только этот вызов выполнится
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>): void => {
        // Очищаем предыдущий таймер
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Устанавливаем новый таймер
        timeoutId = setTimeout(() => {
            // eslint-disable-next-line prefer-spread
            func.apply(undefined, args);
        }, delay);
    };
}
