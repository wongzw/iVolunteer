import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import TheNotifications from "@/views/TheNotifications.vue";
import LoginView from "@/views/LoginView.vue";
import VolunteerRegister from "@/views/register/VolunteerRegister.vue";
import OrgRegister from "@/views/register/OrgRegister.vue";
import TheSupport from "@/views/TheSupport.vue";
import NoPageFound from "@/views/NoPageFound.vue";
import indvolEventView from "@/views/volunteers/indvolEventView.vue";
import EventCreation from "@/views/organisations/EventCreationView.vue";
import UserDashboard from "@/views/volunteers/UserDashboardView.vue";
import VolunteerBoard from "@/views/onboarding/VolunteerBoard.vue";
import OrgBoard from "@/views/onboarding/OrgBoard.vue";
import VolunteerProfile from "@/views/volunteers/VolunteerProfileView.vue";
import OrgProfileView from "@/views/organisations/OrgProfileView.vue";
import OrgDashboardView from "@/views/organisations/OrgDashboardView.vue";
import OrgEventView from "@/views/organisations/OrgEventView.vue";
import RewardsRedemption from "@/views/volunteers/RewardsRedemption.vue";

//Shell Views
import RegisterShell from "@/views/register/RegisterShell.vue";
import OnboardShell from "@/views/onboarding/OnboardShell.vue";
import VolunteerShell from "@/views/volunteers/VolunteerShell.vue";
import OrganisationShell from "@/views/organisations/OrganisationShell.vue";
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
  // Register Views
  {
    path: "/register",
    name: "RegisterShell",
    component: RegisterShell,
    children: [
      {
        path: "volunteer",
        name: "VolunteerRegister",
        component: VolunteerRegister,
      },
      {
        path: "organisation",
        name: "OrgRegister",
        component: OrgRegister,
      },
    ],
  },
  // Onboarding Views
  {
    path: "/onboard",
    name: "OnboardShell",
    component: OnboardShell,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "volunteer",
        name: "VolunteerBoard",
        component: VolunteerBoard,
      },
      {
        path: "organisation",
        name: "OrgBoard",
        component: OrgBoard,
      },
    ],
  },
  // User Views
  {
    path: "/volunteer",
    name: "VolunteerShell",
    component: VolunteerShell,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "UserDashboard",
        component: UserDashboard,
      },
      {
        path: "profile",
        name: "VolunteerProfile",
        component: VolunteerProfile,
      },
      {
        path: "/event/:catchAll(.*)",
        name: "indvolEventView",
        component: indvolEventView,
      },
      {
        path: "rewards",
        name: "RewardsRedemption",
        component: RewardsRedemption,
      },
    ],
  },
  // Organisations
  {
    path: "/organisation",
    name: "OrganisationShell",
    component: OrganisationShell,
    meta: {
      isOrg: true,
      requiresAuth: true,
    },
    children: [
      {
        path: "profile",
        name: "OrganisationProfile",
        component: OrgProfileView,
      },
      {
        path: "dashboard",
        name: "OrgDashboard",
        component: OrgDashboardView,
      },
      {
        path: "event/:catchAll(.*)",
        name: "OrgEventView",
        component: OrgEventView,
      }
    ],
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
    path: "/event/creation",
    name: "EventCreationView",
    component: EventCreation,
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
      next("/volunteer/dashboard");
    } else {
      next("/organisation");
    }
  } else if (to.meta.requiresAuth) {
    if (!auth) {
      next("/login");
    } else {
      if (userType == "Volunteer" && to.meta.isOrg) {
        next("/volunteer/dashboard")
      } else if (userType == "Organisation" && !to.meta.isOrg) {
        next("/organisation/dashboard")
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
