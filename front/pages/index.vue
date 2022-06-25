<template>
  <div class="d-flex flex-row justify-content-center pt-4">
    <HomeExample :yolo="yolo"/>
    <Input :placeholder="`What's your next stop?`" :small="true"/>
  </div>
</template>

<script>
import Vue from "vue";
import VueFeather from "vue-feather";
import Input from "../components/shared/Input"

Vue.component("feather", VueFeather);
Vue.component("Input", Input)

export default Vue.extend({
  name: 'IndexPage',
  components: {
      Input
    }, 
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
          id: 3,
          text: 'voila voila'
        }
      }
    }
  },
})
</script>
