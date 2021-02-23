<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">

        <div class="input-field">
          <select 
            v-model="current"
            ref="select">
            <option 
              v-for="c in categories" 
              :key="c.id"
              :value="c.id">{{c.name}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input id="name" type="text" v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}">
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">
            Минимальная величина {{this.$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['categories'],
  emits: ['updated'],
  data() {
    return {
      select: null,
      current: null,
      name: '',
      limit: 100
    }
  },
  validations: {
    name: {required},
    limit: {minValue: minValue(100)}
  },
  methods: {
    async submitHandler() {
    if (this.$v.$invalid) {
      this.$v.$touch()
      return
      }

      const category = {
        id: this.current,
        name: this.name,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('category/updateCategory', category)
        this.$emit('updated', category)
        this.$message('Категория обновлена')
      } catch (e) {}

    }
  },
  created() {
    const {id, name, limit} = this.categories[0]
    this.current = id
    this.name = name
    this.limit = limit
  },
  watch: {
    current(val) {
      const {id, name, limit} = this.categories.find(c => c.id === val)
      this.current = id
      this.name = name
      this.limit = limit
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style>

</style>