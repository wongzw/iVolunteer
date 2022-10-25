import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

export default createStore({
  state: {
    userType: "",
    id: "",
    email: "",
    auth: false,
    details: "",
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
  mutations: {
    resetState(state) {
      (state.userType = ""),
        (state.id = ""),
        (state.email = ""),
        (state.auth = false),
        (state.details = "");
    },
    updateVolunteer(state, payload) {
      state.userType = "Volunteer";
      state.id = payload.uid;
      state.email = payload.email;
      state.auth = true;
    },

    updateOrganisation(state, payload) {
      state.userType = "Organisation";
      state.id = payload.uid;
      state.email = payload.email;
      state.auth = true;
    },
  },
  getters: {
    getAuth: function (state) {
      return state.auth;
    },
    getId: function (state) {
      return state.id;
    },

    getType: function (state) {
      return state.userType;
    },

    getEmail: function (state) {
      return state.email;
    },

    getSidebarStatus: function (state) {
      return state.sidebarCollapsed;
    },
  },
});
