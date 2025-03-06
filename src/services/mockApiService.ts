import axios from 'axios';
import { delay } from '@/utils/delay';

export interface User {
  id: number;
  login: string;
  username: string;
  active: boolean;
  token: string;
  regdate: string;
  status: string;
  role: string;
  password: string;
  lastActiveDate?: string;
}

const mockApi = axios.create();

const loadUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
    const defaultAdmin: User = {
      id: 1,
      login: 'admin',
      username: 'Admin',
      active: true,
      token: 'default_admin_token',
      regdate: new Date().toISOString().split('T')[0],
      status: 'Active',
      role: 'admin',
      password: 'admin123',
    };
    localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
  return JSON.parse(storedUsers);
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const generateUserId = () => {
  const users = loadUsers();
  return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
};

const generateToken = async (userId: number): Promise<string> => {
  await delay(500); // Simulate delay
  const randomString = Math.random().toString(36).substring(2, 10);
  return `token_${userId}_${randomString}`;
};

export const mockApiService = {
  async login(credentials: { login: string; password: string }) {
    await delay(1000); // Simulate network delay
    const users = loadUsers();
    const user = users.find(u => u.login === credentials.login && u.password === credentials.password);
    if (user) {
      return { data: user, status: 200 }; // Return data directly
    } else {
      throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
    }
  },

  async getUsers() {
    await delay(1000); // Simulate network delay
    const users = loadUsers();
    return { data: users, status: 200 };
  },

  async addUser(newUser: Omit<User, 'id'>) {
    await delay(1000); // Simulate delay
    const users = loadUsers();
    const userId = generateUserId();
    const token = await generateToken(userId);
    const user = { id: userId, token, ...newUser };
    users.push(user);
    saveUsers(users);
    return { data: user, status: 201 };
  },

  async deleteUser(id: number) {
    await delay(1000); // Simulate delay
    let users = loadUsers();
    users = users.filter(user => user.id !== id);
    saveUsers(users);
    return { status: 204 };
  },

  async updateUser(updatedUser: User) {
    await delay(1000);
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      throw { status: 404, message: 'User not found' };
    }

    if (updatedUser.active === false && users[index].active === true) {
      updatedUser.lastActiveDate = new Date().toISOString().split('T')[0];
    }

    users[index] = updatedUser;
    saveUsers(users);
    return { data: updatedUser, status: 200 }; 
  },
};
