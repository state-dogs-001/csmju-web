<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/activityshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">เพิ่มข้อมูลกิจกรรม</h1>
            </div>

            <br class="shadow-xl" />
            <form ref="activityForm" @submit.prevent="handleSubmit">
              <!-- Line 1 -->
              <div class="flex flex-wrap mb-4">
                <!-- Date -->
                <div class="w-full md:w-4/12 mt-2 px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >วันที่ประกาศกิจกรรม</label
                  >
                  <v-date-picker
                    v-model="activityStart"
                    v-model.lazy="activityEnd"
                    mode="date"
                    :min-date="new Date()"
                  >
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                  <div
                    v-if="v$.activityStart.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityStart.$errors[0].$message }}
                  </div>
                </div>

                <!-- Time start -->
                <div class="w-full md:w-4/12 mt-2 px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >เวลาเริ่มต้น</label
                  >
                  <v-date-picker v-model="activityStart" mode="time">
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                  <div
                    v-if="v$.activityStart.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityStart.$errors[0].$message }}
                  </div>
                </div>

                <!-- Time end -->
                <div class="w-full md:w-4/12 mt-2 px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >เวลาสิ้นสุด</label
                  >
                  <v-date-picker v-model="activityEnd" mode="time">
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                  <div
                    v-if="v$.activityStart.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityStart.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 2 -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >ชื่อกิจกรรม</label
                  >
                  <input
                    v-model="activityTitle"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Title"
                  />
                  <div
                    v-if="v$.activityTitle.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityTitle.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >ผู้รับผิดชอบ</label
                  >
                  <input
                    v-model="activityOrganizer"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Organizer"
                  />
                  <div
                    v-if="v$.activityOrganizer.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityOrganizer.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 3 -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >รูปแบบกิจกรรม</label
                  >
                  <input
                    v-model="activityLocation"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Location / Platform"
                  />
                  <div
                    v-if="v$.activityLocation.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityLocation.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 4 -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >รายละเอียดกิจกรรม</label
                  >
                  <textarea
                    v-model="activityDetail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Description"
                  ></textarea>
                  <div
                    v-if="v$.activityDetail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityDetail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="py-6 text-center">
                <button
                  @click="handleReset"
                  class="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i>
                  ล้าง
                </button>
                <button
                  class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  ยืนยัน
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
//? API
import http from "../../services/APIService";
//? Packages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      //? Validation
      v$: useValidate(),

      //? Form attributes
      activityStart: null,
      activityEnd: null,
      activityTitle: null,
      activityOrganizer: null,
      activityDetail: null,
      activityLocation: null,
    };
  },

  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(this.file);
    },

    handleReset() {
      this.$refs.activityForm.reset();
      this.activityStart = null;
      this.activityEnd = null;
      this.activityTitle = null;
      this.activityOrganizer = null;
      this.activityLocation = null;
      this.activityDetail = null;
    },

    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const data = {
          activityStart: this.activityStart,
          activityEnd: this.activityEnd,
          activityTitle: this.activityTitle,
          activityOrganizer: this.activityOrganizer,
          activityLocation: this.activityLocation,
          activityDetail: this.activityDetail,
        };

        console.log(data);
        /*
        let data = new FormData();
        http.post(`activity/create`, data).then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "success",
            title: "เพิ่มข้อมูลใหม่เรียบร้อย",
          }).then(() => {
            this.$router.push({ name: "ActivityShow" });
          });
        });
        */
      }
    },
  },

  validations() {
    return {
      activityStart: {
        required: helpers.withMessage(
          "กรุณาป้อนวันที่และเวลาของกิจกรรมก่อน",
          required
        ),
      },
      activityOrganizer: {
        required: helpers.withMessage(
          "กรุณาป้อนชื่อผู้จัดกิจกรรมก่อน",
          required
        ),
      },
      activityLocation: {
        required: helpers.withMessage(
          "กรุณาป้อนสถานที่จัดกิจกรรมก่อน",
          required
        ),
      },
      activityDetail: {
        required: helpers.withMessage(
          "กรุณาป้อนรายละเอียดกิจกรรมก่อน",
          required
        ),
      },
      activityTitle: {
        required: helpers.withMessage("กรุณาป้อนชื่อกิจกรรมก่อน", required),
      },
    };
  },

  mounted() {},
};
</script>
