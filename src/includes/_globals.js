// bad practice: import _ from 'lodash'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default {
  install(app) {
    const baseComponents = import.meta.globEager('../components/base/*.vue')

    Object.entries(baseComponents).forEach(([path, component]) => {
      const name = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )
      app.component(name, component.default || component)
    })
  }
}
