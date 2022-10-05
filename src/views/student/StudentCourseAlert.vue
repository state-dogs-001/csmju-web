<template>
  <main class="profile-page custom">
    <section class="relative pb-16 bg-blueGray-200">
      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <div
            class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-xl lg:w-12/12"
          >
            <div class="px-6 mt-6">
              <div class="flex flex-wrap rounded-lg bg-blueGray-100">
                <div class="w-full lg:w-3/12">
                  <div class="mr-4 text-center rounded-lg bg-emerald-500">
                    <h3
                      class="text-6xl font-semibold leading-normal text-white"
                    >
                      MIS
                    </h3>
                  </div>
                </div>
                <div class="w-full lg:w-6/12">
                  <h3 class="mt-1 text-2xl font-semibold">
                    ระบบแจ้งตกค้างรายวิชา
                  </h3>

                  <h3 class="text-xl font-normal">
                    | Course Residualisation System
                  </h3>
                </div>

                <!-- Back to main service -->
                <div class="w-full lg:w-3/12">
                  <div class="mt-4 text-right">
                    <router-link
                      to="/student/service"
                      class="px-6 py-3 mb-1 mr-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blueGray-600 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    >
                      ย้อนกลับ
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="py-6 mt-2 text-left border-t border-blueGray-200">
                <div class="flex flex-wrap">
                  <!-- Image cover -->
                  <div class="w-full lg:w-6/12 lg:order-2">
                    <div class="p-4">
                      <img :src="cover" class="shadow-none" alt="" />
                    </div>
                  </div>

                  <!-- Form -->
                  <div class="w-full lg:w-6/12 lg:order-1">
                    <form @submit.stop.prevent="handleSubmit">
                      <!-- Subject type -->
                      <div class="flex flex-wrap mb-4">
                        <div class="w-full px-4 md:w-12/12">
                          <label class="block my-3 text-gray-700 text-md"
                            >กลุ่มรายวิชาเฉพาะ
                          </label>
                          <select
                            v-model="subjectType"
                            @keyup="getSubject"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                          >
                            <option value="" selected disabled>
                              เลือกกลุ่มรายวิชาเฉพาะ
                            </option>
                            <option value="1">กลุ่มรายวิชาภายในสาขา</option>
                            <option value="2">กลุ่มรายวิชาภายนอกสาขา</option>
                          </select>
                          <div
                            v-if="v$.subjectType.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.subjectType.$errors[0].$message }}
                          </div>
                        </div>
                      </div>

                      <!-- Subject code -->
                      <div class="flex flex-wrap mb-4">
                        <div class="w-full px-4 md:w-8/12">
                          <label class="block my-3 text-gray-700 text-md"
                            >รหัสรายวิชา</label
                          >
                          <input
                            v-model="subjectCode"
                            @keyup="getSubject"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                            type="text"
                            maxlength="8"
                            placeholder="กรอกรหัสรายวิชา"
                          />
                          <div
                            v-if="v$.subjectCode.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.subjectCode.$errors[0].$message }}
                          </div>
                        </div>
                        <div class="w-full px-4 md:w-4/12">
                          <label class="block my-3 text-gray-700 text-md"
                            >กลุ่มเรียน</label
                          >
                          <input
                            v-model="subjectSec"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                            type="number"
                            placeholder="กลุ่มเรียน"
                          />
                          <div
                            v-if="v$.subjectSec.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.subjectSec.$errors[0].$message }}
                          </div>
                        </div>
                      </div>

                      <!-- Subject name -->
                      <div class="flex flex-wrap mb-4">
                        <div class="w-full px-4 md:w-12/12">
                          <label class="block my-3 text-gray-700 text-md"
                            >ชื่อรายวิชา</label
                          >
                          <input
                            v-model="subjectName"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                            type="text"
                            placeholder="กรอกชื่อรายวิชา"
                          />
                          <div
                            v-if="v$.subjectName.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.subjectName.$errors[0].$message }}
                          </div>
                        </div>
                      </div>

                      <!-- Teacher -->
                      <div class="flex flex-wrap mb-4">
                        <div class="w-full px-4 md:w-12/12">
                          <label
                            class="block my-3 text-gray-700 text-md"
                            for="Dates"
                            >บุคลากรผู้รับผิดชอบรายวิชา</label
                          >
                          <select
                            v-model="advisor"
                            id="advisor"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                            :class="subjectType == '' ? 'bg-gray-200' : ''"
                            :disabled="subjectType == ''"
                          >
                            <option value="" selected disabled>
                              ผู้รับผิดชอบรายวิชา
                            </option>
                            <!-- วิชาใน -->
                            <template
                              v-if="teachers != null && subjectType == 1"
                            >
                              <option
                                v-for="advisor in teachers"
                                :key="advisor.id"
                                :value="advisor.id"
                              >
                                {{ advisor.name_title }} {{ advisor.name_th }}
                              </option>
                            </template>

                            <!-- วิชานอก -->
                            <template v-if="staff != null && subjectType == 2">
                              <option :value="staff.id">
                                {{ staff.name_title }} {{ staff.name_th }}
                              </option>
                            </template>
                          </select>
                          <div
                            v-if="v$.advisor.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.advisor.$errors[0].$message }}
                          </div>
                        </div>
                      </div>

                      <!-- Description -->
                      <div class="flex flex-wrap mb-4">
                        <div class="w-full px-4 md:w-12/12">
                          <label class="block my-3 text-gray-700 text-md"
                            >เหตุผลในการยืนคำร้องแจ้งตก-ค้างรายวิชา</label
                          >
                          <textarea
                            v-model="subjectDetail"
                            class="w-full px-3 py-2 leading-tight text-gray-700"
                            rows="5"
                            placeholder="ระบุเหตุผลในการยืนคำร้องแจ้งตก-ค้างรายวิชา"
                          ></textarea>
                          <div
                            v-if="v$.subjectDetail.$error"
                            class="mt-2 text-sm text-red-500"
                          >
                            {{ v$.subjectDetail.$errors[0].$message }}
                          </div>
                        </div>
                      </div>

                      <!-- Buttons -->
                      <div class="py-6 text-center">
                        <button
                          @click="clearForm"
                          class="px-6 py-3 mb-1 mr-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-600 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                          type="button"
                        >
                          ล้าง
                        </button>
                        <button
                          class="px-6 py-3 mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
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
        </div>
      </div>
    </section>
  </main>
