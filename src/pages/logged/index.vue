<script setup lang="ts">
import { onMounted } from 'vue'
import Button from 'primevue/button'
import { useUserManagement } from '@/composables/useUserManagement'
import { useSorting } from '@/composables/useSorting'
import UserTable from '@/components/Layout/UserTable.vue'
import AddUserDialog from '@/components/Layout/AddUserDialog.vue'
import DeleteConfirmationDialog from '@/components/Layout/DeleteConfirmationDialog.vue'
import EditUserDialog from '@/components/Layout/EditUserDialog.vue'
import ViewUserDialog from '@/components/Layout/ViewUserDialog.vue'

const {
  users,
  username,
  userToEdit,
  userToView,
  saveUserChanges,
  addUser,
  showViewUserDialog,
  showEditUserDialog,
  newUser,
  roles,
  showAddUserDialog,
  showDeleteDialog,
  selectedUsers,
  showGreeting,
  isAdmin,
  isManager,
  fetchUsers,
  deleteConfirmationText,
  deleteSelectedUsers,
  viewUser,
  editUser,
} = useUserManagement()

const { sortById, sortByLogin, sortByRegDate, sortByActive, sortByName, sortByToken } = useSorting()

onMounted(async () => {
  await fetchUsers()
  setTimeout(() => {
    showGreeting.value = false
  }, 5000)
})

console.log(users.value)
</script>

<template>
  <div class="w-full h-full px-[145px] flex flex-col items-center justify-center p-4">
    <!-- Action Buttons -->
    <div class="flex w-full items-center justify-between mb-4">
      <div
        v-if="isAdmin"
        class="py-2 px-5 flex items-center space-x-3 bg-blue-600 text-white rounded"
      >
        <i class="pi pi-plus"></i>
        <Button label="Add User" class="p-button-success mr-2" @click="showAddUserDialog = true" />
      </div>
      <div
        v-if="isAdmin || isManager"
        class="flex items-center space-x-3 py-2 px-5 bg-red-600 text-white rounded"
      >
        <i class="pi pi-trash"></i>
        <Button
          label="Delete User"
          class="p-button-danger"
          :disabled="selectedUsers.length === 0"
          @click="showDeleteDialog = true"
        />
      </div>
    </div>

    <UserTable
      :users="users"
      :selectedUsers="selectedUsers"
      @update:selectedUsers="(value) => (selectedUsers = value)"
      :isAdmin="isAdmin"
      :isManager="isManager"
      :sortById="sortById"
      :sortByLogin="sortByLogin"
      :sortByRegDate="sortByRegDate"
      :sortByName="sortByName"
      :sortByActive="sortByActive"
      :sortByToken="sortByToken"
      @viewUser="viewUser"
      @editUser="editUser"
    />

    <AddUserDialog
      v-model:showAddUserDialog="showAddUserDialog"
      :newUser="newUser"
      :roles="roles"
      @addUser="addUser"
    />

    <DeleteConfirmationDialog
      v-model:showDeleteDialog="showDeleteDialog"
      v-model:deleteConfirmationText="deleteConfirmationText"
      @confirmDelete="deleteSelectedUsers"
    />

    <EditUserDialog
      v-model:showEditUserDialog="showEditUserDialog"
      :userToEdit="userToEdit"
      :roles="roles"
      :isAdmin="isAdmin"
      @saveUserChanges="saveUserChanges"
    />

    <ViewUserDialog
      v-model:showViewUserDialog="showViewUserDialog"
      :userToView="userToView"
      :isAdmin="isAdmin"
    />

    <!-- Welcome Greeting -->
    <div
      v-if="showGreeting"
      class="absolute bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg flex items-center justify-between"
    >
      <span>Welcome, {{ username }}! 🎉</span>
      <Button
        icon="pi pi-times"
        class="ml-3 p-1 bg-transparent border-none text-white cursor-pointer"
        @click="showGreeting = false"
      />
    </div>
  </div>
</template>
