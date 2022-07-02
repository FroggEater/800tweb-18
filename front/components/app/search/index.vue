<template>
  <div class="ds-flex-col-start" :style="computedStyle">
    <AppSearchBar
      :class="computedSearchBarClass"
      :width="width"
      @submit="(v) => handleSubmit(v)"
      @clear="() => (isExpanded = false)"
    />
    <AppSearchContainer
      :class="computedSearchContainerClass"
      :width="width"
      :items="type !== 'flight' ? stayItems : flightItems"
    />
  </div>
</template>

<script>
import Vue from "vue";
import {mapGetters} from "vuex";
import { MixinDB } from "@/mixins";

export default Vue.extend({
  mixins: [MixinDB],
  props: {
    width: { type: String, default: "" },
  },
  data() {
    return {
      isExpanded: false,
      stayItems: [],
      flightItems: [],
    };
  },
  computed: {
    computedSearchBarClass: function () {
      const { isExpanded } = this;

      return ["ds-search-bar", isExpanded && "ds-search-bar--active"];
    },
    computedSearchContainerClass: function () {
      const { isExpanded } = this;

      return [
        "ds-search-container",
        isExpanded && "ds-search-container--active",
      ];
    },
    computedStyle: function () {
      const { width } = this;

      return { ...(width && { width }) };
    },
    ...mapGetters(["type"]),
  },
  methods: {
    handleSubmit: function (value) {
      const { type } = this;

      this.isExpanded = true;
      this.getSearchResults({ value, type });
    },
  },
});
</script>

<style scoped lang="scss">
.ds-search {
  &-bar {
    position: relative;
    top: calc((100% - 4rem) / 2);
    transition: 0.5s;

    &--active {
      top: 0;
      transition: 0.5s;
    }
  }

  &-container {
    margin-top: 100vh;
    flex-grow: 1;
    transition: 0.5s;

    &--active {
      margin-top: 2rem;
      transition: 0.5s;
    }
  }
}
</style>
