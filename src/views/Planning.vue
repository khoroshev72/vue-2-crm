<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{getInfo.balance | currency}}</h4>
    </div>

    <section>
      <loader v-if="loader" />

      <p v-else-if="categories.length === 0">
        Категорий пока нет.
        <router-link :to="{name: 'categories'}">Добавить новую категорию</router-link>
      </p>

      <div v-else v-for="c in categories" :key="c.id">
        <p>
          <strong>{{c.name}}:</strong>
          {{c.spent | currency}} из {{c.limit | currency}}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="c.percentColor"
            :style="{width: c.percentProgress + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currency from "../filters/currency.filter";
  export default {
    name: "planning",
    data() {
      return {
        loader: true,
        categories: []
      }
    },
    computed: {
      ...mapGetters('info', ['getInfo'])
    },
    async mounted() {
      this.loader = true
      const categories = await this.$store.dispatch('category/fetchCategories')
      const records = await this.$store.dispatch('record/fetchRecords')
      this.categories = categories.map(cat => {
      const spent = records.filter(r => r.categoryId === cat.id)
                              .filter(r => r.type === 'outcome')
                              .reduce((total, r) => {
                                return total += +r.amount
                              }, 0)

      const percent = (spent * 100) / cat.limit
      const percentProgress = percent > 100 ? 100 : percent
      const percentColor = percent < 60
                            ? 'green'
                            : percent > 100
                              ? 'red' : 'yellow'

      const tooltipVal = cat.limit - spent
      const tooltip = `${tooltipVal >= 0 ? 'Осталось' : 'Превышен на'} ${currency(Math.abs(tooltipVal))}`

        return {
          ...cat,
          spent,
          percentProgress,
          percentColor,
          tooltip
        }
      })

      this.loader = false
    }
  }
</script>

<style scoped>

</style>