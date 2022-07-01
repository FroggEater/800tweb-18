<template>
  <div class="ds-flex-row-start" :style="computedStyle">
    <SharedButton
      class="mr-3"
      icon="calendar"
      @click="() => (isDatePickerExpanded = !isDatePickerExpanded)"
    />
    <SharedWrapper column :class="computedDatePickerClass">
      <v-date-picker v-model="activePeriod" is-range />
    </SharedWrapper>

    <SharedButton
      class="mr-3"
      :icon="isSearchingFlights ? 'cloud' : 'home'"
      @click="() => (isSearchingFlights = !isSearchingFlights)"
    />

    <SharedAutocomplete
      v-show="isSearchingFlights"
      v-model="startValue"
      class="ds-search-field"
      placeholder="Starting city"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('startValue')"
      @select="(i) => (startValue = i.label)"
    />

    <SharedAutocomplete
      v-show="isSearchingFlights"
      v-model="endValue"
      class="ds-search-field"
      placeholder="Destination city"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('endValue')"
      @select="(i) => (endValue = i.label)"
    />

    <SharedAutocomplete
      v-show="!isSearchingFlights"
      v-model="singleValue"
      class="ds-search-field"
      placeholder="Destination city"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('singleValue')"
      @select="(i) => (singleValue = i.label)"
    />

    <SharedButton positive @click="() => handleSubmit()"> Search </SharedButton>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";

export default Vue.extend({
  props: {
    width: { type: String, default: "" },
  },
  data() {
    return {
      isDatePickerExpanded: false,
      isSearchingFlights: false,
      startValue: "",
      endValue: "",
      singleValue: "",
      activePeriod: { start: new Date(), end: new Date() },
    };
  },
  computed: {
    computedDatePickerClass: function () {
      const { isDatePickerExpanded } = this;
      const currClasses = ["ds-search-field-picker", "ds-text-body-small"];

      return [
        ...currClasses,
        isDatePickerExpanded && "ds-search-field-picker--active",
      ];
    },
    computedStyle: function () {
      const { width } = this;

      return { ...(width && { width }) };
    },
    ...mapGetters(["period"]),
  },
  created() {
    const { period } = this;
    console.log({ period });

    this.activePeriod = period;
  },
  methods: {
    handleClear: function (key) {
      this[key] = "";
      const { startValue, endValue, singleValue, isSearchingFlights } = this;

      if (isSearchingFlights && ![startValue, endValue].filter(Boolean)[0])
        this.$emit("clear");
      if (!isSearchingFlights && !singleValue) this.$emit("clear");
    },
    handleSubmit: function () {
      const {
        startValue,
        endValue,
        singleValue,
        activePeriod,
        isSearchingFlights,
      } = this;

      console.log({ startValue, endValue, singleValue, activePeriod });
      this.isDatePickerExpanded = false;
      this.setPeriod(activePeriod);
      this.$emit("submit", {
        startValue,
        endValue,
        singleValue,
        isSearchingFlights,
        activePeriod,
      });
    },
    ...mapMutations(["setPeriod"]),
  },
});
</script>

<style scoped lang="scss">
.ds-search-field {
  margin-right: 1rem;
  flex-grow: 1;

  &-picker {
    height: 0rem;
    margin-top: 1rem;
    opacity: 0%;
    position: absolute;
    top: 4rem;
    transition: 0.25s;

    &--active {
      height: 19rem;
      opacity: 100%;
      transition: 0.25s;
    }
  }
}
</style>