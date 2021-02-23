<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>

      <loader v-if="loader" />

      <div class="row" v-else >
      
        <category-create @created="newCategory"></category-create>

        <category-update
        v-if="categories.length !== 0"
        :categories="categories" 
        @updated="updateCategory"
        :key="categories.length + updated"></category-update>
        <p v-else >Категорий пока нет</p>

      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '../components/categories/CategoryCreate.vue'
  import CategoryUpdate from '../components/categories/CategoryUpdate.vue'

  export default {
    name: "categories",
    data() {
      return {
        loader: true,
        categories: [],
        updated: 0
      }
    },
    async mounted() {
      try {
        this.loader = true
        this.categories = await this.$store.dispatch('category/fetchCategories')
        this.loader = false
      } catch (e) {}
    },
    methods: {
      newCategory(category) {
        this.categories.push(category)
      },
      updateCategory(category) {
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[idx] = category
        this.updated++
      }
    },
    components: { CategoryCreate, CategoryUpdate }
  }
</script>

<style scoped>

</style>