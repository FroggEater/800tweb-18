import moment from "moment";
import colors from "@/assets/scss/_colors.scss";

export const state = () => ({
  // SCSS attributes
  colors,
  // App attributes
  period: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
  travel: [],
});

export const getters = {
  period: function (state) {
    const [start, end] = state.period;
    return { start: new Date(start), end: new Date(end) };
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
  setPeriod: function (state, { start, end }) {
    const startDate = moment(start).format("YYYY-MM-DD");
    const endDate = moment(end || start).format("YYYY-MM-DD");
    state.period = [startDate, endDate];
  },
  setStartDate: function (state, date) {
    const startDate = moment(date).format("YYYY-MM-DD");
    state.period[0] = startDate;
  },
  setEndDate: function (state, date) {
    const endDate = moment(date).format("YYYY-MM-DD");
    if (!state.period[0]) state.period[0] = endDate;
    state.period[1] = endDate;
  },
  clearPeriod: function (state) {
    const defaultDate = moment().format("YYYY-MM-DD");
    state.period = [defaultDate, defaultDate];
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
