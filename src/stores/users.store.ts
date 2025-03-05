import { defineStore } from 'pinia';

interface User {
  id: number;
  login: string;
  username: string;
  active: boolean;
  token: string;
  regdate: string;
  status: string;
  role: string;
  password: number;
}

interface UserState {
  users: User[];
}

interface UserActions {
  addUser: (user: User) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

export const useUserStore = defineStore<'users', UserState,{},  UserActions>('users', {
  state: (): UserState => ({
    users: [],
  }),
  actions: {
    addUser(user: User) {
      this.users.push(user);
      this.saveToLocalStorage();
      console.log('User added:', user);
    },
    saveToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
      console.log('Saved to localStorage:', this.users); // Debugging
    },
    loadFromLocalStorage() {
      const users = localStorage.getItem('users');
      if (users) {
        this.users = JSON.parse(users);
        console.log('Loaded from localStorage:', this.users); // Debugging
      }
    },
  },
  // Load users from localStorage when the store is initialized
  hydrate() {
    this.loadFromLocalStorage();
  },
});
