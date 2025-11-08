<script setup lang="ts">
import {
    IftaLabel,
    IconField,
    InputIcon,
    InputText,
    Password,
    Button,
    SelectButton,
} from 'primevue'
import { type Ref, ref } from 'vue'

const loginData = ref({
    login: '',
    password: '',
})

const registerData = ref({
    name: '',
    surname: '',
    patronymic: '',
    date_birthday: '',
    login: '',
    password: '',
    password_confirmation: '',
    default_post_visible: 'all',
    default_profile_visible: 'all',
})

const loading = ref(false)
const load = async (): Promise<void> => {
    loading.value = true
    return
}

const currentViewForm: Ref<'login' | 'register'> = ref('login')
const viewOptions: Ref<{ value: 'login' | 'register'; name: string }[]> = ref([
    { value: 'login', name: 'Вход' },
    { value: 'register', name: 'Регистрация' },
])
</script>

<template>
    <div class="position-relative LoginView__wrapper full-size flex flex-center">
        <SelectButton
            class="t-0 position-absolute"
            v-model="currentViewForm"
            :options="viewOptions"
            optionLabel="name"
            optionValue="value"
            dataKey="value"
        />
        <div
            class="LoginView__form flex border-radius overflow-hidden box-shadow"
            v-if="currentViewForm === 'login'"
        >
            <div class="LoginView__form-image half-size-w position-relative full-size-h box-shadow">
                <img
                    class="position-absolute full-size"
                    src="@/assets/images/LoginView.jpg"
                    alt="Человек, идущий к горам"
                />
            </div>
            <div class="LoginView__form-login half-size-w flex flex-center flex-column">
                <IftaLabel class="half-size-w">
                    <IconField>
                        <InputIcon>
                            <i class="fa fa-user"></i>
                        </InputIcon>
                        <InputText
                            class="full-size-w"
                            id="login"
                            name="login"
                            v-model="loginData.login"
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
                            v-model="loginData.password"
                            toggleMask
                            :disabled="!loginData.login"
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
                    :loading="loading"
                    @click="load"
                />
                <div class="half-size-w flex flex-jc-center mt-sm text-xs">
                    <span
                        >Еще не следите за настроением?
                        <span
                            class="transition link-hovered cursor-pointer"
                            @click="currentViewForm = 'register'"
                            >Начать!</span
                        >
                    </span>
                </div>
            </div>
        </div>
        <div
            class="LoginView__form flex border-radius overflow-hidden box-shadow"
            v-if="currentViewForm === 'register'"
        >
            <div class="LoginView__form-register half-size-w">
                <div class="LoginView__form-register_step1 full-size flex flex-center flex-column gap-xs">
                    <IftaLabel class="half-size-w">
                        <IconField>
                            <InputIcon>
                                <i class="fa fa-user"></i>
                            </InputIcon>
                            <InputText
                                class="full-size-w"
                                id="name"
                                name="name"
                                v-model="registerData.name"
                                placeholder="Ваше имя"
                            />
                        </IconField>
                        <label for="name">Имя</label>
                    </IftaLabel>
                    <IftaLabel class="half-size-w">
                        <IconField>
                            <InputIcon>
                                <i class="fa fa-user"></i>
                            </InputIcon>
                            <InputText
                                class="full-size-w"
                                id="surname"
                                name="surname"
                                v-model="registerData.surname"
                                placeholder="Ваша фамилия"
                            />
                        </IconField>
                        <label for="surname">Фамилия</label>
                    </IftaLabel>
                    <IftaLabel class="half-size-w">
                        <IconField>
                            <InputIcon>
                                <i class="fa fa-user"></i>
                            </InputIcon>
                            <InputText
                                class="full-size-w"
                                id="patronymic"
                                name="patronymic"
                                v-model="registerData.patronymic"
                                placeholder="Ваше отчетсво"
                            />
                        </IconField>
                        <label for="patronymic">Отчество</label>
                    </IftaLabel>
                    <Button
                        class="half-size-w mt-sm"
                        type="button"
                        label="Далее"
                        icon="fa fa-unlock"
                        :loading="loading"
                        @click="load"
                    />
                </div>
            </div>
            <div class="LoginView__form-image half-size-w position-relative full-size-h box-shadow">
                <img
                    class="position-absolute full-size"
                    src="@/assets/images/RegisterView.jpg"
                    alt="Человек, на вершине горы"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.LoginView__form {
    width: 80%;
    height: 80%;
}

.LoginView__form-login,
.LoginView__form-register {
    background-color: var(--secondary-background-color);
}

@media screen and (width < 1300px) {
    .LoginView__form-image {
        display: none;
    }

    .LoginView__form-login, .LoginView__form-register {
        width: 100%;
    }
}
</style>
