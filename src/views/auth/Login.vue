<template>
  <div class="container h-full px-4 mx-auto custom mt-12 mb-24">
    <div class="flex items-center content-center justify-center h-full">
      <div class="w-full px-4 lg:w-4/12">
        <div
          class="cssanimation sequence fadeInBottom relative flex flex-col w-full min-w-0 break-words border-0 rounded-lg shadow-lg bg-blueGray-200"
        >
          <div class="px-6 py-6 mb-0 rounded-t">
            <div class="mb-3 text-center">
              <h4 class="text-xl font-bold text-blueGray-500">เข้าสู่ระบบ</h4>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>

          <!-- Form Login -->
          <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
            <form @submit.stop.prevent="handleSubmit">
              <!-- Username -->
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 text-md font-normal text-blueGray-600"
                  htmlFor="grid-password"
                >
                  <b> ชื่อผู้ใช้งาน </b>
                  <span class="text-xs"> (Username) </span>
                </label>
                <div class="wrapper">
                  <input
                    v-model="username"
                    type="username"
                    class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    placeholder="รหัสนักศึกษา เช่น 6104101301"
                  />

                  <div class="tooltip rounded-lg text-center text-sm">
                    บุคลากรสาขาวิชาฯ กรอกเป็น email
                  </div>
                </div>
              </div>
              <div
                v-if="v$.username.$error"
                class="my-2 text-sm text-left text-red-500"
              >
                {{ v$.username.$errors[0].$message }}
              </div>

              <!-- Password -->
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 text-md font-normal text-blueGray-600"
                  htmlFor="grid-password"
                >
                  <b> รหัสผ่าน </b>
                  <span class="text-xs"> (Password) </span>
                </label>
                <input
                  v-model="password"
                  :type="type"
                  class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  placeholder="รหัสผ่าน เช่น mju@12061998"
                />
                <button @click="submit" type="submit" class="hidden">
                  Submit
                </button>
              </div>
              <div
                v-if="v$.password.$error"
                class="my-2 text-sm text-left text-red-500"
              >
                {{ v$.password.$errors[0].$message }}
              </div>

              <!-- Checkbox -->
              <div class="relative w-full mb-3">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    @click="showPassword"
                    type="checkbox"
                    class="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                  />
                  <span class="ml-2 text-sm text-blueGray-600">
                    แสดงรหัสผ่าน (Show)
                  </span>
                </label>
              </div>

              <!-- Recaptcha -->
              <div class="mb-3 mt-6 block w-full overflow-x-auto">
                <vue-recaptcha
                  :sitekey="siteKey"
                  size="normal"
                  theme="light"
                  data-size="compact"
                  @verify="recaptchaVerified"
                  @expire="recaptchaExpired"
                  ref="vueRecaptcha"
                >
                </vue-recaptcha>
              </div>
              <div
                v-if="v$.verify.$error"
                class="my-2 text-sm text-left text-red-500"
              >
                {{ v$.verify.$errors[0].$message }}
              </div>

              <!-- Button -->
              <div class="mt-6 text-center">
                <button
                  class="w-full px-6 py-3 mb-1 mr-1 text-sm text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? Packages
