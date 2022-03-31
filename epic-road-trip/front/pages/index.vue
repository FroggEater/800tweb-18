<template>
  <div class="d-flex flex-row justify-content-center pt-4">
    <HomeExemple :yolo="yolo"/>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      yolo: {
        1: {
          id: 1,
          text: 'Ceci est un exemple'
        },
        2: {
          id: 2,
          text: 'c\'est cool',
        },
        3: {
          id: 2,
          text: 'voila voila'
        }
      }
    }
  },
})
</script>
