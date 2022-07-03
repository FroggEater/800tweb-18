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
  isDownloading: false,
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
  setTravel: function (state, travel) {
    state.travel = travel;
  },
  spliceTravel: function (state, idx) {
    state.travel.splice(idx, 1);
  },
  toggleDownloading: function (state, bool) {
    state.isDownloading = bool;
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
  loadSavedElements: async function (context) {
    await context.dispatch("loadTravel");
  },
  loadTravel: async function (context) {
    const savedTravel = localStorage.getItem("currentTravel") || "{}";
    const objTravel = JSON.parse(savedTravel);
    const arrTravel = Object.values(objTravel);

    context.commit("setTravel", arrTravel);
  },
  downloadTravel: async function (context) {
    context.commit("toggleDownloading", true);

    const download = require("html2pdf.js");
    const doc = document.getElementById("id-travel");
    await download(doc);

    context.commit("toggleDownloading", false);
  },
  saveTravel: function (context) {
    const objTravel = context.state.travel.reduce(
      (acc, curr, idx) => ({ ...acc, [idx]: curr }),
      {}
    );
    const stringifiedTravel = JSON.stringify(objTravel);
    localStorage.setItem("currentTravel", stringifiedTravel);
  },
  addStepToTravel: function (context, step) {
    const { state, dispatch } = context;
    const { travel, types } = state;
    const { type, item } = step;
    const icon = types.find((t) => t.value === type).icon;

    context.commit("setTravel", [
      ...travel,
      {
        ...item,
        type,
        icon,
      },
    ]);
    dispatch("saveTravel");
  },
  removeStepFromTravel: function (context, idx) {
    context.commit("spliceTravel", idx);
    context.dispatch("saveTravel");
  },
  clearTravel: function (context) {
    context.commit("setTravel", []);
    context.dispatch("saveTravel");
  },
};
