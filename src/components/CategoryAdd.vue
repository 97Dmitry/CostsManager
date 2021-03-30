<template>
  <div class="col s12 m6" s>
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form v-on:submit.prevent="submitHandler()">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.title.$errors"
          >
            {{ printError(error.$validator, error.$params) }}
            >
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.limit.$errors"
          >
            {{ printError(error.$validator, error.$params) }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  name: "CategoryAdd",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      limit: 1,
    };
  },
  validations() {
    return {
      title: { required, minLength: minLength(3) },
      limit: { required, minLength: minLength(3) },
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      const formData = {
        title: this.title,
        limit: this.limit,
      };

      try {
        const category = await this.$store.dispatch("categoryAdd", formData);
        this.title = "";
        this.limit = 1;
        this.v$.$reset();
        this.$message("Категория создана");
        this.$emit("created", category);
      } catch (e) {}
    },

    printError($name, $param) {
      if ($name === "required") {
        return "Поле не должно быть пустым";
      } else if ($name === "minLength") {
        return "Минимальная длина должна быть " + $param.min + " символов";
      }
    },
  },
};
</script>

<style scoped></style>
