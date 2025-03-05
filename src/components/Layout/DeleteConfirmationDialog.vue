<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps({
  showDeleteDialog: { type: Boolean, required: true },
  deleteConfirmationText: { type: String, required: true },
})


const emit = defineEmits([
  'confirmDelete',
  'update:showDeleteDialog',
  'update:deleteConfirmationText',
])


const confirmDelete = () => {
  emit('confirmDelete')
}

const closeDialog = () => {
  emit('update:showDeleteDialog', false)
  emit('update:deleteConfirmationText', '') // Reset confirmation text
}
</script>
<template>
  <Dialog
    :visible="showDeleteDialog"
    @update:visible="(value) => emit('update:showDeleteDialog', value)"
    modal
    header="Delete User"
    :style="{ width: '400px' }"
  >
    <p>Are you sure about deleting this user?</p>
    <p>To confirm, type <strong>DELETE</strong> in the field below:</p>
    <InputText
      :value="deleteConfirmationText"
      @update:modelValue="(value) => emit('update:deleteConfirmationText', value)"
      placeholder="DELETE"
      class="w-full h-10 mt-2 pl-2"
    />

    <div class="flex items-center mt-5 justify-between">
      <Button
        label="Delete User"
        class="p-button-danger py-2 px-5 text-white bg-red-500"
        @click="confirmDelete"
      />
      <Button
        label="Cancel"
        class="p-button-text py-2 px-5 text-blue-600 border border-blue-400 bg-white"
        @click="closeDialog"
      />
    </div>
  </Dialog>
</template>
