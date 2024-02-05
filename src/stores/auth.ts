import { writable } from 'svelte/store'

//types
interface Auth {
  token: string
}
interface User {
  username: string
  firstName: string
  lastName: string
}

//initial value
const initialStateAuth = {
  token: '',
}
const initialStateUser = {
  username: '',
  firstName: '',
  lastName: '',
}

// create store
export const authStore = writable<Auth>(initialStateAuth)
export const userStore = writable<User>(initialStateUser)
