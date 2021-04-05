<template>
  <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
    <router-link
      :to="link.toGo"
      :exact="link.exact"
      v-for="link in Links"
      :key="link.toGo"
      v-slot="{ href, navigate, isActive }"
      custom
    >
      <li :class="{ active: isActive }">
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["modelValue"],
  data() {
    return {
      Links: [
        { title: this.$localizeFilter("ScoreTitle"), toGo: "/", exact: true },
        {
          title: this.$localizeFilter("HistoryTitle"),
          toGo: "history",
          exact: true,
        },
        {
          title: this.$localizeFilter("PlanningTitle"),
          toGo: "planning",
          exact: true,
        },
        {
          title: this.$localizeFilter("RecordTitle"),
          toGo: "record",
          exact: true,
        },
        {
          title: this.$localizeFilter("CategoriesTitle"),
          toGo: "categories",
          exact: true,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
