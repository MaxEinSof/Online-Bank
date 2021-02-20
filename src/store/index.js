import { createStore, createLogger } from 'vuex';
import auth from '@/store/modules/auth';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger());
}

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {auth},
    plugins,
})