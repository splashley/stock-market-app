<template>
  <div class="returned-results">
    <section>
      </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Results",
  computed: {
    ...mapGetters(["results", "error"]),
  },
};
</script>

<style lang="css" scoped>
.returned-results {
  position: relative;
  z-index: -1;
}
</style>
