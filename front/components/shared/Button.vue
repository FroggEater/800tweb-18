<template>
  <div
    :class="{
      'button d-flex align-items-center justify-content-center': true,
      'button-small': small,
      'button-icon': icon,
      'button-link': link,
      'button-accent': accent,
      'button-accent-pos': accent === 'positive',
      'button-accent-neg': accent === 'negative',
    }"
    @click.stop="() => handleClick()"
  >
    <feather
      v-if="icon"
      class="button-feather"
      :type="icon"
      :size="small ? '20px' : '28px'"
      :stroke-width="small ? '2.5px' : '2px'"
      :animation="loading ? 'spin' : ''"
    />
    <slot />
  </div>
</template>

<script lang="js">
import Vue from "vue";
import {mapState} from "vuex";

export default Vue.extend({
  props: {
    action: Function,
    icon: String,
    accent: String,
    small: Boolean,
    link: Boolean,
    loading: Boolean
  },
  computed: {
    ...mapState(["colors"])
  },
  methods: {
    handleClick: function () {
      if (this.action) this.action();
      this.$emit("click");
    }
  }
})
</script>

<style scoped lang="scss">
.button {
  height: 3rem;
  border: 2px solid $color-dark-sub;
  border-radius: 100px;
  background: transparent;
  color: $color-dark;

  &:hover {
    border-color: $color-dark;
  }

  &:active {
    color: $color-light;
  }

  &-small {
    height: 2rem;

    &.button-icon {
      width: 2rem;
    }
  }

  &-icon {
    width: 3rem;
  }

  &-link {
    border: none;
  }

  &-accent {
    &-pos {
      border-color: $color-positive;
      color: $color-positive;

      &:hover {
        border: none;
        background: $color-positive;
        color: $color-light;
      }

      &:active {
        border: none;
        background: $color-positive-darker;
        color: $color-light;
      }
    }

    &-neg {
      border-color: $color-negative;
      color: $color-negative;

      &:hover {
        border: none;
        background: $color-negative;
        color: $color-light;
      }

      &:active {
        border: none;
        background: $color-negative-darker;
        color: $color-light;
      }
    }
  }
}
</style>
