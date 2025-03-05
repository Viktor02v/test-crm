<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  users: { type: Array, required: true },
  selectedUsers: { type: Array, required: true },
  isAdmin: { type: Boolean, required: true },
  isManager: { type: Boolean, required: true },
  sortById: Function,
  sortByLogin: Function,
  sortByRegDate: Function,
})

const emit = defineEmits(['toggleSelectAll', 'viewUser', 'editUser', 'update:selectedUsers'])

const isAllSelected = computed(() => {
  return props.selectedUsers.length === props.users.length
})

const handleToggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:selectedUsers', [])
  } else {
    emit(
      'update:selectedUsers',
      props.users.map((user) => user.id),
    ) // Select all
  }
}

// individual checkbox change
const handleCheckboxChange = (isChecked: boolean, userId: number) => {
  const updatedSelectedUsers = isChecked
    ? [...props.selectedUsers, userId]
    : props.selectedUsers.filter((id) => id !== userId)

  console.log('Updated Selected Users:', updatedSelectedUsers)
  emit('update:selectedUsers', updatedSelectedUsers)
}

const handleViewUser = (userId: number) => {
  emit('viewUser', userId)
}

const handleEditUser = (userId: number) => {
  emit('editUser', userId)
}
</script>

<template>
  <DataTable
    :value="users"
    :selection="selectedUsers"
    @update:selection="(value) => emit('update:selectedUsers', value)"
    dataKey="id"
    class="w-full p-text"
  >
    <!-- Select All Checkbox -->
    <Column headerStyle="width: 50px; text-align: center">
      <template #header>
        <input type="checkbox" :checked="isAllSelected" @change="handleToggleSelectAll" />
      </template>
      <template #body="slotProps">
        <input
          type="checkbox"
          :checked="selectedUsers.includes(slotProps.data.id)"
          @change="(event) => handleCheckboxChange(event.target.checked, slotProps.data.id)"
        />
      </template>
    </Column>

    <!-- User Columns -->
    <Column class="border-b" field="id" header="ID" :sortable="true" :sortFunction="sortById" />
    <Column
      class="border-b"
      field="login"
      header="Login"
      :sortable="true"
      :sortFunction="sortByLogin"
    />
    <Column class="border-b" field="username" header="Name" />
    <Column class="border-b" field="active" header="Active">
      <template #body="slotProps">
        <div
          :class="{
            'bg-green-400 w-full h-full p-5 rounded-full': slotProps.data.active,
            'bg-red-400 w-full h-full p-5 rounded-full': !slotProps.data.active,
          }"
        ></div>
      </template>
    </Column>

    <!-- Role-Based Columns -->
    <Column class="border-b" v-if="isAdmin" field="token" header="Token" />
    <Column
      class="border-b"
      v-if="isAdmin || isManager"
      field="regdate"
      header="Registration Date"
      :sortable="true"
      :sortFunction="sortByRegDate"
    />
    <Column class="border-b" v-if="isAdmin" field="status" header="User Active Date" />
    <Column class="border-b" field="role" header="Role" />

    <!-- View Column -->
    <Column class="border-b" header="View">
      <template #body="slotProps">
        <Button icon="pi pi-eye" class="p-button-info" @click="handleViewUser(slotProps.data.id)" />
      </template>
    </Column>

    <!-- Edit Column -->
    <Column class="border-b" v-if="isAdmin || isManager" header="Edit">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-warning"
          @click="handleEditUser(slotProps.data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
.p-text {
  font-size: 15px;
}
</style>
