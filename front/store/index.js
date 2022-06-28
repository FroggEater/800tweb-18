import colors from "@/assets/scss/_colors.scss";

export const state = () => ({
  // SCSS attributes
  colors,
  // App attributes
  user: {},
  travel: [],
});

export const getters = {
  isUserLoggedIn: function (state) {
    const { user } = state;

    return !!(user.id && user.email);
  },
};

export const mutations = {
  addStepToTravel: function (state, step) {
    // Additional 1:1 parsing takes place here
    const { type, date, time, name, city, country } = step;

    state.travel = [
      ...state.travel,
      {
        type,
        date,
        time,
        name,
        city,
        country,
      },
    ];
  },
  removeStepFromTravel: function (state, idx) {
    state.travel.splice(idx, 1);
  },
  clearTravel: function (state) {
    state.travel = [];
  },
};

export const actions = {
  nuxtServerInit: async function ({ dispatch }) {
    // TODO > Initial loading here, if needed (cf. docs if issues)
  },
  logUserIn: async function ({ state, getters, dispatch }, email, pass) {
    if (getters.isUserLoggedIn) await dispatch("logUserOut");
    // TODO > Log user to DB
  },
  logUserOut: async function ({ state, getters }) {
    if (!getters.isUserLoggedIn) return;
    // TODO > Logout current user
  },
  saveTravel: async function (state) {
    // TODO > Send current travel to DB
  },
};
