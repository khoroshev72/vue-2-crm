export default {
  bind(el, options) {
    M.Tooltip.init(el, {html: options.value})
  },
  unbind(el) {
    const instance = M.Tooltip.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  }
}