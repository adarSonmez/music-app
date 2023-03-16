<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      validationSchema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:6|max:100'
      },
      log_on_submit: false,
      log_show_alert: false,
      log_alert_variant: 'bg-blue-500',
      log_alert_msg: 'Please wait, we are logging you in...'
    }
  },
  methods: {
    login(values) {
      this.log_on_submit = true
      this.log_show_alert = true
      this.log_alert_variant = 'bg-blue-500'
      this.log_alert_msg = 'Please wait, we are logging you in...'

      // request
      this.log_alert_variant = 'bg-green-500'
      this.log_alert_msg = 'Login successful!'
      console.log(values)
    }
  }
}
</script>
<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_msg }}
  </div>
  <vee-form :validation-schema="validationSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        as="input"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <vee-error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        as="input"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <vee-error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="log_on_submit"
    >
      Submit
    </button>
  </vee-form>
</template>
