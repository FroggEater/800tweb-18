<template>
  <div :class="computedClass">
    <SharedButton
      :positive="positive"
      :negative="negative"
      :small="small"
      :width="width"
      @click="() => (isExpanded = !isExpanded)"
    >
      {{ value }}
    </SharedButton>

    <SharedWrapper :class="computedDropdownClass" column>
      <div
        v-for="(item, idx) in items"
        :class="computedEntryClass"
        :key="idx"
        @click.stop="() => handleSelect(item)"
      >
        {{ item.label || "No label..." }}
      </div>
    </SharedWrapper>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    items: { type: Array, default: () => [] },
    width: { type: String, default: "" },
    value: { type: String, default: "" },
    positive: Boolean,
    negative: Boolean,
    small: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      label: "",
    };
  },
  computed: {
    computedClass: function () {
      return ["ds-dropdown", "ds-flex-col-start", "ds-flex-stretch"];
    },
    computedDropdownClass: function () {
      const { items, isExpanded } = this;
      const currClasses = ["ds-dropdown-menu", "ds-text-body-small"];

      return [
        ...currClasses,
        items.length && isExpanded && "ds-dropdown-menu--active",
      ];
    },
    computedEntryClass: function () {
      return ["ds-dropdown-menu-entry"];
    },
  },
  methods: {
    handleSelect: function (item) {
      this.isExpanded = false;
      this.$emit('select', item.value)
    }
  }
});
</script>

<style scoped lang="scss">
.ds-dropdown {
  position: relative;

  &-menu {
    height: 0rem;
    width: 100%;
    margin-top: 1rem;
    opacity: 0%;
    position: absolute;
    top: 4rem;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-wrap: nowrap !important;
    transition: 0.25s;

    &--active {
      height: 10rem;
      opacity: 100%;
      transition: 0.25s;
    }

    &-entry {
      cursor: pointer;
      text-align: center;
      width: 100%;
      border-radius: 3rem;
      background: $color-light;
      color: $color-dark;
      transition: 0.25s;

      &:hover {
        text-decoration-line: underline;
        transition: 0.25s;
      }

      &:active {
        background: $color-positive;
        color: $color-light;
        text-decoration-line: underline;
        transition: 0s;
      }
    }
  }
}
</style>
