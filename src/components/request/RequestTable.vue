<template>
    <h4
        class="text-center"
        v-if="!requests.length"
    >Заявок пока нет</h4>

    <table
        class="table"
        v-else
    >
        <thead>
            <tr>
                <th>#</th>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Действие</th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="(request, index) in requests"
                :key="request.id"
            >
                <td> {{ index + 1 }} </td>
                <td> {{ request.name }} </td>
                <td> {{ request.phone }} </td>
                <td> {{ formatCurrency(request.amount) }} </td>
                <td>
                    <app-status :type="request.status"></app-status>
                </td>
                <td>
                    <router-link
                        :to="{
                            name: 'Request',
                            params: {
                                id: request.id,
                            },
                        }"
                        v-slot="{ navigate }"
                        custom
                    >
                        <button
                            class="btn"
                            @click="navigate"
                        >Открыть</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import formatCurrency from '@/utils/format-currency';
import AppStatus from '@/components/ui/AppStatus';

export default {
    props: ['requests'],
    setup() {
        return {formatCurrency}
    },
    components: {AppStatus},
}
</script>
