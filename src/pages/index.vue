<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { ref, onMounted, onUnmounted } from 'vue'
import { mockApi } from '@/services/mokiApi'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Cards {
  url: string
  title: string
}

const cards = ref<Cards[]>([
  {
    url: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Advanced Card',
  },
  {
    url: 'https://picsum.photos/seed/picsum/200/300'
    title: 'Advanced Card',
  },
  {
    url: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Advanced Card',
  },
])

const email = ref<string>('')
const error = ref<string>('')
const password = ref<string>('')

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const handleLogIn = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }

  try {
    const response = await mockApi.login({
      login: email.value,
      password: password.value,
    })

    if (!response || !response.data) {
      throw new Error('Invalid response from server')
    }

    authStore.setUser(response.data)

    router.push('/logged')
  } catch (err) {
    console.error('Login error:', err)

    if (err.response) {
      error.value = err.response.data?.message || 'Invalid credentials'
    } else if (err.request) {
      error.value = 'No response from server. Please try again later.'
    } else {
      error.value = 'An unexpected error occurred. Please try again.'
    }
  }
}

const isFormOpen = ref(false)

const updateCards = () => {
  cards.value = cards.value.map(() => ({
    url: `https://picsum.photos/seed/${Math.random()}/200/300`,
    title: `Card ${Math.floor(Math.random() * 100)}`,
  }))
}

let intervalId: number

onMounted(() => {
  intervalId = setInterval(updateCards, Math.floor(Math.random() * (5000 - 3000 + 1)) + 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
<template>
  <div
    class="bg-gradient-to-t relative from-slate-950 to-slate-200 flex flex-col justify-around w-full h-full py-[30px]"
  >
    <!-- Hello Element -->
    <div class="border border-white bg-white w-full p-3 rounded">
      <div class="flex items-center justify-between">
        <img src="/logo-virus.webp" width="50" height="50" alt="" />
        <div class="text-[40px]">Welcome to CRM System</div>
        <div class="flex items-center gap-2">
          <div class="icon-container">
            <i class="pi pi-github" style="font-size: 2rem"></i>
          </div>
          <div class="icon-container">
            <i class="pi pi-twitter" style="font-size: 2rem"></i>
          </div>
          <div class="icon-container">
            <i class="pi pi-linkedin" style="font-size: 2rem"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="flex items-center justify-between">
      <Card
        v-for="card in cards"
        :key="card.title"
        class="flex flex-col bg-transparent rounded-none border pt-5 px-10 border-white items-center"
        style="width: 320px; overflow: hidden"
      >
        <template #header>
          <img alt="user header" class="w-[250px] h-[250px] rounded" :src="card.url" />
        </template>
        <template #title>
          <div class="text-white">{{ card.title }}</div></template
        >
      </Card>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div v-if="isFormOpen">
        <form
          @submit.prevent="handleLogIn"
          class="p-5 w-[300px] flex flex-col gap-10 items-center justify-center"
        >
          <InputGroup class="justify-center relative w-full">
            <label class="absolute top-[-30px] left-0" for="email">Login</label>
            <InputGroupAddon class="rounded-l">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText v-model="email" type="text" placeholder="my.own.crm" />
          </InputGroup>

          <!-- Password Input -->
          <InputGroup class="justify-center relative w-full">
            <label class="absolute top-[-30px] left-0" for="password">Password</label>
            <InputGroupAddon class="rounded-l">
              <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText v-model="password" type="password" placeholder="Password" />
          </InputGroup>
        </form>
      </div>

      <Button
        v-if="isFormOpen"
        @click="handleLogIn"
        class="bg-blue-600 rounded py-2 text-white px-[50px]"
        type="button"
      >
        Confirm
      </Button>

      <Button
        v-else
        @click="isFormOpen = !isFormOpen"
        class="bg-blue-600 rounded py-2 text-white px-[50px]"
        type="button"
      >
        Log In
      </Button>
    </div>

    <div
      v-if="error"
      class="absolute bottom-5 right-5 bg-red-500 text-white p-3 rounded shadow-lg transition-opacity duration-300"
    >
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: blue;
  padding: 1px;
  border-radius: 8px;
  margin: 1px;
}
</style>
