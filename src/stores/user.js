import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', () => {
  const userLoggedIn = ref(false)

  async function register(values) {
    // firebase authenticate service
    const userCredential = await auth.createUserWithEmailAndPassword(values.email, values.password)

    // firebase firestore service
    await usersCollection.doc(userCredential.user.uid).set({
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country
    })

    await auth.currentUser.updateProfile({
      displayName: values.name
    })

    userLoggedIn.value = true
  }

  async function authenticate(values) {
    await auth.signInWithEmailAndPassword(values.email, values.password)

    userLoggedIn.value = true
  }

  async function signOut() {
    await auth.signOut()

    userLoggedIn.value = false
  }

  return { userLoggedIn, register, authenticate, signOut }
})
