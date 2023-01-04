import mju from "@/services/MJUService";
import auth from "@/services/AuthService";
import http from "@/services/WebpageService";
import router from "@/router";

import Swal from "sweetalert2";

const state = {
  student: null,
  teacher: null,
  admin: null,
};

const mutations = {
  setStudent(state, payload) {
    state.student = payload;
  },

  setTeacher(state, payload) {
    state.teacher = payload;
  },

  setAdmin(state, payload) {
    state.admin = payload;
  },
};

const actions = {
  async studentLogin({ commit }, data) {
    try {
      const response = await mju.post("login/mju/ad", data);
      if (
        response.data.status === "success" &&
        response.data.type[0] === "student"
      ) {
        //? Set user and permission to local storage
        localStorage.setItem("user", JSON.stringify(res.data));
        const permission = { role: 2 };
        localStorage.setItem("permission", JSON.stringify(permission));
      }
    } catch (error) {}
  },

  async teacherLogin({ commit }, data) {
    try {
    } catch (error) {}
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
