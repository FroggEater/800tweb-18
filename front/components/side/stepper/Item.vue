<template>
  <div :class="computedClass" @click.stop="() => $emit('click')">
    <feather class="mr-2" size="28px" :type="type" />
    <div :class="computedInfoClass">
      <div>{{ name }}</div>
      <div>{{ city }}, {{ country }}</div>
      <div :class="computedSubInfoClass">
        <div>{{ time }}</div>
        <div>{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    type: { type: String, default: "x" },
    date: { type: String, default: "12/12" },
    time: { type: String, default: "12:00" },
    name: { type: String, default: "No name..." },
    city: { type: String, default: "No city..." },
    country: { type: String, default: "No country..." },
    expanded: { type: Boolean, default: true },
    separator: Boolean,
    hideInfo: Boolean,
  },
  computed: {
    computedClass: function () {
      const { expanded } = this;

      return [
        "ds-stepper-item",
        "ds-flex-row-between",
        expanded && "ds-stepper-item--active",
      ];
    },
    computedInfoClass: function () {
      const { hideInfo } = this;
      const currClasses = [
        "ds-stepper-item-info",
        "ds-text-body-small",
        "ds-flex-col-center",
      ];

      return [...currClasses, hideInfo && "ds-stepper-item-info--hidden"];
    },
    computedSubInfoClass: function () {
      return ["ds-stepper-item-subinfo", "ds-flex-row-between"];
    },
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

  > * {
    flex-shrink: 0;
  }

  &-info {
    margin: auto;
    opacity: 100%;
    font-weight: bold;
    transition: 0.25s;

    &--hidden {
      opacity: 0%;
      transition: 0.25s;
    }
  }

  &-subinfo {
    width: 100%;
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
