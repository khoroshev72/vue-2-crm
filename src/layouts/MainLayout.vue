<template>
<div>
    <div class="app-main-layout">

        <navbar @toggleSidebar="isOpen=!isOpen" />

        <sidebar v-model="isOpen" />

        <main class="app-content" :class="{ full: isOpen }">
            <div class="app-page">
                <slot />
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" href="#" :to="{ name: 'records' }">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
	import Navbar from '@/components/Navbar.vue'
	import Sidebar from '@/components/Sidebar.vue'
  import messages from '../utils/messages'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
      error() {
        return this.$store.getters.error
      },
      ...mapGetters('info', ['getInfo'])
    },
    watch: {
      error(val) {
        this.$error(messages[val.code] || 'Неизвестная ошибка')
      }
    },
    methods: {
      ...mapActions('info', ['fetchInfo'])
    },
    async mounted() {
      if (!Object.keys(this.getInfo).length) {
        await this.fetchInfo()
      }
    },
    components: {Navbar, Sidebar}
  }
</script>

<style scoped>

</style>