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
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    col: Boolean,
    dynamic: Boolean,
    nowrap: Boolean,
    scroll: Boolean,
  },
  computed: {
    computedClass: function () {
      const { col, dynamic, scroll, nowrap } = this;
      const currClasses = ["ds-wrapper", "ds-flex-start"];

      return [
        ...currClasses,
        col ? "ds-flex-col-start" : "ds-flex-row-start",
        dynamic && "ds-wrapper-dynamic",
        nowrap && "ds-wrapper-nowrap",
        scroll && "ds-wrapper-scroll",
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

  &-scroll {
    overflow: auto;
  }
}
</style>