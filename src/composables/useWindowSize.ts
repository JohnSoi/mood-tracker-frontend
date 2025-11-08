import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Хук для отслеживания размеров окна браузера
 */
export function useWindowSize() {
    const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
    const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0)

    /**
     * Обновляет размеры окна
     */
    const updateSize = (): void => {
        width.value = window.innerWidth
        height.value = window.innerHeight
    }

    /**
     * Проверяет, превышает ли ширина окна заданное значение
     */
    const isWidthGreaterThan = (breakpoint: number): boolean => {
        return width.value > breakpoint
    }

    onMounted(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateSize)
            updateSize() // Инициализация
        }
    })

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateSize)
        }
    })

    return {
        width,
        height,
        isWidthGreaterThan
    }
}
