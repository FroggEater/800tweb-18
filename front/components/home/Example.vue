<template>
  <div class="exemple d-flex flex-column align-items-center p-5">
    <div v-for="item in yolo" :key="item.id" class="d-flex align-items-center">
      <feather class="mr-1" type="info" :stroke="colors.light" />
      <span class="exemple__text" @click="$router.push(`/perdu/${item.id}`)">
        {{ item.text }}
      </span>
      <SharedButton class="ml-2" accent="negative" :action="() => tempAction()"
        >BUTTON</SharedButton
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  props: {
    yolo: {},
  },
  computed: {
    ...mapState(["colors"]),
  },
  methods: {
    tempAction: function () {
      console.log("button - action");
    },
  },
});
</script>

<style lang="scss" scoped>
.exemple {
  width: 20rem;
  background: $color-light;
  border-radius: 0.8rem;

  &__text {
    color: $color-dark;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
