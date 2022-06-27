<template>
  <SharedWrapper
    :class="computedClass"
    nowrap
    @mouseenter="() => (isExpanded = true)"
    @mouseleave="() => (isExpanded = false)"
  >
    <SharedButton
      v-for="(link, idx) in links"
      class="ds-menu-button"
      link
      stretch
      :key="idx"
      :icon="link.icon"
      :hide-slot="!isExpanded"
      @click="() => handleClick(link)"
    >
      {{ link.label }}
    </SharedButton>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    alignment: { type: String, default: "left" },
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
      const { isExpanded, alignment } = this;
      const currClasses = ["ds-menu", "ds-flex-col-start"];

      let alignClass = "ds-menu";
      switch (alignment) {
        case "center":
          alignClass += "-center";
          break;
        case "right":
          alignClass += "-right";
          break;
        default:
          alignClass += "-left";
          break;
      }

      return [...currClasses, alignClass, isExpanded && "ds-menu--active"];
    },
  },
  methods: {
    handleClick: function (link) {
      link.action();
      this.$emit("click", link);
    },
  },
});
</script>

<style scoped lang="scss">
.ds-menu {
  height: 17.25rem;
  width: 4.25rem;
  overflow-x: hidden;
  transition: 0.25s;

  &-left {
    margin-left: 0;
    margin-right: auto;
  }

  &-center {
    margin-left: auto;
    margin-right: auto;
  }

  &-right {
    margin-left: auto;
    margin-right: 0;
  }

  &--active {
    width: 16rem;
    transition: 0.25s;
  }
}
</style>