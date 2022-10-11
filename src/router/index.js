import { createRouter, createWebHistory } from 'vue-router'
import Notifications from '@/views/Notifications.vue'
import Support from '@/views/Support.vue'

const routes = [
    {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications
    },
    {
        path: '/support',
        name: 'Support',
        component: Support
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router