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

  export default {
    data() {
        return {
            isOpen: false
        }
    },
    components: {Navbar, Sidebar}
  }
</script>

<style scoped>

</style>