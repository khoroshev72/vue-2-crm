export default {
  install(Vue, options) {
    Vue.prototype.$message = function(text) {
      return M.toast({ html: text })
    }

    Vue.prototype.$error = function(text) {
      return M.toast({ html: `[Ошибка]: ${text}`})
    }
  }
}