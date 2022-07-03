<template>
  <SharedWrapper stretch :class="computedClass" :width="width">
    <iframe v-if="computedIFrameURL" loading="lazy" :src="computedIFrameURL" />
    <div :class="computedContentClass">
      <div class="ds-flex-row-between ds-text-content">
        <div>{{ name }}</div>
        <SharedButton icon="plus" small positive @click="() => handleSave()" />
      </div>

      <div class="ds-flex-row-between ds-text-body mt-3">
        <div>{{ address }}</div>
        <div class="ds-flex-row-end">
          <div>{{ rating }}</div>
          <feather class="mx-1" type="star" />
        </div>
      </div>
    </div>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  props: {
    item: { type: Object, default: () => {} },
    location: { type: Object, default: () => {} },
    width: { type: String, default: "" },
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    rating: { type: Number, default: 0 },
  },
  computed: {
    computedClass: function () {
      const { isSaved } = this;
      const currClasses = ["ds-flex-row-between"];

      return [
        ...currClasses,
        "ds-search-item",
        isSaved && "ds-search-item--active",
      ];
    },
    computedContentClass: function () {
      const currClasses = ["ds-flex-col-between", "ds-flex-stretch"];

      return [...currClasses, "ds-search-item-content"];
    },
    computedIFrameKey: function () {
      return process.env.VUE_APP_GOOGLE_API_KEY;
    },
    computedIFrameURL: function () {
      const {computedIFrameKey, address} = this;
      if (!computedIFrameKey) return;

      const queryOne = "https://www.google.com/maps/embed/v1/search?q=";
      const queryTwo = "&key=" + computedIFrameKey; 
      const processedAddress = address.split(" ").join("+");
      return queryOne + processedAddress + queryTwo;
    },
    isSaved: function () {
      const { name, address, travel } = this;
      return travel.some(
        (step) =>
          Object.values(step).includes(name) &&
          Object.values(step).includes(address)
      );
    },
    ...mapState(["travel"]),
    ...mapGetters(["period", "type"]),
  },
  methods: {
    handleSave: function () {
      const { type, item } = this;

      this.addStepToTravel({
        type,
        item,
      });
    },
    ...mapMutations(["addStepToTravel", "removeStepFromTravel"]),
  },
});
</script>

<style scoped lang="scss">
.ds-search-item {
  &-content {
    flex-grow: 1;
  }
}
</style>
