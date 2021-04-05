<template>
  <div>
    <div class="page-title">
      <h3>{{ $localizeFilter("ProfileTitle") }}</h3>
    </div>

    <form class="form" v-on:submit.prevent="submitHandler()">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.name.$errors"
        >
          {{ printError(error.$validator, error.$params) }}
        </small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $localizeFilter("UpdateButton") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default {
  name: "Profile",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: null,
      isRuLocale: true,
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(4) },
    };
  },
  async mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        });
      } catch (e) {}
    },
    printError($name, $param) {
      if ($name === "required") {
        return "Поле не должно быть пустым";
      } else if ($name === "minLength") {
        return (
          "Минимальная длина должна быть " +
          $param.min +
          " символов, а сейчас: " +
          this.name.length
        );
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
