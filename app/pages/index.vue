<script setup lang="ts">
    import { onMounted } from 'vue'
    import { useDrinks } from '~/controllers/drinkController'

    const { drinks, getDrinks, createOrder } = useDrinks()

    onMounted(() => {
        getDrinks()
    })
</script>

<template>
    <section class="w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#aaeba8] to-[#7ada76] pb-10">
        <h1 class="text-4xl m-5 underline">Drinks Menu:</h1>

        <div class="flex flex-col gap-y-10 justify-center items-center">
            <div v-for="drink in drinks" :key="drink.d_id" class="w-full bg-slate-100 border border-black drop-shadow-lg rounded-lg grid grid-cols-[40%_60%] overflow-hidden text-center duration-200 hover:scale-105">
                <img :src="drink.img" alt="drink image" width="200" class="bg-center object-cover max-h-48" />
                <div class="flex flex-col items-center justify-center p-2">
                    <h2 class="text-xl">{{ drink.name }}</h2>
                    <p class="text-lg">{{ drink.description }}</p>
                    <p class="text-lg">Price: {{ drink.price }}</p>
                    <button @click="createOrder(drink.d_id)" class="m-2 bg-[#ffca86] rounded-2xl p-1 pr-3 pl-3 text-lg hover:bg-[#fbc073] duration-75 hover:scale-105  border border-black drop-shadow-sm">Order Now</button>
                </div>
            </div>
        </div>
    </section>
</template>
