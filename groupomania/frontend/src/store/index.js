import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      name: "",
      id: 0,
      img:"",
      isAdmin: 0,
    },
    token: "",
  },
  getters: {
    isAuthenticated: (state) => !!state.user.id > 0,
    isAdmin: (state) => !!state.user.isAdmin == 1,
  },

  mutations: {
    setUser(state, user) {
      state.user.name = user.name;
      state.user.id = user.id;
      state.user.img = user.img;
      state.user.isAdmin = user.isAdmin;
    },
    setToken(state, token) {
      state.token = token;
    },
  },

  actions: {},
  modules: {},
});
