<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'

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
    :closable="false"
    :style="{ width: '400px' }"
  >
    <template #header>
      <div class="text-center w-full">
        <span class="text-xl font-semibold">View User</span>
      </div>
    </template>

    <div class="" v-if="userToView">
      <!-- Username Field -->
      <label for="view-username" class="text-sm font-medium">Username</label>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon bg-[#E2E8F0]">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          id="view-username"
          v-model="userToView.username"
          disabled
          class="p-input"
        />
      </div>

      <div class="">
        <label for="view-login" class="block text-sm font-medium mb-1">Login</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon bg-[#E2E8F0]">
            <i class="pi pi-id-card "></i>
          </span>
          <InputText
            id="view-login"
            v-model="userToView.login"
            disabled
            class="p-input"
          />
        </div>
      </div>

      <div v-if="isAdmin">
        <label for="view-token" class="block text-sm font-medium mb-1">Token</label>
        <InputText
          id="view-token"
          v-model="userToView.token"
          disabled
          class="p-input"
        />
      </div>

      <!-- Role Field -->
      <div class="mt-4">
        <label for="view-role" class="block text-sm font-medium mb-1">Role</label>
        <InputText
          id="view-role"
          v-model="userToView.role"
          disabled
          class="p-input"
        />
      </div>

      <!-- Active User Checkbox -->
      <div class="flex items-center justify-between mt-4">
        <label for="add-active" class="ml-2">Active User</label>
        <InputSwitch v-model="userToView.active" inputId="add-active" disabled :binary="true" />
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

.p-inputgroup-addon{
  border: 1px solid #CBD5E1;
  border-right: 0;
}

.p-input{
  width: 100%;
  height: 39px;
  border: 1px solid #CBD5E1;
  border-left: 0;
  padding-left: 0.5rem;
}
</style>
