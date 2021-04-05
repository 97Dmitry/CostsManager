<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar v-on:clickDown="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" :key="locale" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: "MainLayout",
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    // locale() {
    //   console.log("local")
    // },
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что то пошло не так :(");
    },
  },
};
</script>

<style scoped></style>
