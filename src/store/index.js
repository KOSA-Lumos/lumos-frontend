import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    userId : '',
    loginUser : false,
  },
  getters: {
    getUserId: function(state) {
      return state.userId;
    },
    loginUser: function(state){
      return state.loginUser;
    },
    changeLoginUser: function(state) {
      if (state.loginUser == false) {
        console.log("바꾸기성공 false->true");
        state.loginUser = true;
      } else {
        console.log("바꾸기성공 true -> false");
        state.loginUser = false;
      }
    }
  },
  mutations: {
    mutSetUserId: (state, userId) => {
      state.userId = userId;
      state.loginUser = true;
    },
    logout(state){
      state.userId='';
      state.loginUser = false;
    },
    setloginUser(state, value){
      state.loginUser = value;
    }
  },
  actions: {
    setUserId: (context, userId) => {
      context.commit("mutSetUserId", userId);
    },
  },
  
  modules: {
  },
  plugins: [ 
    createPersistedState({
    }),
  ],
  
})
