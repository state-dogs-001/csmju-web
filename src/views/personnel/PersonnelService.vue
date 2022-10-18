<template>
  <main class="profile-page custom">
    <section class="relative pb-16 bg-blueGray-200">
      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <div
            class="cssanimation sequence fadeInBottom relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-xl lg:w-12/12"
          >
            <div class="px-6 mt-6">
              <div class="flex flex-wrap rounded-lg bg-blueGray-100">
                <div class="w-auto px-4 rounded-lg bg-emerald-500">
                  <h3 class="text-6xl font-semibold leading-normal text-white">
                    CSMJU
                  </h3>
                </div>
                <div class="w-auto ml-3">
                  <h3 class="mt-1 text-2xl font-semibold">
                    ระบบสารสนเทศสาขาวิชาวิทยาการคอมพิวเตอร์
                  </h3>

                  <h3 class="text-xl font-normal">
                    | Management Information System
                  </h3>
                </div>
              </div>

              <div class="py-6 mt-2 text-left border-t border-blueGray-200">
                <div class="flex flex-wrap">
                  <!-- Curriculum Vitae (CV) -->
                  <div
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <router-link to="service/cv">
                        <img
                          :src="cover1"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />

                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            นำออกประวัติโดยย่อ
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Curriculum Vitae (CV)
                            </h4>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>

                  <!-- Maintenance System -->
                  <div
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <router-link to="service/maintenance">
                        <img
                          :src="cover2"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />

                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            ระบบแจ้งซ่อมอุปกรณ์
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Maintenance System
                            </h4>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>

                  <!-- Reservation System -->
                  <div
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <router-link to="service/roomreserve">
                        <img
                          :src="cover3"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />

                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            ระบบจองห้องเรียน
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Reservation System
                            </h4>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>

                  <!-- Equipment Inventory System -->
                  <div
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <a @click="dev">
                        <img
                          :src="cover4"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />
                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            ระบบยืม-คืนครุภัณฑ์
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Equipment Inventory System
                            </h4>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <!-- Material Disbursement System -->
                  <div
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <a @click="dev">
                        <img
                          :src="cover5"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />
                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            ระบบจองเบิกจ่ายอุปกรณ์
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Material Disbursement System
                            </h4>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <!-- Course Alert System -->
                  <!-- <div
                    v-if="subjectResiduals !== null"
                    class="w-full px-2 lg:w-3/12 cssanimation sequence fadeInBottom"
                  >
                    <div
                      class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100"
                    >
                      <router-link to="service/coursealert">
                        <img
                          :src="cover6"
                          class="w-full cropped-service align-middle rounded-t-lg text-blueGray-500"
                        />

                        <div class="relative p-4">
                          <h4 class="text-xl font-bold text-left">
                            ระบบแจ้งเตือนตกค้างรายวิชา
                          </h4>

                          <div
                            class="mt-2 text-center border-t border-blueGray-200"
                          >
                            <h4 class="mt-2 font-normal text-left text-md">
                              Course Alert System
                            </h4>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div> -->
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
//? Images
import cover1 from "@/assets/images/cv.png";
import cover2 from "@/assets/images/repair.png";
import cover3 from "@/assets/images/room_rent.png";
import cover4 from "@/assets/images/equipment.png";
import cover5 from "@/assets/images/material.png";
import cover6 from "@/assets/images/enroll_class.png";
//? API
// import http from "@/services/WebpageService";
export default {
  data() {
    return {
      cover1,
      cover2,
      cover3,
      cover4,
      cover5,
      cover6,

      subjectResiduals: null,
    };
  },

  mounted() {
    // this.getSubjectResiduals();
  },

  methods: {
    //? Get subject residuals
    // async getSubjectResiduals() {
    //   try {
    //     const local = JSON.parse(localStorage.getItem("user"));
    //     const citizenId = local.card_id;
    //     const res = await http.get(`residual/personnel/${citizenId}`);
    //     if (res.data.data.length > 0) {
    //       const data = res.data.data;
    //       this.subjectResiduals = data;
    //     } else {
    //       this.subjectResiduals = null;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    //! System not yet
    dev() {
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          title:
            "custom font-semibold text-4xl text-center text-blueGray-500 mb-2",
          text: "custom font-normal text-lg text-center text-blueGray-500 ",
        },
      });

      Swal.fire({
        icon: "info",
        title: `Coming Soon`,
        text: `" ระบบจะเปิดให้ใช้งานในอนาคต " `,
      });
    },
  },
};
</script>
