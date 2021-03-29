<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table v-for="currency in currencies" :key="currency">
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>{{ rates[currency].Name }}</td>
            <td>{{ getCourse(currency) }}</td>
            <td>{{ $parseDate(date) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: ["date", "rates"],
  data() {
    return {
      currencies: [
        'USD', 'EUR'
      ],
    };
  },
  methods: {
    getCourse(currency) {
      return Math.floor(this.rates[currency].Value * 100) / 100
    }
  }
}
</script>

<style scoped>

</style>