<template>
    <div>
        <div class="app-main-layout">
        
            <navbar @click="isOpen = !isOpen" />

            <sidebar v-model="isOpen" />

            <main :class="['app-content', {full: isOpen}]">
                <div class="app-page">
                    <slot/>
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link to="/records" class="btn-floating btn-large blue">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/app/Navbar.vue'
import Sidebar from '../components/app/Sidebar.vue'
  export default {
  components: { Navbar, Sidebar },
    data: () => ({
        isOpen: false
    })
   
}
</script>

<style scoped>

</style>