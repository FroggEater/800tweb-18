<template>
  <div class="d-flex flex-row justify-content-center pt-4">
    <PerduCard :yolo="yolo"/>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      yolo: "YOLO"
    }
  }
})
</script>
