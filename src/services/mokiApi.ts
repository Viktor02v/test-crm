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

const loadUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  // If no users are found in localStorage, initialize with a default admin user
  if (!storedUsers) {
    const defaultAdmin: User = {
      id: 1,
      login: 'admin',
      username: 'Admin',
      active: true,
      token: 'default_admin_token',
      regdate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      status: 'Active',
      role: 'admin',
      password: 'admin123', // Default password (you should hash this in a real application)
    };

    // Save the default admin to localStorage
    localStorage.setItem('users', JSON.stringify([defaultAdmin]));

    // Return the default admin as the only user
    return [defaultAdmin];
  }

  // If users exist in localStorage, parse and return them
  return JSON.parse(storedUsers);
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
    await delay(1000);
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      throw { status: 404, message: 'User not found' };
    }

    // Update lastActiveDate if the user is being deactivated
    if (updatedUser.active === false && users[index].active === true) {
      updatedUser.lastActiveDate = new Date().toISOString().split('T')[0];
    }

    users[index] = updatedUser;
    saveUsers(users);
    return { data: updatedUser, status: 200 };
  }
};
