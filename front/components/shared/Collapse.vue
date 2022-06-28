<template>
  <SharedWrapper
    :class="computedClass"
    :height="height"
    :noscroll="noscroll"
    column
    nowrap
    @mouseenter="() => handleMouseHover(true)"
    @mouseleave="() => handleMouseHover(false)"
  >
    <slot />
  </SharedWrapper>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    height: { type: String, default: "" },
    left: Boolean,
    right: Boolean,
    noscroll: Boolean,
    maximize: Boolean,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    computedClass: function () {
      const { isExpanded, left, right, maximize } = this;
      const currClasses = ["ds-collapse"];
      const alignClass = left
        ? "ds-collapse-left"
        : right
        ? "ds-collapse-right"
        : "ds-collapse-center";

      return [
        ...currClasses,
        alignClass,
        maximize && "ds-collapse-maximize",
        isExpanded && "ds-collapse--active",
      ];
    },
  },
  methods: {
    handleMouseHover: function (hover) {
      const { isExpanded } = this;

      if (hover !== isExpanded) this.isExpanded = hover;
      this.$emit("hover", this.isExpanded);
    },
  },
});
</script>

<style scoped lang="scss">
.ds-collapse {
  // !important to override the prop-set height if <maximize> is dynamically
  // changed
  &-maximize {
    height: 100% !important;
    transition: 0.25s;
  }

  // Ugly as fuck, but fits like a glove with the icons of normal sized
  // stretched SharedButtons
  &:not(.ds-collapse--active) {
    width: 4.25rem;
    transition: 0.25s;
  }

  &--active {
    width: 100%;
    transition: 0.25s;
  }

  &-left {
    margin-left: 0;
    margin-right: auto;
  }

  &-center {
    margin-left: auto;
    margin-right: auto;
  }

  &-right {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>