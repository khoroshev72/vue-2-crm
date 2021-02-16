<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
  import MainLayout from "./layouts/MainLayout";
  import AuthLayout from "./layouts/AuthLayout";
  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'auth') + '-layout'
      }
    },
    components: {MainLayout, AuthLayout}
  }
</script>

<style>
  @import "~materialize-css/dist/css/materialize.css";
  @import "./assets/index.css";
</style>
