import { createRouter, createWebHistory } from "vue-router";
import Notifications from "@/views/Notifications.vue";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";
import OrgRegister from "@/views/OrgRegister.vue";
import Support from "@/views/Support.vue";
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
      next()
    }
  } else {
    next()
  }
})

export default router;
