import { createStore } from "vuex";

const store = createStore({
  state: {
    newsShowAll: 0,
    albumShowAll: 0,

    bannerEdit: 0,
    newsEdit: 0,
    alumnusEdit: 0,
    StudentEdit: 0,
    personnelEdit: 0,
    aboutEdit: 0,
    subjectEdit: 0,
    equipmentEdit: 0,
    roomEdit: 0,

    activityEdit: 0,
    bookingEdit: 0,
    repairEdit: 0,

    aboutid: 1,

    id_login: 0,
  },
  modules: {},
});

export default store;
