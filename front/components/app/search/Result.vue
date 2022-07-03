<template>
  <SharedWrapper stretch :class="computedClass" :width="width">
    <iframe
      v-if="computedIFrameURL && !isFlight"
      loading="lazy"
      :src="computedIFrameURL"
    />
    <div :class="computedContentClass">
      <div class="ds-flex-row-between ds-text-content">
        <div>{{ computedHeader }}</div>
        <SharedButton icon="plus" small positive @click="() => handleSave()" />
      </div>

      <div class="ds-flex-row-between ds-text-body mt-3">
        <div>{{ computedSubInfo }}</div>
        <div class="ds-flex-row-end">
          <div>{{ computedExtraInfo }}</div>
          <feather class="mx-1" :type="isFlight ? 'users' : 'star'" />
        </div>
      </div>
    </div>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  props: {
    item: { type: Object, default: () => {} },
    width: { type: String, default: "" },
    // Google
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    // Amadeus
    itineraries: { type: Array, default: () => [] },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    price: { type: String, default: "" },
    count: { type: [Number, String], default: 1 },
    numberOfBookableSeats: { type: Number, default: 1 },
  },
  computed: {
    computedClass: function () {
      const { isSaved } = this;
      const currClasses = ["ds-flex-row-between"];

      return [
        ...currClasses,
        "ds-search-item",
        isSaved && "ds-search-item--active",
      ];
    },
    computedContentClass: function () {
      const currClasses = ["ds-flex-col-between", "ds-flex-stretch"];

      return [...currClasses, "ds-search-item-content"];
    },
    computedIFrameKey: function () {
      return process.env.VUE_APP_GOOGLE_API_KEY;
    },
    computedIFrameURL: function () {
      const { computedIFrameKey, address } = this;
      if (!computedIFrameKey) return;

      const queryOne = "https://www.google.com/maps/embed/v1/search?q=";
      const queryTwo = "&key=" + computedIFrameKey;
      const processedAddress = address.split(" ").join("+");
      return queryOne + processedAddress + queryTwo;
    },
    computedHeader: function () {
      const { from, to, name, isFlight } = this;
      return isFlight ? `${from} to ${to}` : name;
    },
    computedSubInfo: function () {
      const { itineraries, address, isFlight } = this;
      const [itinerary] = itineraries;
      const { segments = [] } = itinerary || {};
      const stops = Math.max(segments.length - 1, 0);

      const flightTime = segments
        .reduce(
          (acc, curr) => {
            const duration = curr.duration.slice(2, -1).split("H");
            const [hours = 0, minutes = 0] = duration;

            const newHours = acc[0] + +hours;
            const newMinutes = acc[1] + +minutes;

            return [newHours + Math.trunc(newMinutes / 60), newMinutes % 60];
          },
          [0, 0]
        )
        .map((num, idx) =>
          idx === 0 ? (num + "").padStart(2, "0") : (num + "").padEnd(2, "0")
        )
        .join(":");

      return isFlight ? `${flightTime} (${stops}X)` : address;
    },
    computedExtraInfo: function () {
      const { rating, price, count, isFlight } = this;
      return isFlight ? `$${price} for ${count}` : rating;
    },
    isFlight: function () {
      const { itineraries } = this;
      return itineraries.length;
    },
    isSaved: function () {
      const { name, address, travel } = this;
      return travel.some(
        (step) =>
          Object.values(step).includes(name) &&
          Object.values(step).includes(address)
      );
    },
    ...mapState(["travel"]),
    ...mapGetters(["type"]),
  },
  methods: {
    handleSave: function () {
      const { type, item } = this;

      this.addStepToTravel({
        type,
        item,
      });
    },
    ...mapMutations(["addStepToTravel", "removeStepFromTravel"]),
  },
});
</script>

<style scoped lang="scss">
.ds-search-item {
  &-content {
    flex-grow: 1;
  }
}
</style>
