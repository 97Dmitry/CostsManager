<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }} Р</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="categories.langth">
      Категорий пока нет.
      <router-link to="/categories">Добавьте категорию</router-link>
    </p>
    <section v-else>
      <div v-for="c of categories" :key="c.id">
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spend }} Р из {{ c.limit }} Р
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Planning",
  data() {
    return {
      categories: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map((category) => {
      const spend = records
        .filter((r) => r.catId === category.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = category.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на:" : "Осталось:"
      } ${Math.abs(tooltipValue)} Р`;
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
  methods: {},
};
</script>

<style scoped></style>
