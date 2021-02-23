<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input 
          id="name" 
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}">
          <label for="name">Название</label>
          <span 
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required">
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
          <label for="limit">Лимит</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue">
            Минимальная величина {{this.$v.limit.$params.minValue.min}}
            </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators'

  export default {
    emits: ['created'],
    data() {
      return {
        name: '',
        limit: 100
      }
    },
    validations: {
      name: {required},
      limit: {minValue: minValue(100)}
    },
    mounted() {
      M.updateTextFields()
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          const category = await this.$store.dispatch('category/createCategory', {
            name: this.name,
            limit: this.limit
          })
          this.$message('Категория добавлена')
          this.$emit('created', category)
        } catch (e) {}

      }
    }
  }
</script>

<style>

</style>