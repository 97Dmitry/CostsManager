<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line" >
        <span>
          На вашем счету {{ bill }} рублей
        </span>
        </p>
        <p class="currency-line"
        v-for="currency in currencies" :key="currency"
        >
          <span>
            Ваш счет в {{ getCourse(currency) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
  props: ["rates"],
  data() {
    return {
      currencies: [
        'USD', 'EUR'
      ],
    }
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  },
  methods: {
    getCourse(currency) {
      return this.rates[currency].Name + ' = ' + Math.floor(this.bill / this.rates[currency].Value * 100) / 100
    }
  }
}
</script>

<style scoped>

</style>