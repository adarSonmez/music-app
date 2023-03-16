import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  length,
  alpha_spaces,
  min_value,
  max_value,
  confirmed,
  not_one_of
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', Form)
    app.component('VeeField', Field)
    app.component('VeeErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('email', email)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('length', length)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('password_mismatch', confirmed)
    defineRule('country_excluded', not_one_of)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field} field is required`,
          email: `The ${ctx.field} field must be a valid email`,
          min: `The ${ctx.field} field is too short`,
          max: `The ${ctx.field} field is too long`,
          min_value: `The ${ctx.field} field is too small`,
          max_value: `The ${ctx.field} field is too large`,
          length: `The ${ctx.field} field must be exactly ${ctx.rule.length} characters`,
          alpha_spaces: `The ${ctx.field} field may only contain alphabetic characters as well as spaces`,
          password_mismatch: `The ${ctx.field} field does not match`,
          country_excluded: `Due to restrictions, we cannot accept customers from ${ctx.value}`,
          tos: `You must agree to the terms and conditions`
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The ${ctx.field} field is invalid`

        return message
      },
      validateOnInput: true,
      validateOnChange: false,
      validateOnBlur: true,
      validateOnModelUpdate: true
    })
  }
}
