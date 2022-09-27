import http from "../../services/WebpageService";

const state = {
  teachers: [],
  staff: [],
};

const mutations = {
  setTeachers(state, payload) {
    state.teachers = payload;
  },
  setStaff(state, payload) {
    state.staff = payload;
  },
};

const actions = {
  async getTeachers({ commit }) {
    try {
      const res = await http.get("personnel/filter/teacher");
      if (res.data.success) {
        const data = res.data.data;
        commit("setTeachers", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getStaff({ commit }) {
    try {
      const res = await http.get("personnel/filter/staff");
      if (res.data.success) {
        const data = res.data.data;
        commit("setStaff", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  teachers: (state) => state.teachers,
  staff: (state) => state.staff,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
