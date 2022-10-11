import { createRouter, createWebHistory } from "vue-router";
import Notifications from '@/views/Notifications.vue'
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";
import OrgRegister from "@/views/OrgRegister.vue";
import Support from '@/views/Support.vue'

const routes = [
    {
        path: '/volunteer/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/volunteer/register',
        name: 'VolunteerRegister',
        component: VolunteerRegister
    },
    {
        path: '/organisation/register',
        name: 'OrgRegister',
        component: OrgRegister
    },
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