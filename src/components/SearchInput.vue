<template>
  <div class="autocomplete-list">
    <input
      type="text"
      class="autocomplete-input"
      placeholder="testing 1 2 3"
      id="search-input"
      v-model="searchValue"
      @input="onChange"
    />
      <div
        v-for="(results, index) in searchResults"
        :key="index"
        class="autocomplete-result"
      >
        <div class="">{{ results["1. symbol"] }}</div> 
        <div class="">{{ results["2. name"] }}</div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      searchResults: undefined,
    };
  },
  methods: {
    onChange() {
      this.apiCall();
    },
    apiCall() {
      const urlBase = `https://www.alphavantage.co/query`;
      const params = {
        function: "SYMBOL_SEARCH",
        keywords: this.searchValue,
        apikey: process.env.VUE_APP_ALPHA_VANTAGE_APIKEY,
      };
      axios
        .get(urlBase, { params })
        .then((res) => {
          console.log(res);
          this.searchResults = res.data.bestMatches;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.autocomplete-list {
    width: 300px;
    margin: 0 auto;
}
.autocomplete-input {
    padding: 10px;
    width: 300px;
    border-radius: 2px;
    border: 1px solid black;
}
.autocomplete-result {
    display: flex;
    justify-content: space-between;
    font-size: 0.90rem;
    width: 300px;
    border: 1px solid black;
    padding: 3px;
}
</style>
