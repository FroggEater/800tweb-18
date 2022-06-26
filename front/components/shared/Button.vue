<template>
  <div :class="computedClass" @click.stop="() => handleClick()">
    <feather
      v-if="icon"
      :class="{'mr-2': hasContentInSlot, 'mx-auto': !hasContentInSlot}"
      :type="icon"
      :size="small ? '20px' : '28px'"
      :animation="loading ? 'spin' : ''"
    />
    <slot />
  </div>
</template>

<script lang="js">
import Vue from "vue";
import {mapState} from "vuex";

export default Vue.extend({
  props: {
    action: {type: Function, default: () => {}},
    icon: {type: String, default: ""},
    small: Boolean,
    link: Boolean,
    positive: Boolean,
    negative: Boolean,
    loading: Boolean
  },
  computed: {
    computedClass: function () {
      const {small, link, positive, negative, hasContentInSlot} = this;
      const currClasses = ["ds-button", "ds-flex-row-start"];
      const textClass = small ? "ds-text-content-small" : "ds-text-content";

      return [
        ...currClasses,
        textClass,
        (small && "ds-button-small"),
        (link && "ds-button-link"),
        (positive && "ds-button-pos"),
        (negative && "ds-button-neg"),
        (!hasContentInSlot && "ds-button-icon")
      ].join(" ");
    },
    hasContentInSlot: function () {
      return !!this.$slots.default;
    },
    ...mapState(["colors"])
  },
  methods: {
    handleClick: function () {
      this.action();
      this.$emit("click");
    }
  }
})
</script>

<style scoped lang="scss">
.ds-button {
  // Sizing and structure
  border-radius: 3rem;
  cursor: pointer;
  height: 3rem;
  padding: 0 1rem;

  &-small {
    border-radius: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
  }

  &-icon {
    padding: 0;
    width: 3rem;

    &.ds-button-small {
      width: 2rem;
    }
  }

  // Colors and states
  background: transparent;
  border: 2px solid $color-dark-sub;
  transition: 0.25s;

  &:hover {
    border-color: $color-dark;
    transition: 0.25s;
  }

  &:active {
    background: $color-dark;
    border-color: $color-dark;
    color: $color-light;
    transition: 0s;
  }

  &-pos {
    color: $color-positive;
    border-color: $color-positive;

    &:hover {
      color: $color-light;
      background: $color-positive;
      border-color: $color-positive;
    }

    &:active {
      color: $color-light;
      background: $color-positive-darker;
      border-color: $color-positive-darker;
    }
  }

  &-neg {
    color: $color-negative;
    border-color: $color-negative;

    &:hover {
      color: $color-light;
      background: $color-negative;
      border-color: $color-negative;
    }

    &:active {
      color: $color-light;
      background: $color-negative-darker;
      border-color: $color-negative-darker;
    }
  }

  &-link {
    border-color: transparent;
    color: $color-dark;

    &:hover {
      border-color: transparent;
      color: $color-dark;
      text-decoration-line: underline;
    }

    &:active {
      background: $color-light-lighter;
      border-color: transparent;
      color: $color-dark;
      text-decoration-line: underline;
    }
  }
}
</style>
