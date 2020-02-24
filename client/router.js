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
        path: '/learn/lib',
        name: 'learn_lib',
        meta: { title: 'Библиотека' },
        component() {
            return import('./views/learn/Lib')
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
        path: '/githubStars',
        name: 'github_stars',
        meta: { title: 'GitHub Stars' },
        component() {
            return import('./views/GithubStars')
        }
    },
    {
        path: '/overwatch',
        name: 'overwatch',
        meta: { title: 'Overwatch - Гайды' },
        component() {
            return import('./views/Overwatch')
        }
    },
    {
        path: '/bookmarks',
        name: 'bookmarks',
        meta: { title: 'Закладки' },
        component() {
            return import('./views/Bookmarks')
        }
    },
    {
        path: '/habr',
        name: 'habr',
        meta: { title: 'Хабр' },
        component() {
            return import('./views/Habr')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
