<template>
  <div>
    <!-- Navbar -->
    <main-navbar />
    <main>
      <!-- Header -->
      <div
        class="relative flex items-center content-center justify-center pt-16 pb-32 custom min-h-screen-75"
      >
        <!-- Image Header -->
        <div class="top-0 w-full h-full bg-center bg-cover">
          <img
            alt="Background home page"
            :src="BgHome"
            class="relative mx-0 shadow-lg cropped center-img"
          />
        </div>

        <!-- Contents inside image header -->
        <div class="container absolute">
          <div class="flex flex-wrap -mt-20">
            <!-- Text -->
            <div class="w-full px-4 mt-32 text-left lg:w-6/12">
              <div class="pr-12 flex-wrap">
                <h1
                  class="cssanimation sequence fadeInBottom text-home font-semibold text-white"
                >
                  วิทยาการคอมพิวเตอร์
                </h1>
                <h2
                  class="cssanimation sequence fadeInBottom mt-0 text-4xl text-blueGray-200"
                >
                  คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้
                </h2>
              </div>
              <div class="my-6 rectangle" id="section1"></div>
              <div class="flex flex-wrap">
                <div
                  class="mt-2 mr-2 text-lg text-blueGray-200 item-center duration-150 ease-linear hover:text-emerald-600 hover:zoom-xs"
                >
                  <i class="px-2 far fa-play-circle fa-lg"></i>
                  <a href="#section2">รับชมวีดีโอแนะนำ</a>
                </div>
                <div class="border-l-2 mx-4"></div>
                <div
                  class="text-lg mt-2 text-blueGray-200 item-center duration-150 ease-linear hover:text-emerald-600 hover:zoom-xs"
                >
                  <i class="px-2 fas fa-arrow-down fa-lg"></i>
                  <a href="qrcode"> ดาวน์โหลดแอปพลิเคชัน CSMJU </a>
                </div>
              </div>
            </div>

            <!-- Banner -->
            <div class="w-full text-left lg:w-6/12">
              <div class="top-0 w-full h-full bg-center bg-cover">
                <Carousel
                  v-if="banner_array.length > 0"
                  :autoplay="this.speed"
                  :wrap-around="true"
                >
                  <Slide v-for="image in banner_array" :key="image.Banner_ID">
                    <div
                      class="cssanimation sequence fadeInBottom relative mx-0 shadow-lg bg-emerald-500 carousel__item cropped-bg round-lg"
                    >
                      <a :href="image.Link" target="_blank">
                        <img class="cropped-bg" :src="image.Banner_File" />
                      </a>
                    </div>
                  </Slide>
                  <!-- Next and Previous Button -->
                  <template #addons>
                    <Navigation />
                    <Pagination />
                  </template>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contents -->
      <section class="pb-20 lg:-mt-64 bg-blueGray-200 custom">
        <div class="container mx-auto">
          <!-- Menu -->
          <div class="flex flex-wrap">
            <!-- Main menu 1 -->
            <div class="w-full px-4 text-center md:w-6/12">
              <router-link to="/program">
                <div
                  class="relative flex flex-col w-full min-w-0 mb-8 break-words duration-150 ease-linear bg-white shadow-lg hover:zoom hover:text-white"
                >
                  <div class="flex-auto p-1">
                    <img
                      alt="Program"
                      :src="Menu1"
                      class="relative mx-0 shadow-lg lg:cropped-card1"
                    />
                  </div>
                </div>
              </router-link>
            </div>
            <!-- Main menu 2 -->
            <div class="w-full px-4 text-center md:w-6/12">
              <a href="http://www.admissions.mju.ac.th/" target="_blank">
                <div
                  class="relative flex flex-col w-full min-w-0 mb-8 break-words duration-150 ease-linear bg-white shadow-lg hover:zoom hover:text-white"
                >
                  <div class="flex-auto p-1">
                    <img
                      alt="Admissions"
                      :src="Menu2"
                      class="relative mx-0 shadow-lg lg:cropped-card1"
                    />
                  </div>
                </div>
              </a>
            </div>

            <!-- Sub menu -->
            <div
              class="w-full px-4 text-center md:w-4/12"
              v-for="item in subMenu"
              :key="item"
            >
              <router-link :to="item.link">
                <div
                  class="relative flex flex-col w-full min-w-0 mb-8 break-words duration-150 ease-linear bg-white shadow-lg hover:zoom hover:text-white"
                >
                  <div class="flex-auto p-1">
                    <img
                      :alt="item.alt"
                      :src="item.image"
                      class="relative mx-0 shadow-lg lg:cropped-card2"
                    />
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <!-- News and update -->
          <h1 class="px-6 pt-20 mt-4 mb-4 text-3xl">
            <b>News Update</b> | ข่าวสารล่าสุด
          </h1>
          <div class="flex flex-wrap mt-12 mb-12">
            <div
              v-for="n in 3"
              :key="n"
              class="w-full px-4 text-center md:w-4/12"
            >
              <router-link to="news" target="_blank">
                <div
                  class="relative flex flex-col w-full min-w-0 mb-8 break-words duration-150 ease-linear bg-white shadow-lg hover:zoom"
                >
                  <div class="flex-auto p-4">
                    <img
                      alt="..."
                      :src="News_Picture[n - 1]"
                      class="relative row-end-auto mx-0 shadow-lg cropped-card2"
                    />
                  </div>
                  <h3 class="px-4 mb-2 text-lg font-semibold truncate">
                    {{ News_Title[n - 1] }}
                  </h3>
                  <p class="px-4 pb-4 text-left truncate-3">
                    {{ News_Detail[n - 1] }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Curriculum -->
          <h1 class="px-6 pt-20 mt-12 mb-4 text-3xl">
            <b>Curriculum </b> | หลักสูตร
          </h1>
          <div class="mt-12 mb-12">
            <card-home-edu />
          </div>

          <!-- Introduction YouTube embed -->
          <h1 class="px-6 pt-20 mt-12 mb-4 text-3xl" id="section2">
            <b>Introduction </b> | วีดีโอแนะนำสาขา
          </h1>

          <div class="flex flex-wrap mt-12 mb-12">
            <div class="w-full px-4 text-center md:w-12/12">
              <div
                class="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg"
              >
                <div class="flex-auto px-0">
                  <div
                    class="relative w-full max-w-full overflow-hidden h-500-px pb-72"
                  >
                    <iframe
                      class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      src="https://www.youtube.com/embed/88JeU0ShY60"
                      title="Presentation | Com-Sci MJU 2020"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- Footer -->
    <main-footer />
  </div>
</template>

<script>
//? Components
import MainNavbar from "../components/navbars/MainNavbar.vue";
import MainFooter from "../components/footers/HomeFooter.vue";
import CardHomeEdu from "../components/cards/CardHomeEdu.vue";
//? Import images
import BgHome from "../assets/images/bg-home.png";
import Menu1 from "../assets/images/menu1.png";
import Menu2 from "../assets/images/menu2.png";
import Menu3 from "../assets/images/menu3.png";
import Menu4 from "../assets/images/menu4.png";
import Menu5 from "../assets/images/menu5.png";
//? API
import http from "../services/WebpageService";
//? Package
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
export default {
  components: {
    MainNavbar,
    MainFooter,
    CardHomeEdu,

    //? Carousel
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  data() {
    return {
      //?  Carousel
      speed: 5000, //? Speed of the carousel is 5 seconds

      //? Images
      BgHome,
      Menu1,
      Menu2,
      subMenu: [
        {
          image: Menu3,
          link: "/about",
          alt: "About",
        },
        {
          image: Menu4,
          link: "/activity",
          alt: "Activity",
        },
        {
          image: Menu5,
          link: "/contact",
          alt: "Contact",
        },
      ],

      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),

      news_array: [],
      banner_array: [],

      News_Title: [],
      News_Detail: [],
      News_Picture: [],
    };
  },

  mounted() {
    this.getNewsData();
    this.getBannerData();
  },

  methods: {
    //? Get news
    getNewsData() {
      http
        .get(`newsapp`)
        .then((response) => {
          this.news_array = response.data;
          this.news_array.reverse();
          for (let i = 0; i < 3; i++) {
            this.News_Title.push(this.news_array[i].News_Title);
            this.News_Detail.push(this.news_array[i].News_Detail);
            this.News_Picture.push(this.news_array[i].News_Picture);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 500) {
              const Toast = this.$swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });

              Toast.fire({
                icon: "error",
                title: "Connection Error",
              });
            }
          }
        });
    },

    //? Get banner
    getBannerData() {
      http
        .get(`banner`)
        .then((response) => {
          this.banner_array = response.data;
          this.banner_array.reverse();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 500) {
              const Toast = this.$swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });

              Toast.fire({
                icon: "error",
                title: "Connection Error",
              });
            }
          }
        });
    },
  },
};
</script>

<style></style>
