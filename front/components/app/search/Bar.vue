<template>
  <div class="ds-flex-row-start" :style="computedStyle">
    <SharedDropdown
      class="mr-3"
      width="6rem"
      :value="type.label"
      :items="types"
      @select="(v) => setType(v)"
    />

    <SharedButton
      v-show="isSearchingFlights"
      class="mr-3"
      icon="calendar"
      @click="() => (isDatePickerExpanded = !isDatePickerExpanded)"
    />
    <SharedWrapper column :class="computedDatePickerClass">
      <v-date-picker v-model="activePeriod" is-range />
    </SharedWrapper>

    <SharedAutocomplete
      v-show="isSearchingFlights"
      v-model="startValue"
      class="ds-search-field"
      placeholder="Starting city"
      :items="cities"
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
      :items="cities"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('endValue')"
      @select="(i) => (endValue = i.label)"
    />

    <SharedAutocomplete
      v-show="!isSearchingFlights"
      v-model="singleValue"
      class="ds-search-field"
      placeholder="Target city"
      :items="cities"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('singleValue')"
      @select="(i) => (singleValue = i.label)"
    />

    <SharedInput
      v-show="isSearchingFlights"
      class="mr-3"
      placeholder="People"
      width="7rem"
      number
      hide-clear
      :custom-value="peopleCount"
      @input="(v) => peopleCount = v"
      @focus="() => (isDatePickerExpanded = false)"
      @submit="() => handleSubmit()"
      @clear="() => handleClear('peopleCount')"
    />

    <SharedButton positive @click="() => handleSubmit()"> Search </SharedButton>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState, mapMutations } from "vuex";

export default Vue.extend({
  props: {
    width: { type: String, default: "" },
  },
  data() {
    return {
      isDatePickerExpanded: false,
      startValue: "",
      endValue: "",
      singleValue: "",
      peopleCount: 1,
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
    isSearchingFlights: function () {
      const { type } = this;

      return type.value === "flight";
    },
    ...mapGetters(["period", "typeLabel"]),
    ...mapState(["cities", "types", "type"]),
  },
  created() {
    const { period } = this;
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
    ...mapMutations(["setPeriod", "setType"]),
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
