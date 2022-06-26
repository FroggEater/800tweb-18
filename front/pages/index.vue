<template>
  <div class="ds-app-container ds-flex-col-center">
    <!-- <HomeExample :yolo="yolo" /> -->
    <!-- <SharedInput :placeholder="`What's your next stop?`" /> -->
    <SharedButton class="ds-gap-col" icon="user" positive>negative</SharedButton>
    <SharedButton class="ds-gap-col" positive small>negative</SharedButton>
    <SharedButton class="ds-gap-col" icon="user" negative>negative</SharedButton>
    <SharedButton class="ds-gap-col" negative small>negative</SharedButton>
    <SharedButton class="ds-gap-col" icon="user">neutral</SharedButton>
    <SharedButton class="ds-gap-col" small>neutral</SharedButton>
    <SharedButton class="ds-gap-col" icon="user" link>link</SharedButton>
    <SharedButton class="ds-gap-col" small link>link</SharedButton>

    <SharedButton class="ds-gap-col" icon="settings"/>
    <SharedButton class="ds-gap-col" icon="settings" small/>
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
