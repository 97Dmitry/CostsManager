<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="" v-on:click.prevent="$emit('clickDown')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" v-on:click.prevent="logout()">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    }
  },
  created() {},
  methods: {
    logout() {
      this.$router.push({ path: "/login", query: { massage: "logout" } });
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
    }, 1000);
    this.dropdawn = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdawn && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style scoped></style>
