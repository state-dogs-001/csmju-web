import { createStore } from "vuex";
import auth from "./auth";
import personnel from "./personnel";

const store = createStore({
  modules: {
    auth,
    personnel,
  },
});

export default store;
