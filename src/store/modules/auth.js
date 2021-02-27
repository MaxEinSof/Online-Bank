import axios from 'axios';
import getErrorMessage from '@/utils/get-error-message';

const TOKEN_KEY = 'jwt-token';

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        }
    },
    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(_, getters) {
            return !!getters.token;
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    },
    actions: {
        async login({ commit, dispatch }, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`;
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true,
                });

                commit('setToken', data.idToken);
                commit('clearMessage', null, {root: true});

            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: getErrorMessage(e.response.data.error.message),
                }, {root: true});

                throw new Error();
            }
        },
    },
}
