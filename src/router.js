
import { defineAsyncComponent } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachesList from './pages/coaches/CoachesList.vue'

import ContactCoach from './pages/requests/ContactCoach.vue'

import UserAuth from './pages/auth/UserAuth.vue'

import NotFound from './pages/NotFound.vue'

import store from './store';

const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'))
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived.vue'))

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetails,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        {
            path: '/register', component: CoachRegistration, meta: { requiresAuth: true }, beforeEnter(from, to, next) {
                if (store.getters['coaches/isCoach']) {
                    next('/coaches')
                } else {
                    next()
                }
            },
        },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresNotAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresNotAuth && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next()
    }
})

export default router;