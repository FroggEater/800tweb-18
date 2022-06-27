<template>
  <div class="ds-app-container ds-flex-row-between ds-flex-stretch">
    <div class="ds-app-menu">
      <ListMenu alignment="left" @click="(l) => handleMenuClick(l)" />
    </div>
    <div class="ds-app-main ds-flex-col-start">
      <SharedInput
        placeholder="Search for a destination..."
        button-text="Search"
        :class="computedSearchBarClass"
        @submit="(v) => handleSubmit(v)"
        @clear="() => (isExpanded = false)"
      />
      <SharedWrapper :class="computedSearchContainerClass">
        <SharedWrapper col
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
          error.</SharedWrapper
        >
        <SharedWrapper col
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          deleniti!</SharedWrapper
        >
        <SharedWrapper col
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. A,
          omnis!</SharedWrapper
        >
      </SharedWrapper>
    </div>
    <div class="ds-app-stepper">
      <ListMenu alignment="right" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueFeather from "vue-feather";
import { MixinDB } from "@/mixins";

Vue.component("feather", VueFeather);

export default Vue.extend({
  mixins: [MixinDB],
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    computedSearchBarClass: function () {
      const { isExpanded } = this;
      return ["ds-app-search-bar", isExpanded && "ds-app-search-bar--active"];
    },
    computedSearchContainerClass: function () {
      const { isExpanded } = this;
      return [
        "ds-app-search-container",
        isExpanded && "ds-app-search-container--active",
      ];
    },
  },
  methods: {
    handleSubmit: function (v) {
      console.log("Submit", v);
      this.isExpanded = true;
      this.getSearchResults(v);
    },
    handleMenuClick: function (v) {
      console.log("Menu", v);
    },
  },
});
</script>

<style scoped lang="scss">
.ds-app {
  &-menu {
    align-self: center;
    flex-basis: 16rem;
  }

  &-stepper {
    align-self: center;
    flex-basis: 16rem;
  }

  &-main {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  &-search-bar {
    width: 60rem;
    top: calc((100% - 4rem) / 2);
    transition: 0.5s;

    &--active {
      top: 0;
      transition: 0.5s;
    }
  }

  &-search-container {
    width: 60rem;
    margin-top: 100rem;
    flex-grow: 1;
    transition: 0.5s;

    &--active {
      margin-top: 2rem;
      transition: 0.5s;
    }
  }
}
</style>
