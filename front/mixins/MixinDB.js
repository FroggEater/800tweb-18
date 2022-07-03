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
          results = await this.getHotels(city);
          break;
        case "restaurant":
          results = await this.getRestaurants(city);
          break;
        case "bar":
        case "museum":
          break;
      }

      console.log("getSearchResults", { results });
      return results;
    },
    getFlights: async function (from, to, count, period) {
      const body = {
        departure: JSONCities[from],
        arrival: JSONCities[to],
        adults: count + "",
      };

      console.log("flights", { body, period });

      let date = period[0];
      const promises = new Array();
      while (date <= period[1]) {
        const promise = this.$axios
          .$post("flights-amadeus", { ...body, date })
          .catch((err) => {
            if (err.response.status === 404) return [];
          });
        promises.push(promise);
        date = moment(date).add(1, "days").format("YYYY-MM-DD");
      }

      const results = await Promise.all(promises);
      return results.reduce((acc, curr) => {
        return [
          ...acc,
          ...curr.map((flight) => ({ ...flight, from, to, count })),
        ];
      }, []);
    },
    getHotels: async function (city) {
      const body = { city };

      const results = await this.$axios
        .$post("hotels-google", body)
        .catch((err) => {
          if (err.response.status === 404) return [];
        });
      return results;
    },
    getRestaurants: async function (city) {
      const body = { city };

      const results = await this.$axios
        .$post("restaurants-google", body)
        .catch((err) => {
          if (err.response.status === 404) return [];
        });
      return results;
    },
    getBars: async function (city) {
      const body = { city };

      const results = await this.$axios
        .$post("bars-google", body)
        .catch((err) => {
          if (err.response.status === 404) return [];
        });
      return results;
    },
    getMuseums: async function (city) {
      const body = { city };

      const results = await this.$axios
        .$post("museums-google", body)
        .catch((err) => {
          if (err.response.status === 404) return [];
        });
      return results;
    },
  },
});
