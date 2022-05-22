import { defineStore } from 'pinia'
import { Store } from 'tauri-plugin-store-api';

export const useTauriStore = defineStore('tauriStore', {
  state: () => {
    return { store: new Store('.settings.dat') }
  },

})
