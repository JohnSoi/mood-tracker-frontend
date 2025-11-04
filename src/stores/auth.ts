import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

const useAuthState = defineStore('authState', () => {
    const userAuthenticate: Ref<boolean> = ref(false);

    return {
        userAuthenticate,
    }
});

export {useAuthState};
