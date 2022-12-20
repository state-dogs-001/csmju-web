<template>
  <div class="container px-4 mx-auto">
    <div
      class="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl"
    >
      <div class="px-6">
        <div class="mt-6 text-center">
          <h3
            class="mb-2 text-4xl font-semibold leading-normal text-blueGray-700"
          >
            ข่าวสาร / ประชาสัมพันธ์
          </h3>
          <p class="font-semibold leading-normal text-md text-blueGray-500">
            News & Announcement
          </p>
        </div>

        <div class="pt-6 mt-10 border-t border-blueGray-200"></div>

        <!-- News -->
        <div class="flex flex-wrap">
          <div
            v-for="news in newsData"
            :key="news.id"
            class="w-full px-2 py-2 pb-4 lg:w-4/12"
          >
            <div
              class="relative flex flex-col w-full min-w-0 mb-6 break-words duration-150 ease-linear border rounded-lg shadow-lg max-h-news border-blueGray-300 hover:zoom-xs bg-blueGray-100 h-full"
            >
              <img
                :src="news.poster"
                :alt="news.title"
                class="w-full align-middle rounded-t-lg cropped-news text-blueGray-500"
              />
              <blockquote class="relative">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  class="absolute left-0 block w-full h-95-px -top-94-px"
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    class="fill-current text-blueGray-100"
                  ></polygon>
                </svg>
              </blockquote>
              <div class="relative p-4">
                <h4 class="h-24 text-xl font-bold truncate-3">
                  {{ news.title }}
                </h4>
                <p class="mt-2 font-light truncate-3 text-md">
                  {{ news.detail }}
                </p>
                <div class="mt-2 text-center border-t border-blueGray-200">
                  <button
                    @click="readMore(news.id)"
                    class="px-4 py-2 mt-2 mb-1 mr-1 text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    type="button"
                  >
                    อ่านต่อ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script>
//? Packages
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("news", ["newsArray"]),
    newsData() {
      return this.newsArray.data;
    },
  },

  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  mounted() {
    //? Setting default current page when page loaded
    this.currentPage = 1;
    //? Call function get data
    this.getNewsStore(this.currentPage);
  },

  updated() {
    this.currentPage = this.newsArray.current_page;
    this.perPage = this.newsArray.per_page;
    this.total = this.newsArray.total;
  },

  methods: {
    //? Get data
    ...mapActions("news", ["getNewsArray"]),
    async getNewsStore() {
      await this.getNewsArray(this.currentPage);
    },

    //? Handle router to detail news
    readMore(id) {
      this.$router.push({ name: "NewsExplain", params: { id: id } });
    },

    //? Paginate
    async onPageChanged(page) {
      this.currentPage = page;
      await this.getNewsStore(this.currentPage);
    },
  },
};
</script>
