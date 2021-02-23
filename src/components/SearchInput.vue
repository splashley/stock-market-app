<template>
  <div class="autocomplete-search">
    <input
      type="text"
      class="autocomplete-input"
      placeholder="testing 1 2 3"
      id="search-input"
      v-model="searchValue"
      @input="onChange()"
    />
    <div
      class="autocomplete-results-wrapper"
      v-show="!hidden && searchResults && searchResults.length > -1"
    >
      <div
        v-for="(result, index) in searchResults"
        :key="index"
        class="autocomplete-results"
        @click="
          searchValue = result['1. symbol'].toLowerCase();
          getSingleResult(result, index);
        "
      >
        <div class="autocomplete-result">{{ result["1. symbol"] }}</div>
        <div class="autocomplete-result">{{ result["2. name"] }}</div>
      </div>
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
      hidden: true,
      symbol: "",
    };
  },
  methods: {
    onChange() {
      if (this.searchValue.length >= 2) {
        this.getSearchResults();
      }
    },
    getSearchResults() {
      const urlBase = `https://www.alphavantage.co/query`;
      const params = {
        function: "SYMBOL_SEARCH",
        keywords: this.searchValue,
        apikey: process.env.VUE_APP_ALPHA_VANTAGE_APIKEY,
      };
      axios
        .get(urlBase, { params })
        .then((res) => {
          this.hidden = false;
          this.searchResults = res.data.bestMatches;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getSingleResult(result) {
      this.hidden = true;
      this.$store.commit("setResult", result);
      this.symbol = result["1. symbol"];
      this.getSearchResultData();
      console.log(this.symbol);
    },
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
          const returnedData = res.data["Time Series (Daily)"];
          const lastItem = returnedData[Object.keys(returnedData)[0]];
          this.$store.commit("setReturnedResult", lastItem);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("setError", err.message);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.autocomplete-search {
  width: 300px;
  margin: 0 auto;
  position: relative;
}
.autocomplete-input {
  padding: 10px;
  width: 300px;
  border-radius: 2px;
  border: 1px solid black;
}
.autocomplete-results-wrapper {
  position: absolute;
}
.autocomplete-results {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  width: 300px;
  border: 1px solid grey;
  padding: 10px;
  background-color: lightgray;
  color: black;
}
.autocomplete-results:hover {
  background-color: gray;
  cursor: pointer;
}
</style>
