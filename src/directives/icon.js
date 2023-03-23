export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`

    // v-icon:full
    if (binding.arg === 'full') iconClass = binding.value

    // v-icon.right.green
    if (binding.modifiers.right) iconClass += ' float-right'
    if (binding.modifiers.green) iconClass += ' text-green-400'

    el.innerHTML = `<i class="${iconClass}"></i>`
  }
}
