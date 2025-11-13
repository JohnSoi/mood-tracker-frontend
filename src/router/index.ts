import {
    createRouter,
    createWebHistory, type NavigationGuardNext,
    type RouteLocationNormalizedGeneric,
    type Router
} from "vue-router";
import { MENU_ITEMS } from "@/consts";
import type { Component } from "vue";
import { useAuthState } from "@/stores/auth.ts";
import type { IMenuItem } from "@/interfases/menu.ts";
import type { TAuthStore } from "@/interfases/auth.ts";
import { MetaService } from "@/services/metadata.ts";

interface IRouteRecordRaw {
    name: string;
    path: string;
    component: () => Promise<Component>;
    meta?: { public?: boolean, title: string };
}

const routes: IRouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import("@/views/LoginView.vue"),
        meta: { public: true, title: 'Аутентификация' },
        name: "login"
    }
];

for (const item of MENU_ITEMS) {
    routes.push({
        path: item.path,
        component: item.component,
        name: item.id
    });
}

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

router.beforeEach((to: RouteLocationNormalizedGeneric, _: RouteLocationNormalizedGeneric, next: NavigationGuardNext): void => {
    const authState: TAuthStore = useAuthState();
    MetaService.setTitle(to?.meta?.title as string);

    if (to?.meta?.public) {
        if (authState.userAuthenticate) {
            next({ name: (MENU_ITEMS[0] as IMenuItem).id });
        } else {
            next();
        }
        return;
    }

    if (authState.userAuthenticate) {
        next();
    } else {
        next({
            name: "login",
            query: {
                redirect: to.fullPath
            }
        });
    }
});

export default router;
