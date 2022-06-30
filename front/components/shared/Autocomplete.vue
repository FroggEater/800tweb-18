<template>
  <div :class="computedClass">
    <SharedInput
      v-model="value"
      :button-action="buttonAction"
      :button-text="buttonText"
      :placeholder="placeholder"
      :small="small"
      @input="(v) => handleInput(v)"
      @focus="() => {}"
      @blur="() => (isExpanded = false)"
      @submit="(v) => $emit('submit', v)"
      @clear="() => handleClear()"
    />
    <SharedWrapper :class="computedSuggestionsClass" column>
      <div
        v-for="(item, idx) in items"
        :class="computedEntryClass"
        :key="idx"
        @click.stop="() => handleSelect(item)"
      >
        {{ item.label || "No label..." }}
      </div>
    </SharedWrapper>
  </div>
</template>

<script>
import Vue from "vue";
import { MixinDB } from "@/mixins";

export default Vue.extend({
  mixins: [MixinDB],
  props: {
    forcedItems: {
      type: Array,
      default: () => [
        { label: "Italie" },
        { label: "France" },
        { label: "UK" },
      ],
    },
    buttonAction: { type: Function, default: () => {} },
    buttonText: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    small: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      value: undefined,
      items: this.forcedItems,
    };
  },
  computed: {
    computedClass: function () {
      return ["ds-autocomplete", "ds-flex-col-start", "ds-flex-stretch"];
    },
    computedSuggestionsClass: function () {
      const { items, isExpanded } = this;
      const currClasses = ["ds-autocomplete-menu", "ds-text-body-small"];

      return [
        ...currClasses,
        items.length && isExpanded && "ds-autocomplete-menu--active",
      ];
    },
    computedEntryClass: function () {
      return ["ds-autocomplete-menu-entry"];
    },
    hasForcedItems: function () {
      const { forcedItems } = this;

      return !!forcedItems.length;
    },
  },
  methods: {
    loadSuggestions: async function () {
      const { value, hasForcedItems, forcedItems } = this;

      const results = hasForcedItems
        ? forcedItems
        : await this.getSearchSuggestions(value);
      const items = results.filter((r) => {
        const currentLabel = (r.label || "").toLowerCase();
        const currentSearch = value.toLowerCase();
        return currentLabel.includes(currentSearch);
      });

      this.$set(this, "items", items);
      this.isExpanded = !!items.length;
    },
    handleInput: function (val) {
      this.loadSuggestions();
      this.$emit("input", val);
    },
    handleSelect: function (item) {
      this.value = item.label;
      this.isExpanded = false;
    },
    handleClear: function () {
      this.isExpanded = false;
      this.$emit("clear");
    },
  },
});
</script>

<style scoped lang="scss">
.ds-autocomplete {
  position: relative;

  &-menu {
    height: 0rem;
    width: 100%;
    margin-top: 1rem;
    opacity: 0%;
    position: absolute;
    top: 4rem;
    transition: 0.25s;
    overflow: hidden;

    &--active {
      height: 10rem;
      opacity: 100%;
      transition: 0.25s;
    }

    &-entry {
    }
  }
}
</style>