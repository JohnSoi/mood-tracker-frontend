<script setup lang="ts">
import type { IFormData } from '@/interfases'
import { IftaLabel, IconField, InputIcon, InputText, Button, Message, DatePicker } from 'primevue'
import { useBaseForm } from '@/composables/useBaseForm.ts'

const props = defineProps<IFormData>()

const { values, fieldErrors, validateAndNext, btnIsLoading } = useBaseForm(props)

</script>

<template>
    <div class="BaseForm__wrapper full-size flex flex-center flex-column">
        <IftaLabel class="half-size-w mb-md" v-for="item in items" :key="item.id">
            <IconField>
                <InputIcon>
                    <i :class="item.icon"></i>
                </InputIcon>
                <InputText
                    class="full-size-w"
                    :id="item.id"
                    :name="item.id"
                    v-model="values[item.id] as string"
                    :invalid="!!fieldErrors[item.id]"
                    :placeholder="item.placeholder"
                    v-if="['text', 'password', 'email'].includes(item.type)"
                />
                <DatePicker
                    class="full-size-w"
                    :id="item.id"
                    :name="item.id"
                    v-model="values[item.id] as Date"
                    dateFormat="dd MM yy"
                    placeholder="Ваша дата рождения"
                    :min-date="item.minDate"
                    :max-date="item.maxDate"
                    :invalid="!!fieldErrors[item.id]"
                    v-if="item.type === 'date'"
                />
                <Message
                    v-for="error in fieldErrors[item.id]"
                    :key="error"
                    size="small"
                    severity="error"
                >
                    {{ error }}
                </Message>
            </IconField>
            <label :for="item.id">{{ item.label }}</label>
        </IftaLabel>
        <div class="flex half-size-w gap-md flex-center">
            <Button
                v-for="button in buttons"
                :key="button.id"
                class="half-size-w mt-sm"
                type="button"
                :severity="button.style || 'primary'"
                :label="button.label"
                :icon="button.icon"
                :loading="btnIsLoading[button.id]"
                @click="validateAndNext(button)"
            />
        </div>
    </div>
</template>
