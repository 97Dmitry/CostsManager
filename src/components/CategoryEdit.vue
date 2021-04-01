<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form class="form" v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current" id="select">
            <option v-for="c of categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
        </div>
        <label for="select">Выберите категорию</label>

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
          >
            {{ printError(error.$validator, error.$params) }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required, minLength: minLength(3) },
    limit: { required, minLength: minLength(3) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена");
        this.$emit("updated", categoryData);
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
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
