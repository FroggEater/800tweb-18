<template>
  <SharedWrapper :width="width">
    {{ name }} - {{ computedPeriod }} - {{ computedCost }}
  </SharedWrapper>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";

export default Vue.extend({
  props: {
    from: { type: String, default: moment().format("YYYY-MM-DD") },
    to: { type: String, default: "" },
    width: { type: String, default: "" },
    name: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    destinationCity: { type: String, default: "" },
    destinationCountry: { type: String, default: "" },
    count: { type: Number, default: 1 },
    days: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    isFlight: Boolean,
  },
  computed: {
    computedDays: function () {
      const { from, to, days } = this;

      return to ? moment(from).diff(moment(to), "days") : days;
    },
    computedDuration: function () {
      const { computedDays } = this;

      return computedDays + 1;
    },
    computedPeriod: function () {
      const { from, to, computedDays } = this;

      return [
        from,
        to || moment(from).add(computedDays, "days").format("YYYY-MM-DD"),
      ];
    },
    computedTotalCost: function () {
      const { count, computedDuration, cost } = this;

      return count * computedDuration * cost;
    },
    ...mapState(["travel"]),
    ...mapGetters(["period", "type"]),
  },
  methods: {
    handleSave: function () {
      const {
        type,
        computedPeriod,
        name,
        city,
        country,
        destinationCity,
        destinationCountry,
        computedDuration,
        computedTotalCost,
        count,
      } = this;

      this.addStepToTravel({
        period: computedPeriod,
        duration: computedDuration,
        cost: computedTotalCost,
        startCity: city,
        startCountry: country,
        endCity: destinationCity,
        endCountry: destinationCountry,
        name,
        count,
        type,
      });
    },
    ...mapMutations(["addStepToTravel", "removeStepFromTravel"]),
  },
});
</script>
