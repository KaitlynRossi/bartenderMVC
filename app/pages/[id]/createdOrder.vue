<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
<template>
    <section class="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#aaeba8] to-[#7ada76]">
        <div class="flex flex-col justify-center items-center w-screen">
            <div class="w-1/4 h-40 bg-slate-100 border border-black drop-shadow-lg rounded-full overflow-hidden text-center flex flex-col justify-center items-center">
                <h1>Order Confirmed!</h1>
                <h1>Your order Number is: {{ id }}</h1>
                <h2>You're order has been created</h2>
                <NuxtLink to="/" class="m-2 bg-[#ffca86] rounded-2xl p-1 pr-3 pl-3 text-lg hover:bg-[#fbc073] duration-75 hover:scale-105  border border-black drop-shadow-sm">Home</NuxtLink>
            </div>
        </div>
    </section>
</template>