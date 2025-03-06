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
  roles,
  newUser,
  isAdmin,
  username,
  isManager,
  userToEdit,
  userToView,
  selectedUsers,
  showGreeting,
  showViewUserDialog,
  showEditUserDialog,
  showAddUserDialog,
  showDeleteDialog,
  deleteConfirmationText,
  addUser,
  viewUser,
  editUser,
  fetchUsers,
  saveUserChanges,
  deleteSelectedUsers,
} = useUserManagement()

const {
  sortById,
  sortByName,
  sortByLogin,
  sortByToken,
  sortByActive,
  sortByStatus,
  sortByRegDate,
} = useSorting()

onMounted(async () => {
  await fetchUsers()
  setTimeout(() => {
    showGreeting.value = false
  }, 5000)
})

console.log(users.value)
</script>

=
<template>
  <div class="w-full relative h-full flex flex-col items-center justify-center">
    <!-- Action Buttons -->
    <div>
      <div class="w-full">
        <div class="flex items-center justify-between">
          <div
            v-if="isAdmin"
            class="py-2 px-5 flex items-center space-x-3 bg-blue-600 text-white rounded"
          >
            <i class="pi pi-plus" style="font-size: 20px" />
            <Button label="Add User" class="text-[20px]" @click="showAddUserDialog = true" />
          </div>
          <div
            v-if="isAdmin || isManager"
            class="flex items-center space-x-3 py-2 px-5 bg-red-600 text-white rounded"
          >
            <i class="pi pi-trash" style="font-size: 20px" />
            <Button
              label="Delete User"
              class="text-[20px]"
              :disabled="selectedUsers.length === 0"
              @click="showDeleteDialog = true"
            />
          </div>
        </div>
      </div>

      <!-- User Table -->
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
        :sortByStatus="sortByStatus"
        @viewUser="viewUser"
        @editUser="editUser"
      />
    </div>

    <!-- Dialogs -->
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
    <div v-if="showGreeting" class="w-full px-10 flex item-end justify-end">
      <div
        class="absolute w-[348px] bottom-[48px] bg-[#F0FDF4F2] border border-[#BBF7D0] text-white py-[10.5px] px-[5px] rounded shadow-lg"
      >
        <div class="w-full flex items-start justify-between">
          <div class="flex items-start space-x-[7px]">
            <i class="pi pi-check text-[#16A34A] pt-1"></i>
            <div class="flex flex-col text-14px">
              <span class="text-[#16A34A]">Success</span>
              <span class="text-black">Hello {{ username }}!</span>
            </div>
          </div>
          <div>
            <Button
              icon="pi pi-times"
              class="bg-transparent border-none text-white cursor-pointer text-[#16A34A]"
              @click="showGreeting = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
