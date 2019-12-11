import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/learn/theory',
        name: 'learn_theory',
        component() {
            return import('./views/learn/Theory')
        }
    },
    {
        path: '/learn/practice',
        name: 'learn_practice',
        component() {
            return import('./views/learn/Practice')
        }
    },
    {
        path: '/learn/progress',
        name: 'learn_progress',
        component() {
            return import('./views/learn/Advance')
        }
    },
    {
        path: '/test',
        name: 'test',
        component() {
            return import('./views/ModelTest')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
