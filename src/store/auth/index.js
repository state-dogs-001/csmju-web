//? API Service
import mju from "@/services/MJUService";
import auth from "@/services/AuthService";
import http from "@/services/WebpageService";

//? Router
import router from "@/router";

//? Sweetalert2
import Swal from "sweetalert2";

const state = {};

const mutations = {
  setAdmin(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
  },

  setPersonnel(state, payload) {
    const permission = { role: 1 };
    localStorage.setItem("permission", JSON.stringify(permission));
    localStorage.setItem("user", JSON.stringify(payload));
  },

  setStudent(state, payload) {
    const permission = { role: 2 };
    localStorage.setItem("permission", JSON.stringify(permission));
    localStorage.setItem("user", JSON.stringify(payload));
  },
};

const actions = {
  async login({ commit }, { username, password }) {
    //? If user name is email it mean user is admin or personnel
    //? If not user is student
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
      //? Call personnel login function
      personnelLogin({ commit }, { username, password });
    } else {
      //? Call student login function
      studentLogin({ commit }, { username, password });
    }
  },
};

//? Set default alert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

//? Admin login function
const adminLogin = async ({ commit }, { username, password }) => {
  try {
    let form = new FormData();
    form.append("email", username);
    form.append("password", password);

    const res = await auth.post("auth/signin", form);
    if (res.data.success && res.data.user.role == "admin") {
      //? Login success
      commit("setAdmin", res.data);
      Toast.fire({
        icon: "success",
        title: "กำลังเข้าสู่ระบบ",
      }).then(() => {
        router.push({ name: "Dashboard" });
      });
    } else {
      //! Invalid username or password
      let msg = res.data.message;
      throw new Error(msg);
    }
  } catch (err) {
    if (err) {
      //! Error login / Error server
      Toast.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
      });
    }
  }
};

//? Personnel login function
const personnelLogin = async ({ commit }, { username, password }) => {
  try {
    const form = {
      username: username,
      password: password,
    };
    const res = await mju.post("login/mju/ad", form);
    if (res.data.status === "success" && res.data.type[0] == "personnel") {
      //? Login success
      commit("setPersonnel", res.data);
      Toast.fire({
        icon: "success",
        title: "กำลังเข้าสู่ระบบ",
      }).then(() => {
        //? Call LoginCheck function to save user login history
        //? then redirect to personnel service page
        loginCheck();
        router.push({ name: "PersonnelService" });
      });
    } else {
      //? Call admin login function
      adminLogin({ commit }, { username, password });
    }
  } catch (err) {
    if (err) {
      //! Error login
      Toast.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
      });
    }
  }
};

//? Student login function
const studentLogin = async ({ commit }, { username, password }) => {
  try {
    const form = {
      username: "mju" + username,
      password: password,
    };
    const res = await mju.post("login/mju/ad", form);
    if (res.data.status === "success" && res.data.type[0] == "student") {
      //? Login success
      commit("setStudent", res.data);
      Toast.fire({
        icon: "success",
        title: "กำลังเข้าสู่ระบบ",
      }).then(() => {
        //? Call LoginCheck function to save user login history
        //? then redirect to student service page
        loginCheck();
        router.push({ name: "StudentService" });
      });
    } else {
      throw new Error("Error, Invalid username or password");
    }
  } catch (err) {
    if (err) {
      //! Error login
      Toast.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
      });
    }
  }
};

//? Function to save user data to db
const loginCheck = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let email = user.email;
  let type = user.type[0];
  let device = navigator.userAgent;

  let data = new FormData();
  data.append("email", email);
  data.append("user_type", type);
  data.append("device", device);

  try {
    await http.post("checksignin/new", data);
  } catch (err) {
    console.log(err);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
