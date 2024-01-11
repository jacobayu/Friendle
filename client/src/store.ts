// import { writable } from 'svelte/store'
// import { browser } from '$app/environment'

// let persistedUser = browser && localStorage.getItem('user')
// console.log(JSON.stringify(persistedUser))
// export let user = writable(persistedUser ? JSON.parse(persistedUser) : '')

// if (browser) {
//     user.subscribe(u => localStorage.user = u)
// }

import { writable } from 'svelte/store';

function createPersistentStore(key: string, startValue: any) {
  const { subscribe, set, update } = writable(startValue);

  return {
    subscribe,
    set,
    update,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe((current) => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const userStore = createPersistentStore('userInfo', {});