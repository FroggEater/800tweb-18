<template>
  <div class="perdu d-flex flex-column align-items-center p-5">
    <span class="exemple__text" @click="$router.push('/')">
      Vas y clic Mameeene {{ yolo }}
    </span>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    yolo: String
  }
})
</script>

<style lang="scss" scoped>
.perdu {
  width: 20rem;
  background: rgba(56, 1, 119, 0.26);
  border-radius: 0.8rem;

  &__text {
    color: rgb(189, 189, 189);

    &:hover {
      cursor: pointer;
    }
  }

}
</style>
