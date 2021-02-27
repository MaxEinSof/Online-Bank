import store from '@/store';
import axios from '@/axios/request';

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
        }
    },
    getters: {
        requests(state) {
            return state.requests;
        },
        hasRequests(state) {
            return !!state.requests.length;
        },
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },
        removeRequests(state) {
            state.requests = [];
        },
        addRequest(state, request) {
            state.requests.push(request);
        },
    },
    actions: {
        async load({ commit, dispatch, getters }) {
            try {
                const token = store.getters['auth/token'];
                const { data } = await axios.get(`/requests.json?auth=${token}`);

                if (data) {
                    const requests = Object.keys(data).map(id => ({...data[id], id}));
                    commit('setRequests', requests);
                } else if (getters.hasRequests) {
                    commit('removeRequests');
                }

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message,
                }, {root: true});
            }
        },
        async loadById({ dispatch }, id) {
            try {
                const token = store.getters['auth/token'];
                const { data } = await axios.get(`/requests/${id}.json?auth=${token}`);

                return data;

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message,
                }, {root: true});
            }
        },
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token'];
                const { data } = await axios.post(`/requests.json?auth=${token}`, payload);

                commit('addRequest', {
                    id: data.name,
                    ...payload,
                });

                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка успешно создана',
                }, {root: true});

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message,
                }, {root: true});
            }
        },
        async remove({ dispatch }, id) {
            try {
                const token = store.getters['auth/token'];
                await axios.delete(`/requests/${id}.json?auth=${token}`);

                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка успешно удалена',
                }, {root: true});

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message,
                }, {root: true});
            }
        },
        async update({ dispatch }, request) {
            try {
                const token = store.getters['auth/token'];
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request);

                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка успешно обновлена',
                }, {root: true});

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message,
                }, {root: true});
            }
        },
    },
}
