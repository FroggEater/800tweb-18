<template>
  <div class="ds-app-container ds-flex-row-between ds-flex-stretch">
    <div class="ds-app-nav">
      <SideNav height="13.25rem" left @click="(id) => handleClick(id)" />
    </div>
    <AppSearch width="60rem" />
    <div class="ds-app-stepper">
      <SideStepper height="13.25rem" right />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueFeather from "vue-feather";
import { mapActions, mapState } from "vuex";
import { MixinDB } from "@/mixins";

Vue.component("feather", VueFeather);

export default Vue.extend({
  mixins: [MixinDB],
  data() {
    return {
      isExpanded: false,
      convertToPDF: () => {},
    };
  },
  mounted() {
    this.loadSavedElements();
    this.convertToPDF = require("html2pdf.js");
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
    ...mapState(["isDownloading"]),
  },
  methods: {
    handleClick: function (id) {
      if (id !== "download") return;
      this.downloadTravel();
    },
    ...mapActions(["loadSavedElements", "downloadTravel"]),
  },
});
</script>

<style scoped lang="scss">
.ds-app {
  &-nav {
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
}
</style>
