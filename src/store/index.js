import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

export default createStore({
    state: {
        userType: '',
        id: '',
        email: '',
        auth: false
    },
    plugins: [createPersistedState({
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
          removeItem: key => Cookies.remove(key)
        }
      })],
    mutations: {
        updateUser(state, payload) {
            state.userType = 'User';
            state.id = payload.id;
            state.email = payload.email;
            state.auth = true;
        },

        updateOrganisation(state, payload) {
            state.id = payload;
        }
    },
    getters: {
        getAuth: function (state) {
            return state.auth;
        },
        getId: function (state) {
            return state.id;
        },

        getType: function(state) {
            return state.userType;
        },

        getEmail: function(state) {
            return state.email;
        }
        
    }
})