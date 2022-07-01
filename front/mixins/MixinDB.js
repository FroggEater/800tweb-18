import Vue from "vue";

const TYPES = ["get", "post"];

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
    queryCustom: async function (type, target, params = {}) {
      try {
        if (!TYPES.includes(type))
          throw "ERR - Passed query type is incorrect.";

        const query = this.computeQuery(target);
        const method = "$" + type;
      } catch (err) {
        console.error(err.message);
      }
    },
    getSearchSuggestions: async function (param) {},
    getSearchResults: async function (param) {
      console.log("in getSearchResults", this.computedURL, param);
      const val = await this.$axios.$get("airports");
      console.log(val);
    },
  },
});
