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
  sortByName: Function,
  sortByActive: Function,
  sortByToken: Function,
  sortByStatus: Function,
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
  <div class="w-full h-full flex items-center justify-center">
    <div>
      <DataTable
        :value="users"
        :selection="selectedUsers"
        @update:selection="(value) => emit('update:selectedUsers', value)"
        dataKey="id"
        class="w-[1150px] p-text"
        :rowHover="true"
        :scrollable="true"
        scrollHeight="flex"
      >
        <!-- Select All Checkbox -->
        <Column headerStyle="width: 10px; text-align: center">
          <template #header>
            <input
              type="checkbox"
              class="w-[17.5px] h-[17.5px]"
              :checked="isAllSelected"
              @change="handleToggleSelectAll"
            />
          </template>
          <template #body="slotProps">
            <input
              type="checkbox"
              class="w-[17.5px] h-[17.5px]"
              :checked="selectedUsers.includes(slotProps.data.id)"
              @change="(event) => handleCheckboxChange(event.target.checked, slotProps.data.id)"
            />
          </template>
        </Column>

        <!-- User Columns -->
        <Column
          class="border-b"
          field="id"
          header="ID"
          :sortable="true"
          :sortFunction="sortById"
          headerStyle="width: 10px;"
          bodyStyle="white-space: nowrap;"
        />
        <Column
          class="border-b"
          field="login"
          header="Login"
          :sortable="true"
          :sortFunction="sortByLogin"
          headerStyle="width: 100px;"
          bodyStyle="white-space: nowrap;"
        />
        <Column
          class="border-b"
          field="username"
          header="Name"
          :sortable="true"
          :sortFunction="sortByName"
          headerStyle="width: 100px;"
          bodyStyle="white-space: nowrap;"
        />
        <Column
          class="border-b"
          field="active"
          header="Active"
          :sortable="true"
          :sortFunction="sortByActive"
          headerStyle="width: 50px;"
          bodyStyle="white-space: nowrap;"
        >
          <template #body="slotProps">
            <div
              :class="{
                'bg-green-400 w-full h-full p-5 rounded-xl': slotProps.data.active,
                'bg-red-400 w-full h-full p-5 rounded-xl': !slotProps.data.active,
              }"
            ></div>
          </template>
        </Column>

        <Column
          class="border-b"
          v-if="isAdmin"
          field="token"
          header="Token"
          :sortable="true"
          :sortFunction="sortByToken"
          headerStyle="width: 100px;"
          bodyStyle="white-space: nowrap;"
        />
        <Column
          class="border-b"
          v-if="isAdmin || isManager"
          field="regdate"
          header="Registration Date"
          :sortable="true"
          :sortFunction="sortByRegDate"
          headerStyle="width: 250px;"
          bodyStyle="white-space: nowrap;"
        />

        <Column
          class="border-b"
          field="status"
          header="User Active Date"
          :sortable="true"
          :sortFunction="sortByStatus"
          headerStyle="width: 200px;"
          bodyStyle="white-space: nowrap;"
        >
          <template #body="slotProps">
            <span v-if="slotProps.data.active">Active</span>
            <span v-else>{{ slotProps.data.lastActiveDate || slotProps.data.regdate }}</span>
          </template>
        </Column>

        <Column
          class="border-b"
          header="Logs"
          :sortable="true"
          headerStyle="width: 50px;"
          bodyStyle="white-space: nowrap;"
        >
          <template #body>
            <div class="flex items-center space-x-[8px]">
              <div
                class="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#EF44441A] border-2 border-[#DC2626]"
              >
                <span class="text-[#DC2626] font-bold"> 2 </span>
              </div>
              <div
                class="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#FACC151A] border-2 border-[#FACC15]"
              >
                <span class="text-[#FACC15] font-bold"> 2 </span>
              </div>
              <div
                class="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#22C55E1A] border-2 border-[#22C55E]"
              >
                <span class="text-[#22C55E] font-bold"> 2 </span>
              </div>
            </div>
          </template>
        </Column>

        <!-- View Column -->
        <Column class="border-b" header="View" headerStyle="width: 50px;">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-info"
              @click="handleViewUser(slotProps.data.id)"
            />
          </template>
        </Column>

        <!-- Edit Column -->
        <Column
          class="border-b"
          v-if="isAdmin || isManager"
          header="Edit"
          headerStyle="width: 50px;"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-warning"
              @click="handleEditUser(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.p-text {
  font-size: 14px;
}

.p-datatable .p-datatable-thead > tr > th,
.p-datatable .p-datatable-tbody > tr > td {
  white-space: nowrap;
}
</style>
