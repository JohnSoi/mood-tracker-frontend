import { type Ref, ref } from 'vue'
import type { ILoginForm, ILoginFormComposable } from '@/composables/auth/interfaces.ts'

export function useLoginForm(): ILoginFormComposable {
    const loginFormData: Ref<ILoginForm> = ref({
        login: '',
        password: ''
    });

    const authInProcess: Ref<boolean> = ref(false);

    const login = async (): Promise<boolean> => {
        authInProcess.value = true;
        setTimeout(() => {authInProcess.value = false}, 1000);
        return true;
    }

    return {
        loginFormData,
        authInProcess,
        login
    }
}
