import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/learn/theory',
        name: 'learn_theory',
        meta: { title: 'Теория' },
        component() {
            return import('./views/learn/Theory')
        }
    },
    {
        path: '/learn/practice',
        name: 'learn_practice',
        meta: { title: 'Практика' },
        component() {
            return import('./views/learn/Practice')
        }
    },
    {
        path: '/learn/progress',
        name: 'learn_progress',
        meta: { title: 'Прогресс' },
        component() {
            return import('./views/learn/Advance')
        }
    },
    {
        path: '/rest',
        name: 'rest',
        meta: { title: 'REST' },
        component() {
            return import('./views/REST')
        }
    },
    {
        path: '/rpc',
        name: 'rpc',
        meta: { title: 'RPC' },
        component() {
            return import('./views/RPC')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
