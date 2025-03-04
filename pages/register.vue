<template>
  <div class="flex bg-stone-950 h-screen">
    <!-- sidebar -->
    <div class="bg-zinc-900 w-[516px] p-12 flex flex-col justify-center">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-8">
        Sign up for free today
      </h1>
      <p class="text-zinc-300 text-sm mt-0.5">
        Already registered? <nuxt-link to="/login" class="font-bold text-[#FFAC00] underline">Log in</nuxt-link> to your account
      </p>
      <!-- inputs -->
      <form @submit.prevent="submit"> <!-- .prevent stops page from refreshing -->
      <div class="mt-6"> 
        <label for="" class=" text-zinc-300 text-sm font-normal block mb-0.5">Email Address</label>
        <input v-model="email" placeholder="you@example.com" type="email" class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-3 py-2 placeholder:text-zinc-500 text-sm"></input>
      </div>

      <div class="mt-6"> 
        <label for="" class="text-zinc-300 text-sm font-normal block mb-0.5">Password</label>
        <input v-model="password" placeholder="*****************" type="password" class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-3 py-2 placeholder:text-zinc-500 text-sm"></input>
      </div>
      <!-- /inputs -->
      <!-- sign up button-->
      <div class="flex">
        <button class="reglog hover:scale-102 transform transition-all cursor-pointer w-full mt-6 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold text-zinc-900 flex justify-center items-center space-x-2">
           <span>Sign Up</span>
         <ArrowRight /></button>
      </div>
      <!-- /sign up button-->
    </form>
    </div>
    <!-- /sidebar -->
    <!-- right section-->
    <div></div>
    <!-- /right section-->
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')

  async function submit() {
    try {
    const response = await $fetch('/api/user', {
      method: 'POST', // post = push info to db
      body: {
        email: email.value,
        password: password.value
      }
    })

    const { isConfirmed } = await Swal.fire({
      title: 'Success',
      text: 'Account created successfully!',
      icon: 'success',
      confirmButtonText: 'Close'
    })

    if(isConfirmed) {
      navigateTo('/')
    }
  } catch(error) {
    console.log('ERROR:')
    console.log(error.response?._data?.message)

    Swal.fire({
      title: 'Error',
      text: error.response?._data?.message,
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }
    console.log(response)
  }
</script>