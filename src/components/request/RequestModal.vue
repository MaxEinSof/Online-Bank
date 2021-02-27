<template>
    <form @submit.prevent="onSubmit">
        <div :class="[
            'form-control',
            {invalid: nameError}
        ]">
            <label for="name">ФИО</label>
            <input
                type="text"
                id="name"
                v-model="name"
                @blur="nameBlur"
            >
            <small v-if="nameError"> {{ nameError }} </small>
        </div>

        <div :class="[
            'form-control',
            {invalid: phoneError}
        ]">
            <label for="phone">Телефон</label>
            <input
                type="text"
                id="phone"
                v-model="phone"
                @blur="phoneBlur"
            >
            <small v-if="phoneError"> {{ phoneError }} </small>
        </div>

        <div :class="[
            'form-control',
            {invalid: amountError}
        ]">
            <label for="amount">Сумма</label>
            <input
                type="number"
                id="amount"
                v-model.number="amount"
                @blur="amountBlur"
            >
            <small v-if="amountError"> {{ amountError }} </small>
        </div>

        <div class="form-control">
            <label for="status">Статус</label>
            <select
                id="status"
                v-model="status"
            >
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button
            class="btn primary"
            type="submit"
            :disabled="isSubmitting"
        >Создать</button>
    </form>
</template>

<script>
import { useStore } from 'vuex';
import { useRequestValidation } from '@/use/request-validation';

export default {
    setup(_, { emit }) {
        const store = useStore();

        async function submit(values) {
            await store.dispatch('request/create', values);
            emit('created');
        }

        return useRequestValidation(submit);
    },
    emits: ['created'],
}
</script>
