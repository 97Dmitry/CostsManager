<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) in records" :key="rec.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ rec.amount }}</td>
        <td>{{ $parseDate(rec.date) }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="rec.typeClass">{{
            rec.typeText
          }}</span>
        </td>
        <td>
          <router-link
            class="btn-small btn"
            :to="{ path: '/detail/' + rec.id }"
            v-tooltip="'Подробно'"
          >
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "historyList",
  props: ["records"],
};
</script>

<style scoped></style>
