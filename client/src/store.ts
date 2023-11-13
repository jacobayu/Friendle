import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let persistedUser = browser && localStorage.getItem('user')
console.log(JSON.stringify(persistedUser))
export let user = writable(persistedUser ? JSON.parse(persistedUser) : '')

if (browser) {
    user.subscribe(u => localStorage.user = u)
}

