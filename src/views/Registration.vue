<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler()">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
        >
          {{ printError(error.$validator, error.$params) }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{ invalid: v$.password.$error }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
        >
          {{ printError(error.$validator, error.$params) }}
        </small>
      </div>
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
      <p>
        <label>
          <input type="checkbox" v-on:click="agree = !agree" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  name: "Registration",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(4) },
      agree: { checked: (v) => v },
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch("registration", formData);
        this.$router.push({ name: "Home" });
      } catch (e) {}
    },

    printError($name, $param) {
      if ($name === "required") {
        return "Поле не должно быть пустым";
      } else if ($name === "email") {
        return "Введите корректный email";
      } else if ($name === "minLength") {
        return (
          "Минимальная длина должна быть " +
          $param.min +
          " символов, а сейчас: " +
          this.password.length
        );
      }
    },
  },
};
</script>

<style scoped></style>
