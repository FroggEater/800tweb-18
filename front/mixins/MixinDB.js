import Vue from "vue";

export default Vue.extend({
  methods: {
    getSearchResults: async function (params) {
      const { value, type } = params;
      const {
        startValue: from,
        endValue: to,
        singleValue: city,
        count,
        period,
      } = value;

      let results;
      switch (type) {
        case "flight":
          results = await this.getFlights(from, to, count, period);
          break;
        case "hotel":
          results = await this.getHotels(city, period);
          break;
        case "activity":
        case "restaurant":
          break;
      }

      console.log({ results });
      return results;
    },
    getFlights: async function (from, to, count, period) {
      const body = {
        departure: from,
        arrival: to,
        date: period[0],
        adults: count,
      };
      const results = await this.$axios.$post("flights-amadeus", body);

      return results;
    },
    getHotels: async function (city, period) {
      return await this.$axios.$post("hotels-google");
    },
    getRestaurants: async function (city, period) {},
    getActivities: async function (city, period) {},
  },
});
