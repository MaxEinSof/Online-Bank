import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export function useRequestValidation(fn) {
    const { handleSubmit, isSubmitting } = useForm({
        initialValues: {
            status: 'active',
        },
    });

    const {
        value: name,
        errorMessage: nameError,
        handleBlur: nameBlur
    } = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите ФИО')
    );

    const {
        value: phone,
        errorMessage: phoneError,
        handleBlur: phoneBlur
    } = useField(
        'phone',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите телефон')
    );

    const {
        value: amount,
        errorMessage: amountError,
        handleBlur: amountBlur
    } = useField(
        'amount',
        yup
            .number()
            .required('Пожалуйста введите сумму заявки')
            .min(0, 'Сумма не может быть меньше 0')
    );

    const { value: status } = useField('status');

    const onSubmit = handleSubmit(fn);

    return {
        name,
        nameError,
        nameBlur,
        phone,
        phoneError,
        phoneBlur,
        amount,
        amountError,
        amountBlur,
        status,
        onSubmit,
        isSubmitting,
    }
}
