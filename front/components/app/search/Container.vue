<template>
  <SharedWrapper :width="width">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      @click.stop="() => $emit('click', idx)"
    >
      <AppSearchResult v-bind="item" />
    </div>
  </SharedWrapper>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    items: { type: Array, default: () => [] },
    width: { type: String, default: "" },
  },
});
</script>
