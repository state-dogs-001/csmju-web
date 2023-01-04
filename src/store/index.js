import { createStore } from "vuex";
import personnel from "./personnel";
import banner from "./banner";
import news from "./news";
import document from "./document";

const store = createStore({
  modules: {
    personnel,
    banner,
    news,
    document,
  },
});

export default store;
