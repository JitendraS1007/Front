import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token:null
  },
  mutations: {
    setToken(state, payload){
      state.token =  payload
    }
  },
  actions: {
   
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  
  }
});
