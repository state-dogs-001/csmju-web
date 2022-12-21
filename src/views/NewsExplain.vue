<template>
  <div class="container px-4 mx-auto">
    <div
      class="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl"
    >
      <div class="px-6">
        <div class="mt-6 text-center">
          <h3
            class="mb-2 text-3xl font-semibold leading-normal text-blueGray-700"
          >
            {{ news.title }}
          </h3>
          <p class="font-semibold leading-normal text-md text-blueGray-500">
            วันที่ประกาศ :
            {{ new Date(news.created_at).toLocaleDateString() }} | ประเภทข่าว :
            {{ news.type }}
          </p>
        </div>

        <div class="pt-6 mt-10 border-t border-blueGray-200"></div>

        <div class="flex flex-wrap">
          <div class="w-full px-2 pb-4 lg:w-12/12">
            <div
              class="relative flex flex-col w-full min-w-0 mb-6 break-words max-h-news h-full"
            >
              <div class="px-0 mt-2 lg:px-10">
                <img
                  v-if="news.poster"
                  :src="news.poster"
                  class="max-h-400-px rounded-lg center-img shadow-lg border"
                />
                <h3 class="mt-8 font-semibold mb-4">รายละเอียดข่าว :</h3>
                <p class="rem2 whitespace-normal text-justify leading-norma">
                  {{ news.detail }}
                </p>
                <template v-if="news.link">
                  <h3 class="mt-8 font-semibold mb-4">ลิงค์ที่เกี่ยวข้อง :</h3>
                  <a
                    :href="news.link"
                    target="_blank"
                    class="whitespace-normal text-justify leading-norma"
                  >
                    {{ news.link }}
                  </a>
                </template>
                <div class="mt-10 text-center">
                  <router-link
                    class="px-6 py-3 mb-1 mr-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blueGray-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    to="/news"
                  >
                    ย้อนกลับ
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? Packages
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("news", ["news"]),
  },

  data() {
    return {
      id: this.$route.params.id,
    };
  },

  mounted() {
    this.getNewsById();
  },

  methods: {
    //? Get news by id
    ...mapActions("news", ["getNews"]),
    async getNewsById() {
      await this.getNews(this.id);
    },
  },
};
</script>
