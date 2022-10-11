import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";

const routes = [
    {
        path: '/volunteer-login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/volunteer-register',
        name: 'VolunteerRegister',
        component: VolunteerRegister
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router