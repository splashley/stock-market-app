<template>
  <div class="returned-results" v-if="results">
    <section>
      {{ results }}
      </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Results",
  computed: {
    ...mapGetters(["results"]),
  },
};
</script>

<style lang="css" scoped>
.returned-results {
  position: relative;
  z-index: -1;
}
</style>
