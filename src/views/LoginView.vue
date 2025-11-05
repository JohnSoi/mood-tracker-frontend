<script setup lang="ts">
    import {IftaLabel, IconField, InputIcon, InputText, Password, Button} from 'primevue';
    import { ref } from 'vue'

    const loginData = ref({
        login: '',
        password: ''
    });

    const loading = ref(false);
    const load = async (): Promise<void>  => {
        return;
    }
</script>

<template>
    <div class="LoginView__wrapper full-size flex flex-center">
        <div class="LoginView__form">
            <IftaLabel class="full-size-w">
                <IconField>
                    <InputIcon>
                        <i class="fa fa-user"></i>
                    </InputIcon>
                    <InputText class="full-size-w" id="login" name="login" v-model="loginData.login" placeholder="Ваше имя пользователя" />
                </IconField>
                <label for="login">Логин</label>
            </IftaLabel>
            <IftaLabel class="mt-sm">
                <IconField>
                    <InputIcon>
                        <i class="fa fa-key"></i>
                    </InputIcon>
                    <Password v-model="loginData.password" toggleMask :disabled="!loginData.login" placeholder="Ваш пароль"/>
                </IconField>
                <label for="password">Пароль</label>
            </IftaLabel>
            <Button class="full-size-w mt-sm" type="button" label="Войти" icon="pi pi-search" :loading="loading" @click="load" />
        </div>
    </div>
</template>

<style scoped>

</style>
