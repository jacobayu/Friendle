
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
    },
    clear: () => {
      set(startValue); // Reset the store to its initial value
      localStorage.removeItem(key); // Remove the item from localStorage
    }
  };
}

export const userStore = createPersistentStore('userInfo', {});