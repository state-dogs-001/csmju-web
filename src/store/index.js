import { createStore } from "vuex";
import auth from "./auth";
import personnel from "./personnel";
import home from "./home";

const store = createStore({
  modules: {
    auth,
    personnel,
    home,
  },
});

export default store;
