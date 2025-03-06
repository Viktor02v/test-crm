<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'
import Password from 'primevue/password'

const props = defineProps({
  showAddUserDialog: { type: Boolean, required: true },
  newUser: { type: Object, required: true },
  roles: { type: Array, required: true },
  generateToken: { type: Function, required: true },
})

const emit = defineEmits(['addUser', 'update:showAddUserDialog'])

const errors = ref({
  username: '',
  login: '',
  password: '',
  role: '',
})

const validateForm = () => {
  let isValid = true;

  errors.value = {
    username: '',
    login: '',
    password: '',
    role: '',
  };

  if (!props.newUser.username) {
    errors.value.username = 'Username is required!';
    isValid = false;
  }

  if (!props.newUser.login) {
    errors.value.login = 'Login is required!';
    isValid = false;
  }

  if (!props.newUser.password ) {
    errors.value.password = 'Password is required!';
    isValid = false;
  }

  if (!props.newUser.role) {
    errors.value.role = 'Role is required!';
    isValid = false;
  }

  return isValid;
};

const validateAndAddUser = () => {
  if (validateForm()) {
    emit('addUser')
  }
}

const closeDialog = () => {
  emit('update:showAddUserDialog', false)
}
</script>

<template>
  <Dialog
    :visible="showAddUserDialog"
    @update:visible="(value) => emit('update:showAddUserDialog', value)"
    modal
    class="px-[24px]"
    :style="{ width: '400px' }"
    :closable="false"
  >
    <template #header>
      <div class="text-center w-full">
        <span class="text-xl font-semibold">Add New User</span>
      </div>
    </template>

    <div class="flex flex-col space-y-4">

      <div>
        <label for="add-username" class="block text-sm font-medium mb-1">Username</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            id="add-username"
            v-model="newUser.username"
            placeholder="yourname"
            class="w-full"
            :class="{ 'p-invalid': errors.username }"
          />
        </div>
        <small v-if="errors.username" class="p-error">{{ errors.username }}</small>
      </div>

      <!-- Login Field -->
      <div>
        <label for="add-login" class="block text-sm font-medium mb-1">Login</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-sign-in"></i>
          </span>
          <InputText
            id="add-login"
            v-model="newUser.login"
            placeholder="crmsystem"
            class="w-full"
            :class="{ 'p-invalid': errors.login }"
          />
        </div>
        <small v-if="errors.login" class="p-error">{{ errors.login }}</small>
      </div>

      <!-- Password Field -->
      <div>
        <label for="add-password" class="block text-sm font-medium mb-1">Password</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password
            id="add-password"
            v-model="newUser.password"
            placeholder="12345678"
            class="w-full"
            :class="{ 'p-invalid': errors.password }"
            :feedback="false"
            toggleMask
          />
        </div>
        <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
      </div>

      <!-- Token Field -->
      <div>
        <label for="add-token" class="block text-sm font-medium mb-1">Generate Token</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <InputText
            id="add-token"
            v-model="newUser.token"
            placeholder="erwb23g"
            class="w-full"
            disabled
          />
          <Button icon="pi pi-refresh" class="p-button-outlined" @click="props.generateToken" />
        </div>
      </div>

      <!-- Role Field -->
      <div>
        <label for="add-role" class="block text-sm font-medium mb-1">Pick a Role</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-users"></i>
          </span>
          <Dropdown
            id="add-role"
            v-model="newUser.role"
            :options="roles"
            placeholder="Not Selected"
            class="w-full"
            :class="{ 'p-invalid': errors.role }"
          />
        </div>
        <small v-if="errors.role" class="p-error">{{ errors.role }}</small>
      </div>

      <!-- Active User Toggle -->
      <div class="flex items-center justify-between">
        <label for="add-active" class="ml-2">Active User</label>
        <InputSwitch v-model="newUser.active" inputId="add-active" />
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex items-center mt-5 justify-between">
      <Button
        label="Add User"
        class="p-button-success py-2 px-10 bg-blue-600 text-white"
        @click="validateAndAddUser"
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
.p-error {
  color: #ef4444;
  font-size: 12px;
}

.p-invalid {
  border-color: #ef4444 !important;
}

.p-inputgroup {
  margin-bottom: 1rem;
}


:deep(.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider) {
  background-color: #3b82f6 !important;
}

:deep(.p-inputswitch.p-inputswitch-checked:hover .p-inputswitch-slider) {
  background-color: #2563eb !important;
}

:deep(.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before) {
  background-color: #ffffff !important;
}
</style>
