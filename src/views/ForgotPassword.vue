<script setup lang="ts">

import { Button, IconField, IftaLabel, InputIcon, InputText, SelectButton } from 'primevue'
import { ref, Ref } from 'vue'

const forgotData: Ref<{login: string; email: string}> = ref({
    login: '',
    email: ''
});

const currentField: Ref<"login" | "email"> = ref("login");

const selectFieldSource: [{name: string; value: string}] = [
    {
        name: "По логину",
        value: "login"
    },
    {
        name: "По почте",
        value: "email"
    }
];

const forgotInProcess: Ref<boolean> = ref(false);
</script>

<template>
    <div class="position-relative ForgotPassword__wrapper full-size flex flex-center">
        <div class="ForgotPassword__form full-size flex flex-jc-center">
            <SelectButton
                class="t-0 position-absolute"
                v-model="currentField"
                :options="selectFieldSource"
                optionLabel="name"
                optionValue="value"
                dataKey="value"
            />
            <div class="ForgotPassword__image half-size-w position-relative full-size-h box-shadow">
                <img
                    class="position-absolute full-size"
                    src="@/assets/images/LoginView.jpg"
                    alt="Человек, идущий к горам"
                />
            </div>
            <div class="ForgotPassword__content half-size-w flex flex-center flex-column">
                <IftaLabel class="half-size-w" v-if="currentField === 'login'">
                    <IconField>
                        <InputIcon>
                            <i class="fa fa-user"></i>
                        </InputIcon>
                        <InputText
                            class="full-size-w"
                            id="login"
                            name="login"
                            v-model="forgotData.login"
                            placeholder="Ваше имя пользователя"
                        />
                    </IconField>
                    <label for="login">Логин</label>
                </IftaLabel>
                <IftaLabel class="half-size-w" v-if="currentField === 'email'">
                    <IconField>
                        <InputIcon>
                            <i class="fa fa-at"></i>
                        </InputIcon>
                        <InputText
                            class="full-size-w"
                            id="email"
                            name="email"
                            v-model="forgotData.email"
                            placeholder="Ваша электронная почта"
                        />
                    </IconField>
                    <label for="email">Электронная почта</label>
                </IftaLabel>
                <div class="half-size-w flex flex-jc-end mt-sm">
                    <router-link class="text-xs link-hovered transition" to="/login">
                        Я вспомнил!
                    </router-link>
                </div>
                <Button
                    class="half-size-w mt-sm"
                    type="button"
                    label="Восстановить"
                    icon="fa fa-arrows-rotate"
                    :loading="forgotInProcess"
                    @click="login"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.ForgotPassword__form {
    width: 80%;
    height: 80%;
}

.ForgotPassword__content {
    background-color: var(--secondary-background-color);
}

@media screen and (width < 1300px) {
    .ForgotPassword__image {
        display: none;
    }

    .ForgotPassword__content {
        width: 100%;
    }
}
</style>
