import { createRouter, createWebHistory } from 'vue-router'
import { MENU_ITEMS } from '@/consts'
import type { Component } from 'vue'
import { useAuthState } from '@/stores/auth.ts'

interface IRouteRecordRaw {
    name: string;
    path: string;
    component: () => Promise<Component>;
    meta: { public?: boolean; }
}

const routes: IRouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@/views/LoginView.vue'),
        meta: { public: true },
        name: 'login'
    }
]

for (const item of MENU_ITEMS) {
    routes.push({
        path: item.path,
        component: item.component,
        name: item.id
    })
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Возврат к верхней части страницы при навигации
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    const authState = useAuthState()
    // Если маршрут публичный - разрешаем доступ
    if (to?.meta?.public) {
        if (authState.userAuthenticate) {
            next({name: MENU_ITEMS[0].id});
        } else {
            next();
        }
        return;
    }

    // Проверяем аутентификацию пользователя
    if (authState.userAuthenticate) {
        // Пользователь аутентифицирован - разрешаем доступ
        next()
    } else {
        // Пользователь не аутентифицирован - перенаправляем на страницу логина
        next({
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        })
    }
})

export default router
