<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">CSMJU | ระบบบันทึกกิจกรรม</h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-bold text-md md:w-2/12">
                    จำนวน {{ total }} รายการ
                  </div>

                  <div class="w-full px-4 py-4 md:w-6/12">
                    <form @submit.prevent="handleSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนชื่อกิจกรรมที่ต้องการค้นหา"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <div class="w-full px-4 text-center md:w-4/12">
                    <button
                      @click="handleSearch"
                      class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-search"></i> ค้นหา
                    </button>
                    <button
                      @click="handleReset"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <router-link
                      to="/admin/activityimages/add"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="block w-full overflow-x-auto">
                <!-- Projects table -->
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
                        ชื่อกิจกรรม / โครงการ
                      </th>
                      <th
                        class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        จำนวนรูปภาพ
                      </th>
                      <th
                        class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        รูปภาพ (ตัวอย่าง)
                      </th>
                      <th
                        class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        การจัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b"
                      v-for="act in activities"
                      :key="act.id"
                    >
                      <template v-if="act.images_count > 0">
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          {{ act.name }}
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          {{ act.images_count }}
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          <!-- images is less than 3 -->
                          <div
                            v-if="act.images_count < 3"
                            class="flex flex-row"
                          >
                            <span v-for="img in act.images" :key="img">
                              <img
                                :src="img.image"
                                alt="activity image"
                                class="rounded w-32 mr-2"
                              />
                            </span>
                          </div>
                          <!-- images is more than 3 -->
                          <div v-else class="flex flex-row">
                            <span v-for="index in 3" :key="index">
                              <img
                                :src="act.images[index - 1].image"
                                alt="activity image"
                                class="rounded w-32 mr-2"
                              />
                            </span>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="handleEdit(act.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="handleDelete(act.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-normal text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
                <VueTailwindPagination
                  :current="currentPage"
                  :total="total"
                  :per-page="perPage"
                  @page-changed="onPageClick($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Package
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  data() {
    return {
      //? Data
      activities: null,

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Search
      keyword: "",
    };
  },

  components: { VueTailwindPagination },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getActivities(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getActivities(this.currentPage);
  },

  methods: {
    //? get activities
    async getActivities(page) {
      try {
        const res = await http.get(`activity/images?page=${page}`);
        if (res.data.data.length > 0) {
          this.activities = res.data.data;
          this.currentPage = res.data.current_page;
          this.perPage = res.data.per_page;
          this.total = res.data.total;
        } else {
          //! Not found data
          this.activities = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Get activities by search
    async getActivityBySearch(page) {
      try {
        const res = await http.get(
          `activity/images/search/${this.keyword}?page=${page}`
        );
        if (res.data.data.length > 0) {
          this.activities = res.data.data;
          this.currentPage = res.data.current_page;
          this.perPage = res.data.per_page;
          this.total = res.data.total;
        } else {
          this.activities = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Search
    handleSearch(page) {
      if (this.keyword) {
        this.currentPage = 1;
        this.getActivityBySearch(this.currentPage);
      }
    },

    //? Pagination
    onPageClick(page) {
      this.currentPage = page;
      if (this.keyword !== "") {
        this.getActivityBySearch(this.currentPage);
      } else {
        this.getActivities(this.currentPage);
      }
    },

    //? Reset
    handleReset() {
      this.keyword = "";
      this.currentPage = 1;
      this.getActivities(this.currentPage);
    },

    //? Edit
    handleEdit(id) {
      this.$router.push({ name: "ActivityImagesEdit", params: { id: id } });
    },

    //? Delete
    async handleDelete(id) {
      //? Set default sweet alert
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          title: "font-weight-bold",
          confirmButton:
            "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
          cancelButton:
            "px-6 py-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "ยืนยันการลบข้อมูล\nหากกดยืนยันรูปภาพจะถูกลบทั้งหมด",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            http
              .delete(`/activity/images/delete/${id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("ลบข้อมูลเรียบร้อย!", "", "success")
                  .then(() => {
                    window.location.reload();
                  });
              })
              .catch((error) => {
                if (error) {
                  swalWithBootstrapButtons.fire({
                    icon: "error",
                    title: "ขออภัย ทำรายการไม่สำเร็จ",
                  });
                }
              });
          } else {
            swalWithBootstrapButtons.fire("ยกเลิกการลบข้อมูล", "", "error");
          }
        });
    },
  },
};
</script>
