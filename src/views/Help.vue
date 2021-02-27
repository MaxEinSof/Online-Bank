<template>
    <app-page
        title="Помощь"
        back
    >
        <question-item
            v-for="question in questions"
            :key="question.title"
            :question="question"
        ></question-item>
    </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage';
import QuestionItem from '@/components/question/QuestionItem';

export default {
    setup() {
        const questions = [
            {
                title: 'Что есть в данной системе?',
                text: 'Тут есть всё, для того чтобы смотреть, какие заявки добавлял пользователь.',
            },
            {
                title: 'Как тут работает авторизация?',
                text: 'Всё реализовано через Firebase.',
            },
        ];

        return {questions}
    },
    components: {AppPage, QuestionItem},
}
</script>
