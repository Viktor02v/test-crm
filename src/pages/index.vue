<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { ref, onMounted, onUnmounted } from 'vue'
import { mockApiService } from '@/services/mockApiService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

interface Cards {
  url: string
  title: string
}

const email = ref<string>('')
const error = ref<string>('')
const password = ref<string>('')

const isFormOpen = ref(false)

let intervalId: number

const cards = ref<Cards[]>([
  {
    url: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Advanced Card',
  },
  {
    url: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Advanced Card',
  },
  {
    url: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Advanced Card',
  },
])

const handleLogIn = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }

  try {
    const response = await mockApiService.login({
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

const updateCards = () => {
  cards.value = cards.value.map(() => ({
    url: `https://picsum.photos/seed/${Math.random()}/200/300`,
    title: `Card ${Math.floor(Math.random() * 100)}`,
  }))
}

onMounted(() => {
  intervalId = setInterval(updateCards, Math.floor(Math.random() * (5000 - 3000 + 1)) + 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
<template>
  <div
    class="relative flex flex-col justify-around w-full space-y-[32px] h-full py-[30px] px-[104px]"
  >
    <!-- Hello Element -->
    <div class="border border-white bg-white w-full py-[16px] px-[24px] rounded">
      <div class="flex items-center justify-between">
        <i class="pi pi-box text-[62px]" />
        <div class="text-[40px]">Welcome to CRM System</div>
        <div class="flex items-center gap-2">
          <div class="icon-container">
            <i class="pi pi-github" style="font-size: 2rem; color: #2762EA" />
          </div>
          <div class="icon-container">
            <i class="pi pi-instagram" style="font-size: 2rem; color: #2762EA" />
          </div>
          <div class="icon-container">
            <i class="pi pi-linkedin" style="font-size: 2rem; color: #2762EA" />
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="flex items-center justify-between">
      <Card
        v-for="card in cards"
        :key="card.title"
        class="flex w-[320px] flex-col bg-transparent rounded-none border pt-[16px] px-10 border-black items-center"
        style="width: 320px; overflow: hidden"
      >
        <template #header>
          <img
            alt="user header"
            class="w-[240px] h-[240px] object-cover rounded-lg"
            :src="card.url"
          />
        </template>

        <template #content>
          <div class="text-black text-[20px]">{{ card.title }}</div>
        </template>
      </Card>
    </div>

    <!-- Log In Form -->
    <div class="flex flex-col items-center justify-center">
      <div v-if="isFormOpen">
        <form @submit.prevent="handleLogIn" class="w-[300px]">
          <!-- Login -->
          <div>
            <label for="login" class="block text-sm font-medium mb-1">Username</label>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText
                type="text"
                id="login"
                v-model="email"
                placeholder="my.own.crm"
                class="p-input"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-key"></i>
              </span>
              <Password
                id="password"
                v-model="password"
                placeholder="12345678"
                class="p-input"
                :feedback="false"
                toggleMask
              />
            </div>
          </div>
        </form>

        <div class="flex items-center space-x-[7px] mt-[16px] mb-[24px]">
          <input type="checkbox" class="h-[16px] w-[16px]" />
          <span class="text-[14px]">Remember me</span>
        </div>

      </div>

      <Button
        v-if="isFormOpen"
        @click="handleLogIn"
        class="bg-blue-600 rounded py-[8px] text-white px-[80px]"
        type="button"
      >
        Confirm
      </Button>

      <Button
        v-else
        @click="isFormOpen = !isFormOpen"
        class="bg-blue-600 rounded py-[8px] text-white px-[80px]"
        type="button"
      >
        Log In
      </Button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="w-full flex item-end justify-end">
      <div
        class="absolute w-[348px] bottom-[48px] bg-[#FEF2F2F2] border border-[#FECACA] text-white py-[10.5px] px-[5px] rounded shadow-lg"
      >
        <div class="w-full flex items-start justify-between">
          <div class="flex items-start space-x-[7px]">
            <i class="pi pi-times-circle text-[#DC2626] pt-1"></i>
            <div class="flex flex-col text-14px">
              <span class="text-[#DC2626]">Error</span>
              <span class="text-black text-[12.25px]">{{ error }}</span>
            </div>
          </div>
          <div>
            <Button
              icon="pi pi-times"
              class="bg-transparent border-none cursor-pointer text-[#DC2626]"
              @click="error = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-inputgroup-addon {
  border: 1px solid #cbd5e1;
  border-right: 0;
}

.p-inputgroup {
  margin-bottom: 1rem;
}
.p-input {
  width: 100%;
  height: 39px;
  border: 1px solid #cbd5e1;
  border-left: 0;
  padding-left:;
}
</style>
