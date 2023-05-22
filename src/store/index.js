import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Centerinfo from '@/store/modules/Centerinfo.js';

export default createStore({
  state: {

    // User
    userId : '',
    loginUser : false,

    // Center
    recommendedCenters: [],
    searchedCenters: [],
    clickedCenter: {},

    // Map
    clickPosition: [],
    clickAddress: "",
    clickAddressState: "",
    clickAddressCity: "",

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
    getRecommendedCenters(state) {
      return state.recommendedCenters;
    },
    getSearchedCenters(state) {
      return state.searchedCenters;
    },
    getClickedCenter(state) {
      return state.clickedCenter;
    },

    // Map
    getClickPosition(state) {
      return state.clickPosition;
    },
    getClickAddress(state) {
      return state.clickAddress;
    },
    getClickAddressState(state) {
      return state.clickAddressState;
    },
    getClickAddressCity(state) {
      return state.clickAddressCity;
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
    mutSetRecommendedCenters(state, newRecommendedCenters) {
      state.recommendedCenters = newRecommendedCenters;
    },
    mutSetSearchedCenters(state, newSearchedCenters) {
      state.searchedCenters = newSearchedCenters;
    },
    mutSetClickedCenter(state, newClickedCenter) {
      console.log("@@@@ mutSetClickedCenter 실행\n", newClickedCenter);
      state.clickedCenter = newClickedCenter;
    },

    // Map
    mutSetClickPosition(state, newClickPosition) {
      console.log("@@@@ mutSetClickPosition 실행\n", newClickPosition);
      state.clickPosition = newClickPosition;
    },
    mutSetClickAddress(state, newClickAddress) {
      state.clickAddress = newClickAddress;
    },
    mutSetClickAddressState(state, newClickAddressState) {
      state.clickAddressState = newClickAddressState;
    },
    mutSetClickAddressCity(state, newClickAddressCity) {
      state.clickAddressCity = newClickAddressCity;
    },

  },
  actions: {

    // User
    setUserId: (context, userId) => {
      context.commit("mutSetUserId", userId);
    },

    // Center
    setRecommendedCenters({ commit }, newRecommendedCenters) {
      commit("mutSetRecommendedCenters", newRecommendedCenters);
    },
    setSearchedCenters({ commit }, newSearchedCenters) {
      commit("mutSetSearchedCenters", newSearchedCenters);
    },
    setClickedCenter({ commit }, newClickedCenter) {
      commit("mutSetClickedCenter", newClickedCenter);
    },

    // Map
    setClickPosition({ commit }, newClickPosition) {
      commit("mutSetClickPosition", newClickPosition);
    },
    setClickAddress({ commit }, newClickAddress) {
      commit("mutSetClickAddress", newClickAddress);
    },
    setClickAddressState({ commit }, newClickAddressState) {
      commit("mutSetClickAddressState", newClickAddressState);
    },
    setClickAddressCity({ commit }, newClickAddressCity) {
      commit("mutSetClickAddressCity", newClickAddressCity);
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
