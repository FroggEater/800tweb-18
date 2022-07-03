import Vue from "vue";
import moment from "moment";

import JSONCities from "@/static/cities.json";

export default Vue.extend({
  methods: {
    getSearchResults: async function (params) {
      const { value, type } = params;
      const {
        startValue: from,
        endValue: to,
        singleValue: city,
        peopleCount: count,
        period,
      } = value;

      let results;
      switch (type) {
        case "flight":
          results = await this.getFlights(from, to, count, period);
          break;
        case "hotel":
          results = await this.getHotels(city, period[0]);
          break;
        case "restaurant":
          results = await this.getRestaurants(city, period[0]);
          break;
        case "bar":
          results = await this.getBars(city, period[0]);
          break;
        case "museum":
          results = await this.getMuseums(city, period[0]);
          break;
      }

      return results;
    },
    getFlights: async function (from, to, count, period) {
      const body = {
        departure: JSONCities[from],
        arrival: JSONCities[to],
        adults: count + "",
      };

      let date = period[0];
      let results = [];
      while (date <= period[1]) {
        const subResults = await this.$axios
          .$post("flights-amadeus", { ...body, date })
          .catch((err) => {
            return [];
          });
        results = [
          ...results,
          ...subResults.map((flight) => ({ ...flight, from, to, count, date })),
        ];
        date = moment(date).add(1, "days").format("YYYY-MM-DD");
      }

      return results;
    },
    getHotels: async function (city, date) {
      const body = { city };

      const results = await this.$axios
        .$post("hotels-google", body)
        .catch((err) => {
          return [];
        });
      return results.map((item) => ({ ...item, date }));
    },
    getRestaurants: async function (city, date) {
      const body = { city };

      const results = await this.$axios
        .$post("restaurants-google", body)
        .catch((err) => {
          return [];
        });
      return results.map((item) => ({ ...item, date }));
    },
    getBars: async function (city, date) {
      const body = { city };

      const results = await this.$axios
        .$post("bars-google", body)
        .catch((err) => {
          return [];
        });
      return results.map((item) => ({ ...item, date }));
    },
    getMuseums: async function (city, date) {
      const body = { city };

      const results = await this.$axios
        .$post("museums-google", body)
        .catch((err) => {
          return [];
        });
      return results.map((item) => ({ ...item, date }));
    },
  },
});
