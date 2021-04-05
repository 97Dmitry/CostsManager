<template>
  <div class="col s12 m4" style="margin-right: 60px; padding: 0">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span
            v-for="(error, index) of v$.title.$errors"
            class="helper-text invalid"
            :key="index"
          >
            {{ printError(error.$validator, error.$params) }}
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
            v-for="(error, index) of v$.limit.$errors"
            class="helper-text invalid"
            :key="index"
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
import { minLength, required } from "@vuelidate/validators";

export default {
  name: "CategoryCreate",
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    title: "",
    limit: 100,
  }),
  validations: {
    title: { required, minLength: minLength(3) },
    limit: { required, minLength: minLength(3) },
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

      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        this.title = "";
        this.limit = 100;
        this.v$.$reset();
        this.$message("Категория была создана");
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
