import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Centerinfo from '@/store/modules/Centerinfo.js';

export default createStore({
  state: {

    // User
    userId : '',
    loginUser : false,

    // Center
    searchedCenters: [],
    clickedCenter: {},

  },
  getters: {

    // User
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
    },

    // Center
    getSearchedCenters(state) {
      return state.searchedCenters;
    },
    getClickedCenter(state) {
      return state.clickedCenter;
    },

  },
  mutations: {

    // User
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
    },

    // Center
    mutSetSearchedCenters(state, newSearchedCenters) {
      state.searchedCenters = newSearchedCenters;
    },
    mutSetClickedCenter(state, newClickedCenter) {
      console.log("@@@@ vuex-mutSetClickedCenter 실행\n", newClickedCenter);
      state.clickedCenter = newClickedCenter;
    },

  },
  actions: {

    // User
    setUserId: (context, userId) => {
      context.commit("mutSetUserId", userId);
    },

    // Center
    setSearchedCenters({ commit }, newSearchedCenters) {
      commit("mutSetSearchedCenters", newSearchedCenters);
    },
    setClickedCenter({ commit }, newClickedCenter) {
      commit("mutSetClickedCenter", newClickedCenter);
    },

  },
  
  modules: {
    Centerinfo,
  },
  plugins: [ 
    createPersistedState({
    }),
  ],
  
})
