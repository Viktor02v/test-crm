<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useUserManagement } from '@/composables/useUserManagement'
import ToggleSwitch from 'primevue/togglebutton'

const props = defineProps({
  showEditUserDialog: { type: Boolean, required: true },
  userToEdit: { type: Object, required: true },
  roles: { type: Array, required: true },
  isAdmin: { type: Boolean, required: true },
})

const emit = defineEmits(['update:showEditUserDialog', 'saveUserChanges'])

const { generateToken } = useUserManagement()

const closeDialog = () => {
  emit('update:showEditUserDialog', false)
}

const saveUserChanges = () => {
  emit('saveUserChanges')
}
</script>
<template>
  <Dialog
    :visible="showEditUserDialog"
    @update:visible="(value) => emit('update:showEditUserDialog', value)"
    modal
    header="Edit User"
    :style="{ width: '400px' }"
  >
    <div class="flex flex-col space-y-4" v-if="userToEdit">
      <!-- Username Field -->
      <div>
        <label for="edit-username" class="block text-sm font-medium mb-1">Username</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            id="edit-username"
            v-model="userToEdit.username"
            placeholder="Robert"
            class="w-full"
          />
        </div>
      </div>

      <!-- Login Field -->
      <div>
        <label for="edit-login" class="block text-sm font-medium mb-1">Login</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-sign-in"></i>
          </span>
          <InputText
            id="edit-login"
            v-model="userToEdit.login"
            placeholder="crmsystem"
            class="w-full"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="edit-password" class="block text-sm font-medium mb-1">Password</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <InputText
            id="edit-password"
            v-model="userToEdit.password"
            type="password"
            placeholder="********"
            class="w-full"
          />
        </div>
      </div>

      <!-- Token Field -->
      <div>
        <label for="edit-token" class="block text-sm font-medium mb-1">Generate Token</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <InputText
            id="edit-token"
            v-model="userToEdit.token"
            placeholder="erwb23g"
            class="w-full"
            disabled
          />
          <Button icon="pi pi-refresh" class="p-button-outlined" @click="generateToken" />
        </div>
      </div>

      <!-- Role Field -->
      <div>
        <label for="edit-role" class="block text-sm font-medium mb-1">User Role</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-users"></i>
          </span>
          <Dropdown
            id="edit-role"
            v-model="userToEdit.role"
            :options="roles"
            placeholder="Manager"
            class="w-full"
          />
        </div>
      </div>

      <!-- Active User Checkbox -->
      <div class="flex items-center justify-between">
        <label for="edit-active" class="ml-2">Active User</label>
        <ToggleSwitch v-model="userToEdit.active" inputId="edit-active" :binary="true" />
      </div>
    </div>

    <!-- Save and Close Buttons -->
    <div class="flex items-center mt-5 justify-between">
      <Button
        label="Save User"
        class="p-button-success py-2 px-10 bg-blue-600 text-white"
        @click="saveUserChanges"
      />
      <Button
        label="Close"
        class="p-button-text py-2 px-10 bg-gray-200 text-blue-500 border border-blue-500"
        @click="closeDialog"
      />
    </div>
  </Dialog>
</template>

<style scoped>
.p-inputgroup {
  margin-bottom: 1rem;
}
</style>
