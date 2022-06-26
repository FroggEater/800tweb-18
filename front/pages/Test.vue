<template>
  <div class="ds-app-container ds-flex-col-center">
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

    <SharedInput class="ds-gap-col" placeholder="Placeholder"/>
    <SharedInput class="ds-gap-col" placeholder="Placeholder" small/>
    <SharedInput class="ds-gap-col" placeholder="Placeholder" button-text="button"/>
    <SharedInput class="ds-gap-col" placeholder="Placeholder" button-text="button" small/>
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
