import colors from "@/assets/scss/_colors.scss";

export const state = () => ({
  // SCSS attributes
  colors,
  // App attributes
  travel: [],
});

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
  saveTravel: async function (state) {
    // TODO > Send current travel to localStorage
  },
  loadTravel: async function (state, idx) {
    // TODO > Load selected travel from localStorage
  },
  deleteTravel: async function (state, idx) {
    // TODO > Delete selected travel from localStorage
  },
};
