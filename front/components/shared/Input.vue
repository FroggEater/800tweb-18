<template>
  <div class="ds-input-wrapper">
    <input
      v-model="value"
      type="text"
      :class="computedClass"
      :placeholder="placeholder"
      @keyup="(e) => handleKeyUp(e, value)"
      @input="(e) => handleInput(e)"
      @focus="() => $emit('focus')"
      @blur="() => $emit('blur')"
      @update="(v) => $emit('update', v)"
    />
    <div :class="computedButtonsClass">
      <SharedButton
        v-if="value"
        icon="x"
        negative
        :small="small"
        @click="() => handleClear()"
      />
      <SharedButton
        v-if="buttonText"
        class="ml-2"
        positive
        :small="small"
        @click="() => handleClick(value)"
      >
        {{ buttonText }}
      </SharedButton>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    customValue: { type: String, default: "" },
    buttonAction: { type: Function, default: () => {} },
    buttonText: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    small: Boolean,
  },
  data() {
    return {
      value: this.customValue,
    };
  },
  computed: {
    computedClass: function () {
      const { small } = this;
      const currClasses = ["ds-input"];
      const textClass = small ? "ds-text-body-small" : "ds-text-body";

      return [...currClasses, textClass, small && "ds-input-small"];
    },
    computedButtonsClass: function () {
      const { small } = this;
      const currClasses = ["ds-input-buttons", "ds-flex-row-end"];

      return [...currClasses, small && "ds-input-buttons-small"];
    },
  },
  methods: {
    handleClick: function (val) {
      if (!val) return;
      this.buttonAction();
      this.$emit("submit", val);
    },
    handleKeyUp: function (e, val) {
      if (!val) return;
      if (e.key === "Enter") this.$emit("submit", val);
    },
    handleClear: function () {
      this.value = undefined;
      this.$emit("clear");
    },
    handleInput: function (event) {
      this.$emit("update:customValue", event.target.value);
      this.$emit("input", event.target.value);
    },
  },
});
</script>

<style scoped lang="scss">
.ds-input {
  // Sizing and structure
  border-radius: 3rem;
  height: 4rem;
  width: 100%;
  padding: 0 2rem;

  &-small {
    height: 3rem;
  }

  &-wrapper {
    position: relative;
  }

  &-buttons {
    height: 4rem;
    padding: 0.5rem;
    position: absolute;
    right: 0;
    top: 0;

    &-small {
      height: 3rem;
    }
  }

  // Colors and states
  background: $color-light;
  border: 2px solid $color-dark-sub;
  outline: none !important;
  transition: 0.25s;

  &::placeholder {
    color: $color-light-sub;
  }

  &:hover {
    border-color: $color-dark;
    transition: 0.25s;
  }

  &:focus {
    background: $color-light-lighter;
    border-color: $color-dark;
    transition: 0.25s;
  }
}
</style>