<template>
  <SharedCollapse
    :class="computedClass"
    :height="height"
    :left="left"
    :right="right"
    :maximize="isMaximized"
    @hover="(h) => handleMouseHover(h)"
  >
    <div :class="computedControlClass">
      <SharedButton
        small
        :icon="isMaximized ? 'minimize-2' : 'maximize-2'"
        :expanded="isExpanded"
        :hide-slot="!isExpanded"
        @click="() => (isMaximized = !isMaximized)"
      />

      <SharedButton
        small
        positive
        icon="download"
        :expanded="isExpanded"
        :hide-slot="!isExpanded"
        @click="() => handleDownload()"
      />

      <SharedButton
        small
        icon="x"
        negative
        :expanded="isExpanded"
        :hide-slot="!isExpanded"
        @click="() => clearTravel()"
      />
    </div>

    <SideStepperItem
      v-for="(step, idx) in travel"
      v-bind="step"
      :key="idx"
      :separator="idx !== 0"
      :hide-info="!isExpanded"
      :expanded="isExpanded"
      @click="() => removeStepFromTravel(idx)"
    />
  </SharedCollapse>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  props: {
    height: { type: String, default: "" },
    left: Boolean,
    right: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      isMaximized: false,
    };
  },
  computed: {
    computedClass: function () {
      const { isExpanded, isMaximized } = this;

      return [
        "ds-stepper",
        isExpanded && "ds-stepper--active",
        isMaximized && "ds-stepper--focus",
      ];
    },
    computedControlClass: function () {
      return ["ds-stepper-control", "ds-flex-row-between"];
    },
    ...mapState(["travel"]),
  },
  methods: {
    handleMouseHover: function (hover) {
      const { isExpanded } = this;

      if (hover !== isExpanded) this.isExpanded = hover;
      this.$emit("hover", this.isExpanded);
    },
    handleDownload: function () {
      console.log("DOWNLOAD");
    },
    ...mapMutations(["addStepToTravel", "removeStepFromTravel", "clearTravel"]),
    ...mapActions(["saveTravel"]),
  },
});
</script>

<style scoped lang="scss">
.ds-stepper {
  &-control {
    min-width: 13.75rem;
  }
}
</style>
