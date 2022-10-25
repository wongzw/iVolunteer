import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import TheNotifications from "@/views/TheNotifications.vue";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/VolunteerRegister.vue";
import OrgRegister from "@/views/OrgRegister.vue";
import TheSupport from "@/views/TheSupport.vue";
import NoPageFound from "@/views/NoPageFound.vue";
import UserDashboard from "@/views/UserDashboardView.vue";
import EventCreation from "@/views/EventCreationView.vue";
import UserDashboardView from "@/views/UserDashboardView.vue";
import VolunteerBoard from "@/views/VolunteerBoard.vue";
import OrgBoard from "@/views/OrgBoard.vue";
import RewardsRedemption from "@/views/RewardsRedemption.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    meta: {
      redirect: true,
    },
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
    name: "UserDashboardView",
    component: UserDashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/event/creation",
    name: "EventCreationView",
    component: EventCreation,
  },
  {
    path: "/volunteer/onboard",
    name: "VolunteerBoard",
    component: VolunteerBoard,
  },
  {
    path: "/organisation/onboard",
    name: "OrgBoard",
    component: OrgBoard,
  },
  {
    path: "/volunteer/redemption",
    name: "UserRedemption",
    component: RewardsRedemption,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = store.getters.getAuth;
  const userType = store.state.userType;
  if (auth & to.meta.redirect) {
    if (userType == "Volunteer") {
      next("/volunteer");
    } else {
      next("/organisation");
    }
  } else if (to.meta.requiresAuth) {
    if (!auth) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
