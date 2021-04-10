<template>
  <ul :class="['sidenav app-sidenav', { open: !value }]">
    <router-link 
      v-for="l in links" 
      :key="l.url"
      custom
      :to="l.url" 
      :exact="l.exact"
      v-slot="{ navigate, isActive }">
      <li :class="{ active: isActive }">
        <a 
          href="#" 
          @click="navigate" 
          class="waves-effect waves-orange pointer">
        {{l.title}}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      {'title': 'Счет', url: '/', exact: true},
      {'title': 'История', url: '/history'},
      {'title': 'Планирование', url: '/planning'},
      {'title': 'Новая запись', url: '/records'},
      {'title': 'Категории', url: '/categories'},
    ]
  })
}
</script>

<style>

</style>