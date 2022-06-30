<template>
  <SharedCollapse
    :class="computedClass"
    :height="height"
    :noscroll="noscroll"
    :left="left"
    :right="right"
    @hover="(h) => handleMouseHover(h)"
  >
    <SharedButton
      v-for="(link, idx) in links"
      class="ds-nav-button"
      link
      collapse
      :key="idx"
      :icon="link.icon"
      :hide-slot="!isExpanded"
      @click="() => handleClick(link)"
    >
      {{ link.label }}
    </SharedButton>
  </SharedCollapse>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    height: { type: String, default: "" },
    noscroll: Boolean,
    left: Boolean,
    right: Boolean,
  },
  data() {
    return {
      isExpanded: false,
      links: [
        {
          label: "Home",
          icon: "home",
          action: () => {},
        },
        {
          label: "Maps",
          icon: "map",
          action: () => {},
        },
        {
          label: "Travels",
          icon: "compass",
          action: () => {},
        },
        {
          label: "Logout",
          icon: "user-x",
          action: () => {},
        },
      ],
    };
  },
  computed: {
    computedClass: function () {
      const { isExpanded } = this;

      return ["ds-nav", isExpanded && "ds-nav--active"];
    },
  },
  methods: {
    handleMouseHover: function (hover) {
      const { isExpanded } = this;

      if (hover !== isExpanded) this.isExpanded = hover;
      this.$emit("hover", this.isExpanded);
    },
    handleClick: function (link) {
      link.action();
      this.$emit("click", link);
    },
  },
});
</script>