<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="categories.langth">
      Категорий пока нет.
      <router-link to="/categories">Добавьте категорию</router-link>
    </p>
    <form class="form" v-else v-on:submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" id="select" v-model="current">
          <option value="" disabled selected>Выберете категорию</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <label for="select">Выберите категорию</label>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" />
        <label for="amount">Сумма</label>
        <span
          v-for="(error, index) of v$.amount.$errors"
          class="helper-text invalid"
        >
          {{ printError(error.$validator, error.$params) }}
        </span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" />
        <label for="description">Описание</label>
        <span
          v-for="(error, index) of v$.description.$errors"
          class="helper-text invalid"
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Record",
  data() {
    return {
      categories: [],
      loading: true,
      type: "outcome",
      select: null,
      amount: 1,
      description: "",
      current: null,
    };
  },
  validations: {
    amount: { required, minLength: minLength(1) },
    description: { required, minLength: minLength(3) },
  },
  unmounted() {
    if (this.select && this.select.destroy()) {
      this.select.destroy();
    }
  },
  created() {
    this.loadCat();
  },
  computed: {
    ...mapGetters(["info"]),
    billCondition() {
      if (this.type === "outcome") {
        return this.info.bill >= this.amount;
      } else {
        return true;
      }
    },
  },
  methods: {
    async loadCat() {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;
      await setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      }, 0);
    },
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      try {
        if (this.billCondition) {
          const recordData = {
            catId: this.current,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          };
          await this.$store.dispatch("createRecord", recordData);
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.v$.$reset();
          this.amount = 1;
          this.description = "";
          this.$message("Запись успешно создана");
        } else {
          this.$error(
            `У вас недостаточно средств на счете для такого расхода. Баланс: ${this.info.bill} `
          );
        }
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
