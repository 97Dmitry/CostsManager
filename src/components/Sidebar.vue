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
        { title: "Счет", toGo: "/", exact: true },
        { title: "История", toGo: "/history" },
        { title: "Планирование", toGo: "/planning" },
        { title: "Новая запись", toGo: "/record" },
        { title: "Категории", toGo: "/categories" },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
