import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import TheNotifications from "@/views/TheNotifications.vue";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";
import OrgRegister from "@/views/OrgRegister.vue";
import TheSupport from "@/views/TheSupport.vue";
import NoPageFound from "@/views/NoPageFound.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import store from "@/store";

const routes = [
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    meta : {
      redirect: true
    }
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
    name: "TheNotifications",
    component: TheNotifications,
  },
  {
    path: "/support",
    name: "TheSupport",
    component: TheSupport,
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
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = (store.getters.getAuth)
  const userType = (store.state.userType)
  if (auth & to.meta.redirect) {
    if (userType == 'Volunteer') {
      next()
      //next('volunteer')
    } else {
      next('organisation')
    }
  }
  else if (to.meta.requiresAuth) {
    if (!auth) {
      next('/login')
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
