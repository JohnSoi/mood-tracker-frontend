<script setup lang="ts">
import { Button, IconField, IftaLabel, InputIcon, InputText, Password } from 'primevue';
import { useLoginForm } from '@/composables/auth/useLoginForm.ts'

const {
    loginFormData,
    authInProcess,
    login
} = useLoginForm();

defineEmits(['changeView'])
</script>

<template>
    <div class="LoginForm__wrapper full-size flex">
        <div class="LoginForm__image half-size-w position-relative full-size-h box-shadow">
            <img
                class="position-absolute full-size"
                src="@/assets/images/LoginView.jpg"
                alt="Человек, идущий к горам"
            />
        </div>
        <div class="LoginForm__content half-size-w flex flex-center flex-column">
            <IftaLabel class="half-size-w">
                <IconField>
                    <InputIcon>
                        <i class="fa fa-user"></i>
                    </InputIcon>
                    <InputText
                        class="full-size-w"
                        id="login"
                        name="login"
                        v-model="loginFormData.login"
                        placeholder="Ваше имя пользователя"
                    />
                </IconField>
                <label for="login">Логин</label>
            </IftaLabel>
            <IftaLabel class="half-size-w mt-sm">
                <IconField class="full-size-w">
                    <InputIcon>
                        <i class="fa fa-key"></i>
                    </InputIcon>
                    <Password
                        class="full-size-w"
                        v-model="loginFormData.password"
                        toggleMask
                        :disabled="!loginFormData.login"
                        placeholder="Ваш пароль"
                    />
                </IconField>
                <label for="password">Пароль</label>
            </IftaLabel>
            <div class="half-size-w flex flex-jc-end mt-sm">
                <router-link class="text-xs link-hovered transition" to="/forgot-password">
                    Забыли пароль?
                </router-link>
            </div>
            <Button
                class="half-size-w mt-sm"
                type="button"
                label="Войти"
                icon="fa fa-unlock"
                :loading="authInProcess"
                @click="login"
            />
            <div class="half-size-w flex flex-jc-center mt-sm text-xs">
                <span
                    >Еще не следите за настроением?
                    <span
                        class="transition link-hovered cursor-pointer"
                        @click="$emit('changeView')"
                        >Начать!</span
                    >
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.LoginForm__content{
    background-color: var(--secondary-background-color);
}

@media screen and (width < 1300px) {
    .LoginForm__image {
        display: none;
    }

    .LoginForm__content {
        width: 100%;
    }
}
</style>
