<template>
  <SharedWrapper :width="width">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      @click.stop="() => $emit('click', idx)"
    >
      {{ item }}
    </div>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  props: {
    items: { type: Array, default: () => [] },
    width: { type: String, default: "" },
  },
});
</script>