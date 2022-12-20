<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/activityimages/show">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">แก้ไขรูปภาพกิจกรรม</h1>
            </div>

            <br class="shadow-xl" />

            <form
              ref="activityForm"
              @submit.stop.prevent="handleSubmit"
              enctype="multipart/form-data"
            >
              <!-- Select activities -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >เลือกกิจกรรม</label
                  >
                  <VueMultiselect
                    v-if="activities"
                    v-model="selected"
                    :options="activities"
                    track-by="name"
                    label="name"
                    class="select"
                    placeholder="Select activities"
                    :disabled="true"
                  >
                  </VueMultiselect>
                  <div
                    v-if="v$.activity.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activity.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Upload images -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 mt-4">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >อัพโหลดรูปภาพโปสเตอร์กิจกรรม
                  </label>
                  <input
                    ref="fileupload"
                    @change="onFileChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="file"
                    multiple
                  />
                </div>
                <div
                  v-if="v$.files.$error"
                  class="px-4 my-2 text-sm text-red-500"
                >
                  {{ v$.files.$errors[0].$message }}
                </div>
              </div>

              <!-- Images preview -->
              <div class="flex flex-wrap" v-if="imgUrls">
                <div
                  class="px-4 mt-4 w-full md:w-4/12"
                  v-for="imgUrl in imgUrls"
                  :key="imgUrl"
                >
                  <img :src="imgUrl" alt="" />
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
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  data() {
    return {
      id: "",

      //? Data
      activities: null,

      //? Validation
      v$: useValidate(),

      //? Form
      selected: "",
      activity: "",
      files: null,
      imgUrls: [],
    };
  },

  watch: {
    selected(val) {
      if (val) {
        this.activity = val.id;
      } else {
        this.activity = "";
      }
    },
  },

  components: { VueMultiselect },

  mounted() {
    this.id = this.$route.params.id;
    this.getActivities();
    this.getActivity(this.id);
  },

  methods: {
    //? Get activities
    async getActivities() {
      try {
        const res = await http.get(`activities/all`);
        if (res.data.success) {
          const data = res.data.data;
          this.activities = data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Get activity
    async getActivity(id) {
      try {
        //? Get activity images
        const resActImg = await http.get(`activity/images/activity-id/${id}`);
        if (resActImg.data.success) {
          const dataImage = resActImg.data.data;
          dataImage.forEach((act) => {
            this.imgUrls.push(act.images);
          });
          //? Get activity data
          const resAct = await http.get(`activity/show/update/${id}`);
          if (resAct.data.success) {
            const dataAct = resAct.data.data;
            this.selected = dataAct;
          }
        } else {
          //! Not found activity return to activity images page
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
            this.$router.push({ name: "ActivityImagesShow" });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Upload images
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files);
    },

    createImage(files) {
      //? Clear image
      this.imgUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    //? Reset form
    handleReset() {
      this.v$.$reset();
      this.files = null;
      this.imgUrls = [];
      this.$refs.fileupload.value = "";
    },

    //? Submit form
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("activity_id", this.activity);
        for (let i = 0; i < this.files.length; i++) {
          data.append("images[]", this.files[i]);
        }

        http
          .post(`activity/images/new-or-update`, data)
          .then((res) => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "success",
              title: "เพิ่มรูปภาพเรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "ActivityImagesShow" });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },

  validations() {
    return {
      activity: {
        required: helpers.withMessage("กรุณาเลือกกิจกรรม", required),
      },
      files: {
        required: helpers.withMessage(
          "กรุณาอัพโหลดรูปภาพ ไฟล์ที่อัปโหลดต้องเป็นไฟล์ .jpeg .jpg หรือ .png เท่านั้น",
          () => {
            if (this.files !== null) {
              for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const type = file.type;
                if (
                  type !== "image/jpeg" &&
                  type !== "image/jpg" &&
                  type !== "image/png"
                ) {
                  return false;
                }
              }
              return true;
            } else {
              return false;
            }
          }
        ),
      },
    };
  },
};
</script>

<style>
.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
}
</style>
