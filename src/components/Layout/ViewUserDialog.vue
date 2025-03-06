<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import ToggleSwitch from 'primevue/togglebutton'

// Props
const props = defineProps({
  showViewUserDialog: { type: Boolean, required: true },
  userToView: { type: Object, required: true },
  isAdmin: { type: Boolean, required: true },
})

const emit = defineEmits(['update:showViewUserDialog'])

const closeDialog = () => {
  emit('update:showViewUserDialog', false)
}
</script>

<template>
  <Dialog
    :visible="showViewUserDialog"
    @update:visible="(value) => emit('update:showViewUserDialog', value)"
    modal
    header="View User"
    :style="{ width: '400px' }"
  >
    <div class="flex flex-col space-y-4" v-if="userToView">
      <!-- Username Field -->
      <label for="view-username">Username</label>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          id="view-username"
          v-model="userToView.username"
          disabled
          class="w-full h-10 mt-2 pl-2"
        />
      </div>

      <!-- Login Field -->
      <div class="">
        <label for="view-login">Login</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-id-card"></i>
          </span>
          <InputText
            id="view-login"
            v-model="userToView.login"
            disabled
            class="w-full h-10 mt-2 pl-2"
          />
        </div>
      </div>

      <!-- Token Field (Admin Only) -->
      <div v-if="isAdmin">
        <label for="view-token">Token</label>
        <InputText
          id="view-token"
          v-model="userToView.token"
          disabled
          class="w-full h-10 mt-2 pl-2"
        />
      </div>

      <!-- Role Field -->
      <div>
        <label for="view-role">Role</label>
        <InputText
          id="view-role"
          v-model="userToView.role"
          disabled
          class="w-full h-10 mt-2 pl-2"
        />
      </div>

      <!-- Active User Checkbox -->
      <div class="flex items-center justify-between">
        <label for="add-active" class="ml-2">Active User</label>
        <ToggleSwitch v-model="userToView.active" inputId="add-active" disabled :binary="true" />
      </div>
    </div>

    <!-- Close Button -->
    <div class="flex items-center mt-5 justify-end">
      <Button
        label="Close"
        class="p-button-text py-2 px-5 text-blue-600 border border-blue-400 bg-white"
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
