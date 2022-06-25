<template>
  <div class="ds-app-container ds-flex-col-center">
    <!-- <HomeExample :yolo="yolo" /> -->
    <SharedInput :placeholder="`What's your next stop?`" />
    <SharedButton icon="user" accent="positive">POSITIVE</SharedButton>
  </div>
</template>

<script>
import Vue from "vue";
import VueFeather from "vue-feather";

Vue.component("feather", VueFeather);

export default Vue.extend({
  name: "PageIndex",
});
</script>
