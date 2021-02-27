<template>
    <app-loader v-if="loading"></app-loader>

    <app-page
        v-else-if="request"
        title="Заявка"
        back
    >
        <p>
            <strong>Имя владельца:</strong>
            {{ request.name }}
        </p>
        <p>
            <strong>Телефон:</strong>
            {{ request.phone }}
        </p>
        <p>
            <strong>Сумма:</strong>
            {{ formatCurrency(request.amount) }}
        </p>
        <p>
            <strong>Статус:</strong>
            <app-status :type="request.status"></app-status>
        </p>

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
            class="btn danger"
            @click="remove"
        >Удалить</button>

        <button
            class="btn"
            v-if="hasChanges"
            @click="update"
        >Обновить</button>
    </app-page>

    <h3 v-else
        class="text-center text-white"
    >Заявки с ID = {{ id }} нет</h3>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute} from 'vue-router';
import { useStore } from 'vuex';
import AppPage from '@/components/ui/AppPage';
import AppLoader from '@/components/ui/AppLoader';
import AppStatus from '@/components/ui/AppStatus';
import formatCurrency from '@/utils/format-currency';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const loading = ref(true);
        const request = ref({});
        const status = ref();

        onMounted(async () => {
            loading.value = true;
            request.value = await store.dispatch('request/loadById', route.params.id);
            status.value = request.value?.status;
            loading.value = false;
        });

        const hasChanges = computed(() => status.value !== request.value.status);

        async function remove() {
            await store.dispatch('request/remove', route.params.id);
            router.push('/');
        }

        async function update() {
            const updatedRequest = {
                ...request.value,
                status: status.value,
                id: route.params.id,
            };
            await store.dispatch('request/update', updatedRequest);
            request.value.status = status.value;
        }

        return {
            loading,
            request,
            status,
            hasChanges,
            id: route.params.id,
            formatCurrency,
            remove,
            update,
        }
    },
    components: {AppPage, AppLoader, AppStatus},
}
</script>
