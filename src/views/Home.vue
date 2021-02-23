<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loader"/>

    <div class="row" v-else >
      <home-bill :rates="curr.rates"></home-bill>

      <home-currency :rates="curr.rates" :date="curr.date"></home-currency>
    </div>

  </div>
</template>

<script>
import HomeBill from '../components/home/HomeBill'
import HomeCurrency from '../components/home/HomeCurrency'

export default {
  name: 'home',
    data() {
      return {
        loader: true,
        curr: null
      }
    },
    async mounted() {
      this.loader = true
      this.curr = await this.$store.dispatch('info/fetchCurr')
      this.loader = false
  },
    methods: {
      async refresh() {
      this.loader = true
      this.curr = await this.$store.dispatch('info/fetchCurr')
      this.loader = false
    }
    },
  components: {HomeBill, HomeCurrency}
}
</script>
