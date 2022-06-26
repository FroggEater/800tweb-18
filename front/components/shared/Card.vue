<template>
  <div :class="computedClass" :style="computedStyle">
    <slot />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    row: Boolean,
    col: Boolean,
    dynamic: Boolean,
    scroll: Boolean,
  },
  computed: {
    computedClass: function () {
      const { row, col, dynamic, scroll } = this;
      return [
        "ds-card",
        row && "ds-flex-row-start",
        col && "ds-flex-col-start",
        dynamic && "ds-card-dynamic",
        scroll && "ds-card-scroll",
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
.ds-card {
  background: $color-light;
  border: 2px solid $color-dark;
  border-radius: 3rem;
  padding: 1rem;

  &-dynamic {
  }

  &-scroll {
    overflow: auto;
  }
}
</style>