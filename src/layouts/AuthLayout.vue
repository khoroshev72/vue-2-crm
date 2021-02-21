<template>
    <div class="grey darken-1 empty-layout">
        <slot/>
    </div>
</template>

<script>
  import messages from '../utils/messages'

  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(val) {
        this.$error(messages[val.code] || 'Неизвестная ошибка')
      }
    }
  }
</script>

<style scoped>

</style>