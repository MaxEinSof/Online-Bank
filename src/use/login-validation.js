import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export function useLoginValidation() {
    const store = useStore();
    const router = useRouter();
    const { handleSubmit, isSubmitting, submitCount } = useForm();

    const {
        value: email,
        errorMessage: emailError,
        handleBlur: emailBlur
    } = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите email')
            .email('Необходимо ввести корректный email')
    );

    const MIN_LENGTH = 6;

    const {
        value: password,
        errorMessage: passwordError,
        handleBlur: passwordBlur
    } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите пароль')
            .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
    );

    const isTooManyAttempts = computed(() => submitCount.value >= 3);

    watch(isTooManyAttempts, value => {
        if (value) {
            setTimeout(() => submitCount.value = 0, 3000);
        }
    });

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values);
            router.push('/');
        } catch (e) {
        }
    });

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    }
}
