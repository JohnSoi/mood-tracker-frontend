import type { IMenuItem } from '@/interfases'

const APP_NAME: string = 'DH|MoodTracker';

const MENU_ITEMS: IMenuItem[] = [
    {
        id: 'home',
        label: 'Главная',
        icon: 'home',
        path: '/'
    },
    {
        id: 'feed',
        label: 'Лента',
        icon: 'newspaper',
        path: '/feed'
    }
];

export {APP_NAME, MENU_ITEMS};
