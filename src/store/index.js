import { createStore } from "vuex";

import coachesModule from './modules/coaches'
import requestsModule from './modules/requests'
import authModule from "./modules/auth";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    },
    
    /* mutations: {
        setUserId(state, payload) {
            state.userId = payload;
        }
    } */
})


export default store;