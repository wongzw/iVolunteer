import { createStore } from 'vuex'

export default createStore({
    state: {
        userType: '',
        id: '',
        email: '',
        auth: false
    },
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