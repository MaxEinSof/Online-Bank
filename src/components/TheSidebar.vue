<template>
    <div
        class="sidebar"
        v-if="sidebar"
    >
        <span
            class="sidebar-close"
            @click="close"
        >&times;</span>

        <div class="sidebar-content">
            <p>Добро пожаловать в систему по учёту завок в нашем банке. Здесь вы найдёте исчерпывающую информацию про систему и заявки.</p>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const sidebar = computed(() => store.getters.sidebar);

        function close() {
            store.commit('closeSidebar');
        }

        return {sidebar, close}
    },
}
</script>
