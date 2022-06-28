<template>
  <div
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="() => $emit('mouseenter')"
    @mouseleave="() => $emit('mouseleave')"
  >
    <slot />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    height: { type: String, default: "" },
    width: { type: String, default: "" },
    column: Boolean,
    nowrap: Boolean,
    noscroll: Boolean,
  },
  computed: {
    computedClass: function () {
      const { column, noscroll, nowrap } = this;
      const currClasses = ["ds-wrapper", "ds-flex-start"];

      return [
        ...currClasses,
        column ? "ds-flex-col-start" : "ds-flex-row-start",
        nowrap && "ds-wrapper-nowrap",
        noscroll && "ds-wrapper-noscroll",
      ];
    },
    computedStyle: function () {
      const { height, width } = this;
      return {
        ...(height && { height }),
        ...(width && { width }),
      };
    },
  },
});
</script>

<style scoped lang="scss">
.ds-wrapper {
  background: $color-light;
  border: 2px solid $color-dark;
  border-radius: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;

  &-nowrap {
    flex-wrap: nowrap;
  }

  &-noscroll {
    overflow-y: hidden;
  }
}
</style>