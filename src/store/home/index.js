import http from "../../services/WebpageService";

const state = {
  banners: [],
  newsLimit: [],
};

const mutations = {
  setBanners(state, payload) {
    state.banners = payload;
  },
  setNewsLimit(state, payload) {
    state.newsLimit = payload;
  },
};

const actions = {
  async getBanners({ commit }) {
    try {
      const res = await http.get("banners");
      if (res.data.success) {
        const data = res.data.data;
        commit("setBanners", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getNewsLimit({ commit }) {
    try {
      const res = await http.get("news/limit/3"); //? News limit 3
      if (res.data.success) {
        const data = res.data.data;
        commit("setNewsLimit", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  banners: (state) => state.banners,
  newsLimit: (state) => state.newsLimit,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
