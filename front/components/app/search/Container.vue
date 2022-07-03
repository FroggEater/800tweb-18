<template>
  <SharedWrapper column nowrap :class="computedClass" :width="width">
    <div v-if="items.length" :class="computedSubClass">
      <div
        v-for="(item, idx) in items"
        class="ds-search-results-item"
        :key="idx"
        @click.stop="() => $emit('click', idx)"
      >
        <AppSearchResult
          v-bind="item"
          width="100%"
          :item="item"
        />
      </div>
    </div>
    <div v-else :class="computedSubClass">No results, try another search.</div>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    items: { type: Array, default: () => [] },
    width: { type: String, default: "" },
  },
  computed: {
    computedClass: function () {
      return ["ds-search-results"];
    },
    computedSubClass: function () {
      const { items } = this;
      const currClasses = ["ds-flex-col-start", "ds-flex-strech"];
      const textClasses = [!items.length && "ds-text-content"];

      return [
        ...currClasses,
        ...textClasses,
        "ds-search-results-list",
        !items.length && "ds-search-results-list--empty",
      ];
    },
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler: function (val) {
        console.log("SearchContainer items", val);
      },
    },
  },
});
</script>

<style scoped lang="scss">
.ds-search-results {
  flex-shrink: 1;

  &-item {
    width: 100%;
  }

  &-list {
    gap: 1rem;
    width: 100%;

    &-empty {
      margin: auto;
      text-align: center;
    }
  }
}
</style>
