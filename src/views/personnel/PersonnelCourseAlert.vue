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
                    ระบบแจ้งเตือนตกค้างรายวิชา
                  </h3>

                  <h3 class="text-xl font-normal">| Course Alert System</h3>
                </div>
                <div class="w-full lg:w-3/12">
                  <div class="mt-4 text-right">
                    <router-link
                      to="/personnel/service"
                      class="px-6 py-3 mb-1 mr-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blueGray-600 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    >
                      ย้อนกลับ
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Table -->
              <div class="py-5 mt-10 text-center border-t border-blueGray-200">
                <div class="flex flex-wrap">
                  <div class="flex flex-auto mt-4 w-full overflow-x-auto">
                    <div class="block w-full overflow-x-auto lg:w-12/12">
                      <table
                        class="items-center w-full bg-transparent border-collapse"
                      >
                        <thead>
                          <tr
                            class="text-blueGray-500 border-b-2 border-blueGray-500"
                          >
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              ลำดับ
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              วันที่
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              รหัสวิชา
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              รหัสนักศึกษา
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              ชื่อนักศึกษา
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              สถานะการแจ้งตกค้าง
                            </th>
                            <th
                              class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                            >
                              จัดการ
                            </th>
                          </tr>
                        </thead>
                        <tbody class="text-left w-full">
                          <tr
                            class="border-b"
                            v-for="(residual, index) in subjectResiduals"
                            :key="index"
                          >
                            <td
                              class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                            >
                              {{ (currentPage - 1) * perPage + index + 1 }}
                            </td>

                            <td
                              class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                            >
                              {{ new Date(residual.date).toDateString() }}
                            </td>

                            <td
                              class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                            >
                              {{ residual.subject_code }}
                            </td>

                            <td
                              class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                            >
                              {{ residual.student_code }}
                            </td>

                            <td class="p-4 px-6 text-sm align-middle">
                              <div>
                                <p class="w-full font-normal truncate-3">
                                  {{ residual.student_name }}
                                </p>
                              </div>
                            </td>

                            <td
                              class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                            >
                              {{ residual.status }}
                            </td>

                            <td
                              class="p-4 px-6 text-xs align-middle whitespace-nowrap"
                            >
                              <button
                                class="px-4 py-2 mb-1 mr-1 text-xs font-normal text-white uppercase transition-all duration-150 ease-linear bg-emerald-500 rounded-lg shadow-md outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                                type="button"
                              >
                                รับทราบ
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <VueTailwindPagination
                        :current="currentPage"
                        :total="total"
                        :per-page="perPage"
                        @page-changed="onPageChanged($event)"
                        class="my-6"
                      />
                    </div>
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
//? API
import http from "@/services/WebpageService";
//? Packages
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      //? Data
      subjectResiduals: null,

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  mounted() {
    this.currentPage = 1;
    this.getSubjectResiduals(this.currentPage);
  },

  methods: {
    //? Get subject residuals
    async getSubjectResiduals(page) {
      try {
        const local = JSON.parse(localStorage.getItem("user"));
        const citizenId = local.card_id;
        const res = await http.get(
          `residual/personnel/${citizenId}?page=${page}`
        );
        if (res.data.data.length > 0) {
          const data = res.data;
          this.subjectResiduals = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        } else {
          //! Not have data
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
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลการแจ้งตกค้าง",
          }).then(() => {
            this.$router.push({ name: "PersonnelService" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Pagination
    onPageChanged(page) {
      this.currentPage = page;
      this.getSubjectResiduals(this.currentPage);
    },
  },
};
</script>
