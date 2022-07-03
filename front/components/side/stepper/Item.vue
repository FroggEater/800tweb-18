<template>
  <div :class="computedClass" @click.stop="() => $emit('click')">
    <div class="ds-flex-row-start">
      <feather class="mr-2" size="28px" :type="item.icon" />
      <div v-if="raw" class="mr-2">{{ number + 1 }} / {{ travel.length }}</div>
      <div v-if="raw">({{ item.date }})</div>
    </div>

    <div :class="computedContentClass">
      <div class="ds-flex-row-start ds-text-body-small ds-align-stretch">
        <div class="ds-stepper-item-header">{{ computedHeader }}</div>
      </div>

      <div
        class="
          ds-flex-row-between
          ds-text-body-small
          ds-flex-stretch
          ds-align-stretch
        "
      >
        <div>{{ computedSubInfo }}</div>
        <div class="ds-flex-row-end ds-align-stretch ds-flex-stretch">
          <div>{{ computedExtraInfo }}</div>
          <feather
            v-if="(isFlight && raw) || !isFlight"
            class="mx-1"
            :type="isFlight ? 'users' : 'star'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  props: {
    item: { type: Object, default: () => {} },
    type: { type: String, default: "" },
    icon: { type: String, default: "x" },
    number: { type: Number, default: 0 },
    expanded: { type: Boolean, default: true },
    separator: Boolean,
    hideInfo: Boolean,
    raw: Boolean,
  },
  computed: {
    computedClass: function () {
      const { expanded, raw } = this;

      return [
        "ds-stepper-item",
        "ds-flex-row-start",
        "ds-flex-strech",
        "ds-text-body",
        raw && "ds-stepper-item-raw",
        expanded && "ds-stepper-item--active",
      ];
    },
    computedContentClass: function () {
      const { hideInfo } = this;
      const currClasses = [
        "ds-stepper-item-content",
        "ds-text-body-small",
        "ds-flex-col-between",
        "ds-flex-stretch",
      ];

      return [...currClasses, hideInfo && "ds-stepper-item-content--hidden"];
    },
    computedHeader: function () {
      const { item, isFlight } = this;
      const { from, to, name } = item;
      return isFlight ? `${from} to ${to}` : name;
    },
    computedSubInfo: function () {
      const { item, isFlight, raw } = this;
      const { itineraries = [], address, vicinity } = item;
      const [itinerary = {}] = itineraries;
      const { segments = [] } = itinerary;
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

      return isFlight
        ? raw
          ? `${flightTime} with ${stops} stop(s)`
          : flightTime
        : raw
        ? address || vicinity
        : "";
    },
    computedExtraInfo: function () {
      const { item, isFlight, raw } = this;
      const { rating, price, count } = item;
      return isFlight ? (raw ? `$${price} for ${count}` : `$${price}`) : rating;
    },
    isFlight: function () {
      const { item } = this;
      return item.type === "flight";
    },
    ...mapState(["travel"]),
  },
});
</script>

<style scoped lang="scss">
.ds-stepper-item {
  // Sizing and structure
  border-radius: 3rem;
  cursor: pointer;
  width: 100%;
  max-height: 3rem;
  transition: 0.25s;

  &-raw {
    background: white;
    border-bottom: 1px solid $color-dark;
    border-radius: 0;
    padding-left: 2rem;
    padding-right: 2rem;
    gap: 1rem;

    .ds-stepper-item-header {
      white-space: normal;
      overflow: auto;
      width: 100%;
    }
  }

  > * {
    flex-shrink: 0;
  }

  &-header {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 11rem;
  }

  &-content {
    opacity: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    transition: 0.25s;

    &--hidden {
      opacity: 0%;
      transition: 0.25s;
    }
  }

  &--active {
    max-height: 10rem;
    transition: 0.25s;
  }

  // Colors and states
  background: $color-light;
  color: $color-dark;
  transition: 0.25s;

  &:hover {
    background: $color-light-lighter;
    color: $color-dark;
    transition: 0.25s;
  }

  &:active {
    background: $color-dark;
    color: $color-light;
    transition: 0s;
  }
}
</style>