import vueRecaptcha from "vue3-recaptcha2";
import useValidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
//? APIs
import mju from "@/services/MJUService";
import auth from "@/services/AuthService";
import http from "@/services/WebpageService";
//? Set default sweetalert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});
export default {
  components: {
    vueRecaptcha,
  },
  data() {
    return {
      //? Validate
      v$: useValidate(),

      //? Form values
      username: "",
      password: "",

      //? Type of password
      type: "password",

      //? Recapcha Site Key
      siteKey: import.meta.env.VITE_SITE_KEY,

      //? Recaptcha verification
      verify: null,
    };
  },
  methods: {
    recaptchaVerified(response) {
      this.verify = response;
    },

    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
    },

    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },

    //? Handle submit
    handleSubmit() {
      this.v$.$validate();
      //! Validate's error
      if (this.v$.$error) {
        Toast.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        });
      } else {
        /**
         * ? Check username type is email or not
         * ? If email, it mean user is admin or personnels then call personnelLogin function
         * ? If not, it mean user is student then call studentLogin function
         */
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username)
        ) {
          this.personnelLogin();
        } else {
          this.studentLogin();
        }
      }
    },

    //? Personnel login
    async personnelLogin() {
      try {
        const form = {
          username: this.username,
          password: this.password,
        };
        const res = await mju.post("login/mju/ad", form);
        if (res.data.status === "success" && res.data.type[0] == "personnel") {
          //? Login success save data to local storage
          let permission = { role: 1 };
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("permission", JSON.stringify(permission));

          //? Alert
          Toast.fire({
            icon: "success",
            title: "กำลังเข้าสู่ระบบ",
          }).then(() => {
            //? Call LoginCheck function to save user login history
            //? then redirect to personnel service page
            this.loginCheck();
            this.$router.push({ name: "PersonnelService" });
          });
        } else {
          //? Call adminLogin function to check user is admin or not
          this.adminLogin();
        }
      } catch (err) {
        if (err) {
          Toast.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
          }).then(() => {
            //? Reset password
            this.password = "";
          });
        }
      }
    },

    //? Student login
    async studentLogin() {
      try {
        const form = {
          username: "mju" + this.username,
          password: this.password,
        };
        const res = await mju.post("login/mju/ad", form);
        if (res.data.status === "success" && res.data.type[0] == "student") {
          //? Login success save data to local storage
          let permission = { role: 2 };
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("permission", JSON.stringify(permission));

          //? Alert
          Toast.fire({
            icon: "success",
            title: "กำลังเข้าสู่ระบบ",
          }).then(() => {
            //? Call LoginCheck function to save user login history
            //? then redirect to student service page
            this.loginCheck();
            this.$router.push({ name: "StudentService" });
          });
        } else {
          throw new Error("Login failed");
        }
      } catch (err) {
        if (err) {
          Toast.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
          }).then(() => {
            //? Reset password
            this.password = "";
          });
        }
      }
    },

    //? Admin login
    async adminLogin() {
      try {
        let data = new FormData();
        data.append("email", this.username);
        data.append("password", this.password);
        const res = await auth.post("auth/signin", data);
        if (res.data.success && res.data.user.role == "admin") {
          //? Login success save data to local storage
          localStorage.setItem("user", JSON.stringify(res.data));

          //? Alert
          Toast.fire({
            icon: "success",
            title: "กำลังเข้าสู่ระบบ",
          }).then(() => {
            this.$router.push({ name: "Dashboard" });
          });
        } else {
          let msg = res.data.message;
          throw new Error(msg);
        }
      } catch (err) {
        if (err) {
          Toast.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
          }).then(() => {
            //? Reset password
            this.password = "";
          });
        }
      }
    },

    //? Save user login history
    async loginCheck() {
      try {
        let user = JSON.parse(window.localStorage.getItem("user"));
        let email = user.email;
        let type = user.type[0];
        let device = navigator.userAgent;

        let data = new FormData();
        data.append("email", email);
        data.append("user_type", type);
        data.append("device", device);

        //? Call api to save user login history
        await http.post("checksignin/new", data);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    },
  },

  mounted() {
    //? Backward
    if (localStorage.getItem("user")) {
      history.forward();
    }
  },

  validations() {
    return {
      verify: {
        required: helpers.withMessage(
          "กรุณากดยืนยันการยืนยันตัวตนก่อน",
          required
        ),
      },

      password: {
        required: helpers.withMessage("ป้อนรหัสผ่านก่อน", required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสผ่านต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
          minLength(6)
        ),
      },

      username: {
        required: helpers.withMessage("ป้อนชื่อผู้ใช้ก่อน", required),
      },
    };
  },
};
</script>
