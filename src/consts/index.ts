import type { IMenuItem } from "@/interfases/menu";

/**
 * Название приложения, используемое в различных частях UI
 *
 * @constant
 * @type {string}
 * @default "DH|MoodTracker"
 *
 * @remarks
 * Используется в:
 * - Заголовке страницы (HTML title)
 * - Шапке приложения
 * - Мета-тегах для SEO
 * - Уведомлениях и сообщениях
 * - Настройках PWA (Progressive Web App)
 *
 * Формат названия: "DH|MoodTracker" указывает на бренд "DH" и основную функциональность "MoodTracker"
 *
 * @example
 * ```typescript
 * // Использование в компоненте заголовка
 * document.title = `${APP_NAME} - ${currentPageTitle}`
 *
 * // Использование в шапке приложения
 * <header>
 *   <h1>{{ APP_NAME }}</h1>
 * </header>
 *
 * // Использование в мета-тегах
 * useHead({
 *   title: APP_NAME,
 *   meta: [{ name: 'description', content: `Добро пожаловать в ${APP_NAME}` }]
 * })
 * ```
 */
const APP_NAME: string = "DH|MoodTracker";

/**
 * Конфигурация элементов основного меню навигации приложения
 *
 * @constant
 * @type {IMenuItem[]}
 *
 * @remarks
 * Определяет структуру навигации приложения. Каждый элемент меню содержит:
 * - Маршрут для навигации
 * - Компонент для lazy loading
 * - Иконку и метку для отображения
 * - Дополнительные параметры для управления доступом
 *
 * Меню используется в:
 * - Основной навигационной панели
 * - Боковом меню (sidebar)
 * - Мобильной навигации
 * - Хлебных крошках (breadcrumbs)
 *
 * @example
 * ```typescript
 * // Использование в компоненте навигации
 * <nav>
 *   <router-link
 *     v-for="item in MENU_ITEMS"
 *     :key="item.id"
 *     :to="item.path"
 *   >
 *     <i :class="`icon-${item.icon}`"></i>
 *     {{ item.label }}
 *   </router-link>
 * </nav>
 *
 * // Использование в маршрутизаторе
 * const routes = MENU_ITEMS.map(item => ({
 *   path: item.path,
 *   component: item.component,
 *   name: item.id
 * }))
 * ```
 */
const MENU_ITEMS: IMenuItem[] = [
    {
        id: "home",
        label: "Главная",
        icon: "home",
        path: "/",
        component: () => import("@/views/HomeView.vue"),
    },
    {
        id: "feed",
        label: "Лента",
        icon: "newspaper",
        path: "/feed",
        component: () => import("@/views/FeedView.vue"),
    },
];

/**
 * Ширина экрана в пикселях, при которой боковое меню автоматически сворачивается
 * 
 * @constant
 * @type {number}
 * @default 800
 *
 * @remarks
 * Используется для реализации адаптивного поведения интерфейса:
 * - На экранах шире 800px: меню отображается в развернутом состоянии
 * - На экранах уже 800px: меню автоматически сворачивается
 *
 * Это значение представляет собой breakpoint между планшетной и десктопной версиями.
 *
 * @example
 * ```typescript
 * // Использование в composable для адаптивного меню
 * const { width } = useWindowSize()
 * const isMenuCollapsed = computed(() => width.value <= WIDTH_FOR_COLLAPSE_MENU)
 *
 * // Использование в CSS через JavaScript
 * const isMobile = window.innerWidth <= WIDTH_FOR_COLLAPSE_MENU
 *
 * // Использование в обработчике resize
 * window.addEventListener('resize', () => {
 *   if (window.innerWidth <= WIDTH_FOR_COLLAPSE_MENU) {
 *     collapseMenu()
 *   }
 * })
 * ```
 */
const WIDTH_FOR_COLLAPSE_MENU: number = 800;

export { APP_NAME, MENU_ITEMS, WIDTH_FOR_COLLAPSE_MENU };
