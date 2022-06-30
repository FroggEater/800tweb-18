<template>
  <SharedCollapse
    :class="computedClass"
    :height="height"
    :left="left"
    :right="right"
    :maximize="isMaximized"
    @hover="(h) => handleMouseHover(h)"
  >
    <SharedButton
      class="ds-stepper-button-maximize"
      icon="x"
      positive
      collapse
      :expanded="isExpanded"
      :hide-slot="!isExpanded"
      @click="() => (isMaximized = !isMaximized)"
    >
      {{ isMaximized ? "Minimize" : "Maximize" }}
    </SharedButton>

    <SideStepperItem
      v-for="(step, idx) in travel"
      v-bind="step"
      :key="idx"
      :separator="idx !== 0"
      :hide-info="!isExpanded"
      :expanded="isExpanded"
      @click="() => removeStepFromTravel(idx)"
    />

    <SharedButton
      class="ds-stepper-button-minimize"
      icon="x"
      negative
      collapse
      :expanded="isExpanded"
      :hide-slot="!isExpanded"
      @click="() => clearTravel()"
    >
      Clear
    </SharedButton>
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
    ...mapState(["travel"]),
  },
  created() {
    // TODO > Remove, debug only
    this._populateStepper(10);
  },
  methods: {
    _populateStepper: function (length) {
      const types = ["anchor", "send"];
      this.clearTravel();

      [...new Array(length)].forEach((_v, idx) => {
        const rdTypeIdx = Math.round(Math.random());
        const rdTime = Math.round(Math.random() * 23);
        const rdDay = Math.round(Math.random() * 28);
        const rdMonth = Math.round(Math.random() * 12);

        const newStep = {
          type: types[rdTypeIdx],
          date:
            (rdDay + "").padStart(2, "0") +
            "/" +
            (rdMonth + "").padStart(2, "0"),
          time: (rdTime + "").padStart(2, "0") + ":00",
          name: "Here & There - " + idx,
          city: "Paris",
          country: "France",
        };

        this.addStepToTravel(newStep);
      });
    },
    handleMouseHover: function (hover) {
      const { isExpanded } = this;

      if (hover !== isExpanded) this.isExpanded = hover;
      this.$emit("hover", this.isExpanded);
    },
    ...mapMutations(["addStepToTravel", "removeStepFromTravel", "clearTravel"]),
    ...mapActions(["saveTravel"]),
  },
});
</script>