<template>
  <ul class="sidenav app-sidenav" :class="{open: !value}">
    <router-link 
      v-for="l in links" 
      :key="l.name"
      :to="{ name: l.name }"
      :exact="l.exact" 
      custom 
      v-slot="{ navigate, isActive }">
      <li :class="{ active: isActive }">
        <a @click="navigate" class="waves-effect waves-orange pointer">{{ l.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      links: [
        { name: 'home', title: 'Счет', exact: true },
        { name: 'history', title: 'Итория' },
        { name: 'planning', title: 'Планирование' },
        { name: 'records', title: 'Новая запись' },
        { name: 'categories', title: 'Категории' }
      ]
    }
  }
}
</script>

<style>

</style>