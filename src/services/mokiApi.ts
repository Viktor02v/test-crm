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
}

const loadUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const generateUserId = () => {
  const users = loadUsers(); // Ensure latest list
  return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
};

const generateToken = async (userId: number): Promise<string> => {
  await delay(500); // Simulate delay
  const randomString = Math.random().toString(36).substring(2, 10);
  return `token_${userId}_${randomString}`;
};

export const mockApi = {
  async login(credentials: { login: string; password: string }) {
    await delay(1000);
    const users = loadUsers(); // Ensure latest users list
    const user = users.find(u => u.login === credentials.login && u.password === credentials.password);
    if (user) {
      return { data: user, status: 200 };
    } else {
      throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
    }
  },

  async getUsers() {
    await delay(1000); // Simulate network delay
    return { data: loadUsers(), status: 200 };
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
    await delay(1000); // Simulate delay
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      throw { response: { status: 404, data: { message: 'User not found' } } };
    }

    // Update the user
    users[index] = updatedUser;
    saveUsers(users);
    return { data: updatedUser, status: 200 };
  },
};
