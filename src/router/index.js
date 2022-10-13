import { createRouter, createWebHistory } from "vue-router";
import Notifications from "@/views/Notifications.vue";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";
import OrgRegister from "@/views/OrgRegister.vue";
import Support from "@/views/Support.vue";
import NoPageFound from "@/views/NoPageFound.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "SignUpView",
    component: SignUpView,
  },
  {
    path: "/volunteer/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/volunteer/register",
    name: "VolunteerRegister",
    component: VolunteerRegister,
  },
  {
    path: "/organisation/register",
    name: "OrgRegister",
    component: OrgRegister,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/support",
    name: "Support",
    component: Support,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NoPageFound,
  },
  {
    path: "/volunteer",
    name: "UserDashboard",
    component: UserDashboard,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = (store.getters.getAuth)
  if (to.meta.requiresAuth) {
    if (!auth) {
      if (store.state.userType == "User") {
        next('volunteer/login')
      } else if (store.state.userType == "Organisation") {
        next('organisation/login')
      } else {
        next('/')
      }   
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
