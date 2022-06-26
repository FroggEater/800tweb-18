import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      hostName: "localhost",
      hostPort: 34002,
    };
  },
  computed: {
    computedURL: function () {
      const { hostName, hostPort } = this;
      return `http://${hostName}:${hostPort}/`;
    },
  },
  methods: {
    computeQuery: function (target) {
      const { computedURL } = this;
      return `${computedURL}/${target}`;
    },
    customQuery: async function (type, target, body = {}) {},
    getSearchResults: async function (param) {
      console.log("in getSearchResults", this.computedURL, param);
      const val = await this.$axios.$get("airports")
      console.log(val);
    },
  },
});
