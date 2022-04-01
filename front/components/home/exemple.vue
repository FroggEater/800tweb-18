<template>
  <div class="exemple d-flex flex-column align-items-center p-5">
    <div v-for="item in yolo" :key="item.id">
      <span class="exemple__text" @click="$router.push(`/perdu/${item.id}`)">
        {{ item.text }}
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    yolo: {}
  }
})
</script>

<style lang="scss" scoped>
.exemple {
  width: 20rem;
  background: rgba(1, 52, 119, 0.466);
  border-radius: 0.8rem;

  &__text {
    color: rgb(58, 55, 55);

    &:hover {
      cursor: pointer;
    }
  }

}
</style>
