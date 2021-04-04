<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавьте запись</router-link>
    </p>
    <section v-else>
      <HistoryList v-model:records="records" />
    </section>
  </div>
</template>

<script>
import HistoryList from "@/components/HistoryList";

export default {
  name: "History",
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  components: {
    HistoryList,
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.catId).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });
    console.log(this.records.length);
    this.loading = false;
  },
};
</script>

<style scoped></style>
