<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')" >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a 
            class="dropdown-trigger black-text" 
            href="#" 
            data-target="dropdown"
            ref="dropdown">
            {{getInfo.name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link class="black-text" :to="{ name: 'profile' }">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  emits: ['toggleSidebar'],
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    }
  },
  computed: {
    ...mapGetters('info', ['getInfo']),
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    M.Dropdown.init(this.$refs.dropdown, {})
    this.dropdown = M.Dropdown.getInstance(this.$refs.dropdown)
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    ...mapMutations('info', ['clearInfo']),
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.clearInfo()
        this.$router.push('/login?m=logout')
      } catch (e) {}
    }
  }
}
</script>

<style>

</style>  