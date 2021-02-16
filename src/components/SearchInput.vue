<template>
  <div class="autocomplete-search">
    <input
      type="text"
      class="autocomplete-input"
      placeholder="testing 1 2 3"
      id="search-input"
      v-model="searchValue"
      @input="onChange"
      @blur="hidden = true"
    />
    <div class="autocomplete-results-wrapper" v-if="!hidden">
      <div
        v-for="(results, index) in searchResults"
        :key="index"
        class="autocomplete-results"
        v-on:click="getSingleResult($event)"
      >
        <div class="autocomplete-result">{{ results["1. symbol"] }}</div>
        <div class="autocomplete-result">{{ results["2. name"] }}</div>
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
    };
  },
  methods: {
    onChange() {
      if (this.searchValue.length >= 2) {
        this.apiCall();
      }
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
          console.log(res.data.bestMatches);
          this.hidden = false;
          this.searchResults = res.data.bestMatches;
          this.$store.commit("setResults", res.data.bestMatches);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getResults(param) {
      this.apiCall();
      console.log(param);
    },
    getSingleResult(e) {
      let targetId = e.currentTarget.id;
      alert("hello this works" + targetId);
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
