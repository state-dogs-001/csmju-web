<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/feed">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | แก้ไขข้อมูลข่าวสาร
              </h1>
            </div>

            <br class="shadow-xl" />
            <form
              ref="editNewsForm"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
            >
              <!-- Checkbox for banner status -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isShow"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700">
                      แสดงข่าวสารในหน้าสาธารณะ
                    </span>
                  </label>
                </div>
              </div>

              <!-- Head news and type -->
              <div class="flex flex-wrap mb-4">
                <!-- Head -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >หัวข้อข่าว
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="title"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="News Title"
                  />
                  <div v-if="v$.title.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.title.$errors[0].$message }}
                  </div>
                </div>

                <!-- Type -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Type"
                    >ประเภทข่าว
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="type"
                    class="w-full px-3 py-2 leading-tight"
                    :class="type == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option value="" selected disabled>News type</option>
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="ประกาศ">ประกาศ</option>
                    <option value="รับสมัคร">รับสมัคร</option>
                    <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
                    <option value="ทุนการศึกษา">ทุนการศึกษา</option>
                    <option value="กิจกรรม">กิจกรรม</option>
                    <option value="เร่งด่วน">เร่งด่วน</option>
                  </select>
                  <div v-if="v$.type.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.type.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Datail -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="Detail"
                    >รายละเอียด
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="detail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="News Description"
                  ></textarea>
                  <div
                    v-if="v$.detail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.detail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Checkbox for link -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isLink"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700"> เพิ่มลิงค์ </span>
                  </label>
                </div>
              </div>

              <!-- Link -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="links"
                    >ลิงค์ที่เกี่ยวข้อง
                    <span v-if="isLink" class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="link"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    :class="!isLink ? 'bg-gray-200' : ''"
                    type="text"
                    placeholder="News Links / Read more (www.example.com)"
                    :disabled="!isLink"
                  />
                  <div v-if="v$.link.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.link.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Image -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      class="w-auto h-350-px rounded-lg shadow-lg center-img bg-emerald-500 border"
                    />
                  </div>

                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >รูปภาพ</label
                  >
                  <div
                    class="relative flex items-center justify-center h-32 bg-gray-100 border-b border-blue-700"
                  >
                    <input
                      ref="fileupload"
                      type="file"
                      @change="onFileChange"
                      accept="image/*"
                      class="w-full h-50-px opacity-0 p-3 bg-white"
                    />
                  </div>
                  <div v-if="v$.file.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.file.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Button -->
              <div class="py-6 text-center">
                <button
                  @click="onResetForm"
                  class="px-6 py-4 mr-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i> ล้าง
                </button>
                <button
                  class="px-6 py-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  <i class="fas fa-edit"></i> แก้ไขข้อมูล
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
//? Pakages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      newsId: this.$route.params.id,

      isShow: true,
      isLink: false,

      title: "",
      detail: "",
      link: "",
      type: "",

      imgUrl: "",
      file: null,
    };
  },

  mounted() {
    this.getNews();
  },

  methods: {
    //? Get data
    async getNews() {
      let news = await http.get(`news/show/private/${this.newsId}`);
      if (news) {
        let data = news.data.data;
        this.title = data.title;
        this.detail = data.detail;
        this.imgUrl = data.image;
        this.type = data.type;

        if (data.link != null) {
          this.isLink = true;
          this.link = data.link;
        }

        if (!data.is_show) {
          this.isShow = false;
        }
      }
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
    },

    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("title", this.title);
        data.append("detail", this.detail);
        data.append("type", this.type);

        //? If file not null
        if (this.file != null) {
          data.append("image", this.file);
        }

        //? If isLink is true set data link else ''(NUll)
        if (this.isLink) {
          data.append("link", this.link);
        } else {
          data.append("link", "");
        }

        //? If isShow is false set data is_show to 0 else 1
        if (!this.isShow) {
          data.append("is_show", 0);
        } else {
          data.append("is_show", 1);
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        //? Call API
        http
          .post(`news/update/${this.newsId}`, data)
          .then((res) => {
            let msg = res.data.message;
            Toast.fire({
              icon: "success",
              title: msg,
            }).then(() => {
              this.$router.push({ name: "Feed" });
            });
          })
          .catch((error) => {
            if (error) {
              Toast.fire({
                icon: "error",
                title: "ขออภัย ทำรายการไม่สำเร็จ",
              });
            }
          });
      }
    },

    onResetForm() {
      this.v$.$reset();
      this.title = "";
      this.detail = "";
      this.link = "";
      this.type = "";
      this.imgUrl = "";
      this.file = null;
      this.isShow = true;
      this.isLink = false;
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      detail: {
        required: helpers.withMessage("ป้อนรายละเอียดข่าวก่อน", required),
      },
      title: {
        required: helpers.withMessage("ป้อนหัวข้อข่าวก่อน", required),
      },
      type: {
        required: helpers.withMessage("ป้อนประเภทข่าวก่อน", required),
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
      link: {
        required: helpers.withMessage(
          "ป้อนลิงค์ก่อน",
          () => !this.isLink || this.link != ""
        ),
      },
    };
  },
};
</script>
