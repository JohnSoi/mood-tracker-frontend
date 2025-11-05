import type { IMenuItem } from '@/interfases'

const APP_NAME: string = 'DH|MoodTracker';

const MENU_ITEMS: IMenuItem[] = [
    {
        id: 'home',
        label: 'Главная',
        icon: 'home',
        path: '/',
        component: () => import('@/views/HomeView.vue')
    },
    {
        id: 'feed',
        label: 'Лента',
        icon: 'newspaper',
        path: '/feed',
        component: () => import('@/views/FeedView.vue')
    }
];

export {APP_NAME, MENU_ITEMS};
