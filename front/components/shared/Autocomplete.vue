<template>
  <div :class="computedClass">
    <SharedInput
      v-model="value"
      :button-action="buttonAction"
      :button-text="buttonText"
      :placeholder="placeholder"
      :small="small"
      :custom-value="value"
      @input="(v) => handleInput(v)"
      @focus="() => handleFocus()"
      @blur="() => (isExpanded = false)"
      @submit="(v) => $emit('submit', v)"
      @clear="() => handleClear()"
    />
    <SharedWrapper :class="computedSuggestionsClass" column>
      <div
        v-for="(item, idx) in computedItems"
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
    items: {
      type: Array,
      default: () => [],
    },
    buttonAction: { type: Function, default: () => {} },
    buttonText: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    small: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      value: "",
    };
  },
  computed: {
    computedClass: function () {
      return ["ds-autocomplete", "ds-flex-col-start", "ds-flex-stretch"];
    },
    computedSuggestionsClass: function () {
      const { isExpanded } = this;
      const currClasses = ["ds-autocomplete-menu", "ds-text-body-small"];

      return [...currClasses, isExpanded && "ds-autocomplete-menu--active"];
    },
    computedEntryClass: function () {
      return ["ds-autocomplete-menu-entry"];
    },
    computedItems: function () {
      const { items, value } = this;

      const filteredItems = items.filter((r) => {
        const currentLabel = (r.label || "").toLowerCase();
        const currentSearch = value.toLowerCase();
        return currentLabel.includes(currentSearch);
      });

      return filteredItems;
    },
  },
  methods: {
    handleInput: function (value) {
      const { computedItems } = this;

      this.isExpanded = computedItems.length;
      this.$emit("input", value);
    },
    handleSelect: function (item) {
      this.value = item.label;
      this.isExpanded = false;
      this.$emit("select", item);
    },
    handleClear: function () {
      this.value = "";
      this.isExpanded = false;
      this.$emit("clear");
    },
    handleFocus: function () {
      const { computedItems } = this;

      this.isExpanded = computedItems.length;
      this.$emit("focus");
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
    overflow-y: scroll;
    overflow-x: hidden;
    flex-wrap: nowrap !important;
    transition: 0.25s;

    &--active {
      height: 10rem;
      opacity: 100%;
      transition: 0.25s;
    }

    &-entry {
      cursor: pointer;
      text-align: center;
      width: 100%;
      transition: 0.25s;

      &:hover {
        text-decoration-line: underline;
        transition: O.25s;
      }

      &:active {
        text-decoration-line: underline;
        transition: 0s;
      }
    }
  }
}
</style>
