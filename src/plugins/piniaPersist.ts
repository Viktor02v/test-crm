// plugins/piniaPersist.ts
import type { PiniaPluginContext } from 'pinia';

export function piniaPersist({ store }: PiniaPluginContext) {
  // Load from localStorage
  const storedState = localStorage.getItem(store.$id);
  if (storedState) {
    store.$patch(JSON.parse(storedState));
  }

  // Save to localStorage on changes
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
}
