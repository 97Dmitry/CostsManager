<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryAdd @created="addNewCategory" />

        <CategoryUpdate />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryAdd from "@/components/CategoryAdd";
import CategoryUpdate from "@/components/CategoryUpdate";

export default {
  name: "Categories",
  components: {
    CategoryAdd,
    CategoryUpdate,
  },
  date() {
    return {
      categories: [],
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
  },
};
</script>

<style scoped></style>
