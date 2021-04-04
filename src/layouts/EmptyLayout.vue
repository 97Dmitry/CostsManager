<template>
  <div class="blue-grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "EmptyLayout",
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что то пошло не так :(");
    },
  },
};
</script>

<style scoped></style>
