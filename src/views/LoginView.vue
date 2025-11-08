<script setup lang="ts">
import {
    IftaLabel,
    IconField,
    InputIcon,
    InputText,
    Password,
    Button,
    SelectButton
} from 'primevue'
import { type Ref, ref } from 'vue'

const loginData = ref({
    login: '',
    password: ''
})

const loading = ref(false)
const load = async (): Promise<void> => {
    return
}

const currentViewForm: Ref<'login' | 'register'> = ref('login')
const viewOptions: Ref<{ value: 'login' | 'register', name: string }[]> = ref([
    { value: 'login', name: 'Вход' },
    { value: 'register', name: 'Регистрация' }
])
</script>

<template>
    <div class="position-relative LoginView__wrapper full-size flex flex-center">
        <SelectButton style="top: 0" class="position-absolute" v-model="currentViewForm"
                      :options="viewOptions" optionLabel="name" optionValue="value"
                      dataKey="value" />
        <div class="LoginView__form flex border-radius overflow-hidden box-shadow"
             v-if="currentViewForm === 'login'">
            <div class="LoginView__form-image half-size-w position-relative full-size-h">
                <img class="position-absolute full-size" src="@/assets/images/LoginView.jpg"
                     alt="Человек, идущий к горам">
            </div>
            <div class="LoginView__form-login half-size-w flex flex-center flex-column">
                <IftaLabel class="half-size-w">
                    <IconField>
                        <InputIcon>
                            <i class="fa fa-user"></i>
                        </InputIcon>
                        <InputText class="full-size-w" id="login" name="login"
                                   v-model="loginData.login" placeholder="Ваше имя пользователя" />
                    </IconField>
                    <label for="login">Логин</label>
                </IftaLabel>
                <IftaLabel class="half-size-w mt-sm">
                    <IconField class="full-size-w">
                        <InputIcon>
                            <i class="fa fa-key"></i>
                        </InputIcon>
                        <Password class="full-size-w" v-model="loginData.password" toggleMask
                                  :disabled="!loginData.login" placeholder="Ваш пароль" />
                    </IconField>
                    <label for="password">Пароль</label>
                </IftaLabel>
                <div class="half-size-w flex flex-jc-end mt-sm">
                    <router-link class="text-xs link-hovered transition" to="/forgot-password">Забыли
                        пароль?
                    </router-link>
                </div>
                <Button class="half-size-w mt-sm" type="button" label="Войти" icon="fa fa-unlock"
                        :loading="loading" @click="load" />
                <div class="half-size-w flex flex-jc-center mt-sm text-xs">
                    <span>Еще не следите за настроением?
                        <span class="transition link-hovered cursor-pointer" @click="currentViewForm = 'register'">Начать!</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.LoginView__form {
    width: 80%;
    height: 80%;
}

.LoginView__form-login {
    background-color: var(--secondary-background-color);
}

@media screen and (width < 1300px) {
    .LoginView__form-image {
        display: none;
    }

    .LoginView__form-login {
        width: 100%;
    }
}
</style>
