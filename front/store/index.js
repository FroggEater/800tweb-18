import moment from "moment";
import colors from "@/assets/scss/_colors.scss";
import { stepTypes } from "@/utils";

import JSONCities from "@/static/cities.json";

export const state = () => ({
  // SCSS attributes
  colors,
  // App attributes
  period: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
  travel: [],
  cities: [],
  types: [],
  type: {},
});

export const getters = {
  period: function (state) {
    const [start, end] = state.period;
    return { start: new Date(start), end: new Date(end) };
  },
  type: function (state) {
    return state.type.value;
  },
};

export const mutations = {
  addStepToTravel: function (state, step) {
    // Additional 1:1 parsing takes place here
    const {
      type,
      period,
      duration,
      cost,
      name,
      startCity,
      startCountry,
      endCity,
      endCountry,
      count,
    } = step;

    state.travel = [
      ...state.travel,
      {
        type,
        period,
        duration,
        cost,
        name,
        startCity,
        startCountry,
        count,
        ...(type === "flight" && {
          ...(endCity && { endCity }),
          ...(endCountry && { endCountry }),
        }),
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
  setCities: function (state, cities) {
    state.cities = cities;
  },
  setTypes: function (state, types) {
    state.types = types;
    state.type = types[0];
  },
  setType: function (state, type) {
    state.type = state.types.find((t) => t.value === type) || state.types[0];
  },
};

export const actions = {
  nuxtServerInit: async function (context) {
    const cleanedCities = Object.keys(JSONCities).map((label) => {
      const city = { label, trigram: JSONCities[label] };
      return city;
    });

    context.commit("setCities", cleanedCities);
    context.commit("setTypes", stepTypes);
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
