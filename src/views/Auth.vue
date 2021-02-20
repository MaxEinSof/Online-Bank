<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Войти в систему</h1>

        <div :class="[
            'form-control',
            {invalid: emailError}
        ]">
            <label for="email">Почта</label>
            <input
                type="email"
                id="email"
                v-model="email"
                @blur="emailBlur"
            >
            <small v-if="emailError"> {{ emailError }} </small>
        </div>

        <div :class="[
            'form-control',
            {invalid: passwordError}
        ]">
            <label for="password">Пароль</label>
            <input
                type="password"
                id="password"
                v-model="password"
                @blur="passwordBlur"
            >
            <small v-if="passwordError"> {{ passwordError }} </small>
        </div>

        <button
            type="submit"
            class="btn primary"
            :disabled="isSubmitting || isTooManyAttempts"
        >Войти</button>

        <span
            class="text-danger"
            v-if="isTooManyAttempts"
        >Вы слишком часто пытаетесь войти в систему. Попробуйте позже.</span>
    </form>
</template>

<script>
import { useLoginValidation } from "@/use/login-validation";

// import { useForm } from "vee-validate";

export default {
    setup() {
        // const { handleSubmit } = useForm();
        //
        // const onTestSubmit = handleSubmit(values => {
        //     console.log('Form values from component:', values);
        // });

        return {
            ...useLoginValidation(),
            // onTestSubmit
        }
    },
}
</script>
