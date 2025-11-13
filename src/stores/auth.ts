import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { TAuthStoreDef } from "@/interfases/auth.ts";

const useAuthState: TAuthStoreDef = defineStore("authState", () => {
    const userAuthenticate: Ref<boolean> = ref(false);

    return {
        userAuthenticate,
    };
});

export { useAuthState };
