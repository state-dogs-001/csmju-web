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

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">แก้ไขข้อมูลกิจกรรม</h1>
            </div>

            <br class="shadow-xl" />

            <form ref="activityForm" @submit.stop.prevent="handleSubmit">
              <!-- Radio buttons -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <div class="block my-3 text-gray-700 text-md">
                    ระยะเวลาการจัดกิจกรรม
                  </div>
                  <label
                    class="inline-flex items-center cursor-pointer my-4 mr-4"
                  >
                    <input
                      type="radio"
                      v-model="timePeriod"
                      value="1"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-0 bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      วันเดียว
                    </span>
                  </label>
                  <label class="inline-flex items-center cursor-pointer my-4">
                    <input
                      type="radio"
                      v-model="timePeriod"
                      value="2"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-0 bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      มากกว่า 1 วัน
                    </span>
                  </label>
                </div>
              </div>

              <!-- Dates -->
              <div
                class="flex flex-wrap mb-4"
                :class="{ hidden: timePeriod == '' }"
              >
                <!-- Date Start -->
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >วันที่จัดกิจกรรม</label
                  >
                  <v-date-picker v-model="activityStart" mode="date">
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="Date start"
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

                <!-- Date End -->
                <div
                  class="w-full px-4 md:w-6/12 mt-2"
                  :class="{ hidden: timePeriod == '' || timePeriod == '1' }"
                >
                  <label class="block my-3 text-gray-700 text-md"
                    >วันสุดท้ายของกิจกรรม</label
                  >
                  <v-date-picker
                    v-model="activityEnd"
                    mode="date"
                    :min-date="activityStart"
                  >
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :class="{ 'bg-gray-200': activityStart == null }"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="Date end"
                        :disabled="activityStart == null"
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

              <!-- Activity title -->
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

              <!-- Activity location -->
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

              <!-- Activity detail -->
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

              <!-- Activity Poster -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >อัพโหลดรูปภาพโปสเตอร์กิจกรรม
                  </label>
                  <input
                    ref="fileupload"
                    @change="onFileChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="file"
                  />
                  <img
                    v-if="imgUrl"
                    :src="imgUrl"
                    class="mt-2 rounded-lg shadow-lg center-img w-1/2 h-auto cropped bg-emerald-500"
                  />
                </div>
                <div
                  v-if="v$.file.$error"
                  class="px-4 my-2 text-sm text-red-500"
                >
                  {{ v$.file.$errors[0].$message }}
                </div>
              </div>

              <!-- Buttons -->
              <div class="py-6 text-center">
                <button
                  @click="handleReset"
                  class="px-6 py-4 mr-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i> ล้าง
                </button>
                <button
                  class="px-6 py-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  <i class="fas fa-save"></i>
                  บันทึกข้อมูล
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
import http from "@/services/APIService";
//? Packages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      //? Validation
      v$: useValidate(),

      id: "",

      //? Time type 
      timePeriod: "",

      //? Form attributes
      activityStart: "",
      activityEnd: "",
      activityTitle: "",
      activityOrganizer: "",
      activityDetail: "",
      activityLocation: "",

      //? File upload
      file: null,
      imgUrl: "",
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getActivity(this.id);
  },

  methods: {
    //? Get activity data
    async getActivity(id) {
      try {
        const res = await http.get(`activity/show/update/${id}`);
        if (res.data.success) {
          //? Found activity
          const activity = res.data.data;
          this.activityStart = activity.date_start;
          if (activity.date_end === null) {
            this.timePeriod = "1";
          } else {
            this.timePeriod = "2";
            this.activityEnd = activity.date_end;
          }
          this.activityTitle = activity.name;
          this.activityOrganizer = activity.organizer;
          this.activityDetail = activity.detail;
          this.activityLocation = activity.location;
          this.imgUrl = activity.poster;
        } else {
          const Swal = this.$swal.mixin({
            position: "center",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          Swal.fire({
            icon: "warning",
            title: res.data.message,
          }).then(() => {
            this.$router.push({ name: "Activity" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Upload file
    onFileChange(e) {
      this.file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(this.file);
    },

    //? Reset form
    handleReset() {
      this.v$.$reset();
      this.timePeriod = "";
      this.activityStart = "";
      this.activityEnd = "";
      this.activityTitle = "";
      this.activityOrganizer = "";
      this.activityLocation = "";
      this.activityDetail = "";
      this.file = null;
      this.imgUrl = "";
      this.$refs.fileupload.value = "";
    },

    //? Submit form
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        const activityStart = new Date(this.activityStart)
          .toISOString()
          .slice(0, 10);
        data.append("date_start", activityStart);
        if (this.activityEnd && this.timePeriod === "2") {
          const activityEnd = new Date(this.activityEnd)
            .toISOString()
            .slice(0, 10);
          data.append("date_end", activityEnd);
        } else {
          data.append("date_end", "");
        }
        data.append("name", this.activityTitle);
        data.append("organizer", this.activityOrganizer);
        data.append("location", this.activityLocation);
        data.append("detail", this.activityDetail);
        if (this.file !== null) {
          data.append("poster", this.file);
        }

        http.post(`activity/update/${this.id}`, data).then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "success",
            title: "อัพเดตข้อมูลสำเร็จ",
          }).then(() => {
            this.$router.push({ name: "ActivityShow" });
          });
        });
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
      file: {
        required: helpers.withMessage(
          "ไฟล์ที่อัปโหลดต้องเป็นไฟล์ .jpeg .jpg หรือ .png เท่านั้น",
          () => {
            if (this.file != null) {
              //? Check file type
              if (
                this.file.type == "image/jpeg" ||
                this.file.type == "image/jpg" ||
                this.file.type == "image/png"
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }
        ),
      },
    };
  },
};
</script>
