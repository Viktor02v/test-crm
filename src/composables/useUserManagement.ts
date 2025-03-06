import { ref } from 'vue';
import { mockApiService, type User } from '@/services/mockApiService';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/authStore';

export function useUserManagement() {
  const toast = useToast();
  const users = ref<User[]>([]);
  const selectedUsers = ref<number[]>([]);
  const authStore = useAuthStore();
  const showGreeting = ref(true);
  const username = authStore.user?.username || 'Guest';
  const isAdmin = authStore.user?.role === 'admin';
  const isManager = authStore.user?.role === 'manager';

  const showViewUserDialog = ref(false);
  const userToView = ref<User | null>(null);

  const showEditUserDialog = ref(false);
  const userToEdit = ref<User | null>(null);

  const showDeleteDialog = ref(false);
  const deleteConfirmationText = ref('');

  const showAddUserDialog = ref(false);
  const newUser = ref({
    username: '',
    login: '',
    password: '',
    token: 'erwb23g', // Default token
    role: '',
    active: true,
  });

  const roles = ref(['admin', 'manager', 'user']);

  const fetchUsers = async () => {
    try {
      const response = await mockApiService.getUsers();
      if (response.data) {
        users.value = response.data.map((user: User) => ({
          ...user,
          status: user.active ? 'Active' : `Last Active: ${user.lastActiveDate || user.regdate}`,
        }));
      } else {
        throw new Error('No data returned from the server');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch users.',
        life: 3000,
      });
    }
  };

const toggleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  selectedUsers.value = checked ? users.value.map((user) => user.id) : []
}

const deleteSelectedUsers = async () => {
  if (deleteConfirmationText.value !== 'DELETE') {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please type DELETE to confirm.',
      life: 3000,
    });
    return;
  }

  console.log('Selected Users to Delete:', selectedUsers.value);

  try {
    await Promise.all(selectedUsers.value.map((id) => mockApiService.deleteUser(id)));

    users.value = users.value.filter((user) => !selectedUsers.value.includes(user.id));
    selectedUsers.value = [];

    // Update localStorage
    localStorage.setItem('users', JSON.stringify(users.value));

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Selected users deleted successfully.',
      life: 3000,
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete selected users.',
      life: 3000,
    });
  } finally {
    showDeleteDialog.value = false;
    deleteConfirmationText.value = '';
  }
};

  const generateToken = () => {
  const token = Math.random().toString(36).substring(2, 10).toUpperCase();
  newUser.value.token = token; // Update the newUser token
};

const addUser = async () => {
  if (
    !newUser.value.username ||
    !newUser.value.login ||
    !newUser.value.password ||
    !newUser.value.role
  ) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'All fields are required.',
      life: 3000,
    });
    return;
  }

  const userToAdd = {
    ...newUser.value,
    regdate: new Date().toISOString().split('T')[0],
    status: 'Active',
  };

  try {
    const response = await mockApiService.addUser(userToAdd);

    if (!response || !response.data) {
      throw new Error('Invalid response from server');
    }

    users.value.push(response.data);

    localStorage.setItem('users', JSON.stringify(users.value));

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User added successfully.',
      life: 3000,
    });

    showAddUserDialog.value = false;
    newUser.value = {
      username: '',
      login: '',
      password: '',
      token: 'erwb23g',
      role: '',
      active: true,
    };
  } catch (error) {
    console.error('Error adding user:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to add user. Please try again later.',
      life: 3000,
    });
  }
};

const editUser = (userId: number) => {
  const user = users.value.find((user) => user.id === userId)
  if (user) {
    userToEdit.value = { ...user }
    showEditUserDialog.value = true
  }
}

const saveUserChanges = async () => {
  if (!userToEdit.value) return;

  try {
    // Update lastActiveDate if the user is being deactivated
    if (userToEdit.value.active === false) {
      userToEdit.value.lastActiveDate = new Date().toISOString().split('T')[0];
    }

    const response = await mockApiService.updateUser(userToEdit.value);

    if (!response || !response.data) {
      throw new Error('Invalid response from server');
    }

    // Update the list
    const index = users.value.findIndex((u) => u.id === userToEdit.value!.id);
    if (index !== -1) {
      users.value[index] = response.data;
    }

    localStorage.setItem('users', JSON.stringify(users.value));

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User updated successfully.',
      life: 3000,
    });

    showEditUserDialog.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update user. Please try again later.',
      life: 3000,
    });
  }
};

const viewUser = (userId: number) => {
  const user = users.value.find((user) => user.id === userId);
  if (user) {
    userToView.value = { ...user }; // Clone the user object
    showViewUserDialog.value = true;
  }
};

return {
  users,
  roles,
  showAddUserDialog,
  showDeleteDialog,
  showEditUserDialog,
  selectedUsers,
  showGreeting,
  username,
  isAdmin,
  isManager,
  deleteConfirmationText,
  newUser,
  userToView,
  showViewUserDialog,
  userToEdit,
  fetchUsers,
  toggleSelectAll,
  deleteSelectedUsers,
  viewUser,
  saveUserChanges,
  editUser,
  addUser,
  generateToken,
  };
}

