<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loader" />

    <p v-else-if="categories.length === 0">
      Категорий пока нет.
      <router-link :to="{name: 'categories'}">Добаить новую категорию</router-link>
    </p>

    <form class="form" @submit.prevent="submitHandler" v-else >

      <div class="input-field" >
        <select
          ref="select"
          v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id">
            {{c.name}}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.amount="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid">
          Минимальная величина {{this.$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">
          Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators'
  import {mapGetters} from 'vuex'

  export default {
    name: "records",
    data() {
      return {
        loader: true,
        categories: [],
        select: null,
        category: null,
        type: 'outcome',
        amount: 100,
        description: ''
      }
    },
    validations: {
      description: {required},
      amount: {minValue: minValue(100)}
    },
    computed: {
      ...mapGetters('info', ['getInfo']),
      canCreate() {
        if (this.type === 'income') {
          return true
        }
        return this.getInfo.balance >= this.amount
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        if (!this.canCreate) {
          this.$message(`На счёте не хватает ${this.amount - this.getInfo.balance}`)
          return
        }

        try {
          await this.$store.dispatch('record/createRecord', {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          })

          const balance = this.type === 'income'
                          ? +this.getInfo.balance + +this.amount
                          : +this.getInfo.balance - +this.amount

          await this.$store.dispatch('info/updateInfo', {balance})

        } catch (e) { }

        this.$message('Добавлена новая запись')
        this.amount = 100
        this.description = ''
        this.$v.$reset()
      }
    },
    async mounted() {
      this.loader = true
      this.categories = await this.$store.dispatch('category/fetchCategories')
      this.loader = false

      this.category = this.categories[0].id


      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
      }, 0)
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>

<style scoped>

</style>