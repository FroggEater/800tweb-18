import moment from "moment";
import colors from "@/assets/scss/_colors.scss";
import { stepTypes } from "@/utils";

import JSONCities from "@/static/cities.json";

export const state = () => ({
  // SCSS attributes
  colors,
  // App attributes
  rawPeriod: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
  travel: [],
  cities: [],
  types: [],
  type: {},
});

export const getters = {
  period: function (state) {
    const [start, end] = state.rawPeriod;
    return { start: new Date(start), end: new Date(end) };
  },
  type: function (state) {
    return state.type.value;
  },
};

export const mutations = {
  addStepToTravel: function (state, step) {
    // Additional 1:1 parsing takes place here
    const { type, item } = step;
    const icon = state.types.find((t) => t.value === type).icon;

    state.travel = [
      ...state.travel,
      {
        ...item,
        type,
        icon,
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
    state.rawPeriod = [startDate, endDate];
  },
  setStartDate: function (state, date) {
    const startDate = moment(date).format("YYYY-MM-DD");
    state.rawPeriod[0] = startDate;
  },
  setEndDate: function (state, date) {
    const endDate = moment(date).format("YYYY-MM-DD");
    if (!state.rawPeriod[0]) state.rawPeriod[0] = endDate;
    state.rawPeriod[1] = endDate;
  },
  clearPeriod: function (state) {
    const defaultDate = moment().format("YYYY-MM-DD");
    state.rawPeriod = [defaultDate, defaultDate];
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
