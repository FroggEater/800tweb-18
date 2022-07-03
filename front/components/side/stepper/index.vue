<template>
  <SharedCollapse
    :class="computedClass"
    :height="height"
    :left="left"
    :right="right"
    :maximize="isMaximized"
    :force-expanded="forceExpanded"
    @hover="(h) => handleMouseHover(h)"
  >
    <SharedButton
      collapse
      :icon="isMaximized ? 'minimize-2' : 'maximize-2'"
      :expanded="isExpanded"
      :hide-slot="!isExpanded"
      @click="() => (isMaximized = !isMaximized)"
      >{{ isMaximized ? "Minimize" : "Maximize" }}</SharedButton
    >

    <SideStepperItem
      v-for="(step, idx) in travel"
      :item="step"
      :key="idx"
      :separator="idx !== 0"
      :hide-info="!isExpanded"
      :expanded="isExpanded"
      @click="() => removeStepFromTravel(idx)"
    />

    <div id="id-travel" class="ds-flex-col-start ds-flex-stretch">
      <SideStepperItem
        v-for="(step, idx) in travel"
        expanded
        raw
        :item="step"
        :key="idx"
        :number="idx"
        :separator="idx !== 0"
      />
    </div>

    <SharedButton
      icon="x"
      negative
      collapse
      :expanded="isExpanded"
      :hide-slot="!isExpanded"
      @click="() => clearTravel()"
      >Clear</SharedButton
    >
  </SharedCollapse>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  props: {
    height: { type: String, default: "" },
    left: Boolean,
    right: Boolean,
    forceExpanded: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      isMaximized: false,
    };
  },
  computed: {
    computedClass: function () {
      const { isExpanded, forceExpanded, isMaximized } = this;

      return [
        "ds-stepper",
        (isExpanded || forceExpanded) && "ds-stepper--active",
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
    ...mapActions([
      "saveTravel",
      "addStepToTravel",
      "removeStepFromTravel",
      "clearTravel",
      "setTravel",
    ]),
  },
});
</script>

<style scoped lang="scss">
.ds-stepper {
  #id-travel {
    position: absolute;
    left: -100rem;
    gap: 1rem;
  }

  &-control {
    min-width: 13.75rem;
  }
}
</style>