</template>

<script>
//? Image
import cover from "@/assets/images/enroll_class.png";
//? API
import http from "@/services/WebpageService";
//? Packages
import useValidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      //? Data
      teachers: null,
      staff: null,

      //? Image
      cover,

      //? Form
      subjectType: "",
      subjectCode: "",
      subjectName: "",
      subjectSec: "",
      subjectDetail: "",
      advisor: "",

      studentProfile: null,
    };
  },

  mounted() {
    this.getStudent();
    this.getTeacher();
    this.getStaff();
  },

  methods: {
    getStudent() {
      let user = JSON.parse(localStorage.getItem("user"));
      let citizenId = user.card_id;

      http
        .get(`student/search/citizen-id/${citizenId}`)
        .then((res) => {
          if (res.data.success) {
            this.studentProfile = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getTeacher() {
      http
        .get("personnel/filter/teacher")
        .then((res) => {
          if (res.data.success) {
            this.teachers = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getStaff() {
      http
        .get("/personnel/show/20")
        .then((res) => {
          if (res.data.success) {
            this.staff = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearForm() {
      this.v$.$reset();
      this.subjectType = "";
      this.subjectCode = "";
      this.subjectName = "";
      this.subjectSec = "";
      this.subjectDetail = "";
      this.advisor = "";
    },

    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        //? Set default sweet alert
        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            title: "font-weight-bold",
            confirmButton:
              "px-6 py-3 mx-4 mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
            cancelButton:
              "px-6 py-3 mx-4 mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
          },
          buttonsStyling: false,
        });
        
        swalWithBootstrapButtons
          .fire({
            title: "ตรวจสอบข้อมูลการแจ้งตก-ค้างรายวิชา",
            html:
              ` <p class="custom text-left font-normal text-sm"> <b>รหัสรายวิชา :</b> ${this.subjectCode} <b>กลุ่มเรียน :</b>  ${this.subjectSec}</p>` +
              ` <p class="custom text-left font-normal text-sm"> <b>ห้องเรียน :</b> ${this.subjectName}</p>` +
              ` <p class="custom text-left font-normal text-sm">  <b>อาจารย์ผู้รับผิดชอบ :</b> ${this.advisor} </p>` +
              ` <p class="custom text-left font-normal text-sm"> <b>รายละเอียด :</b> ${this.subjectDetail}</p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              let data = new FormData();
              let studentId = this.studentProfile.id;
              data.append("subject_type", this.subjectType);
              data.append("subject_code", this.subjectCode);
              data.append("subject_name", this.subjectName);
              data.append("section", this.subjectSec);
              data.append("detail", this.subjectDetail);
              data.append("student_id", studentId);
              data.append("personnel_id", this.advisor);
              http
                .post("/residual/new", data)
                .then(() => {
                  swalWithBootstrapButtons
                    .fire(
                      "บันทึกเรียบร้อย!",
                      "ดำเนินการแจ้งตก-ค้างรายวิชาเรียบร้อย",
                      "success"
                    )
                    .then(() => {
                      this.$router.push({ name: "StudentService" });
                    });
                })
                .catch((error) => {
                  if (error) {
                    //Call Sweet Alert
                    swalWithBootstrapButtons.fire(
                      "ข้อมูลไม่ถูกต้อง!",
                      "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                      "error"
                    );
                  }
                });
            } else if (result.dismiss === this.$swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "ยกเลิกเรียบร้อย!",
                "คุณได้ยกเลิกการแจ้งตก-ค้างรายวิชา",
                "error"
              );
            }
          });
      }
    },
  },

  validations() {
    return {
      subjectCode: {
        required: helpers.withMessage("ป้อนรหัสรายวิชาก่อน", required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสรายวิชาต้องไม่น้อยกว่า ${$params.min} ตัว`,
          minLength(5)
        ),
      },
      subjectSec: {
        required: helpers.withMessage("ป้อนกลุ่มเรียนก่อน", required),
      },
      subjectType: {
        required: helpers.withMessage("เลือกกลุ่มรายวิชาก่อน", required),
      },
      subjectName: {
        required: helpers.withMessage("ป้อนชื่อรายวิชาก่อน", required),
      },
      advisor: {
        required: helpers.withMessage("เลือกผู้รับผิดชอบก่อน", required),
      },
      subjectDetail: {
        required: helpers.withMessage("ป้อนเหตุผลการยื่นคำร้องก่อน", required),
      },
    };
  },
};
</script>
