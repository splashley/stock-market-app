<template>
  <div class="returned-results" v-show="storeData">
    <section>
      {{storeData}}
      {{ storeData["1. symbol"] }}
      {{ storeData["2. name"] }}
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Result",
  computed: {
    storeData: function() {
      return this.$store.state.result;
    },
  },
  methods: {
        getSearchResultData() {
      const urlBase = `https://www.alphavantage.co/query`;
      const params = {
        function: "TIME_SERIES_DAILY",
        symbol: this.symbol,
        apikey: process.env.VUE_APP_ALPHA_VANTAGE_APIKEY,
      };
      axios
        .get(urlBase, { params })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>

<style lang="css" scoped>
.returned-results {
  position: relative;
  z-index: -1;
}
</style>
