<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrders } from '~/controllers/orderController'

const { orders, fetchOrders, updateStatus, updateServer } = useOrders()

onMounted(() => {
  fetchOrders()
})
</script>


<template>
    <section class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#aaeba8] to-[#7ada76] pb-10">
        <h1 class="text-4xl m-5 underline">Orders:</h1>

        <div class="grid grid-cols-3 gap-10 justify-center items-center">
            <div v-for="order in orders" :key="order.o_id" class="w-full bg-slate-100 border border-black drop-shadow-lg rounded-lg overflow-hidden text-center duration-200 hover:scale-105">
                    <h2 class="text-xl">Order #: {{ order.o_id }}</h2>
                    <p class="text-lg">Drink Id In Order: {{ order.drink_id }}</p>
                    <p class="text-lg">Order Status: {{ order.status }}</p>
                    <p class="text-lg">Server: {{ order.server }}</p>
                    <div class="grid grid-cols-2 gap-3 m-3">
                            
                            <label>Change Server:</label>
                            <select @change="updateServer(order.o_id, $event)">
                                <option disabled selected value> -- select an option -- </option>
                                <option value="Lena Hargrave">Lena Hargrave</option>
                                <option value="Dario Voss">Dario Voss</option>
                                <option value="Mira Caldwell">Mira Caldwell</option>
                                <option value="Jaxon Thorne">Jaxon Thorne</option>
                            </select>

                            <label >Change Order Status:</label>
                            <select @change="updateStatus(order.o_id, $event)">
                                <option disabled selected value> -- select an option -- </option>
                                <option value="New">New</option>
                                <option value="Pending">Pending</option>
                                <option value="In Process">In Process</option>
                            </select>
                    </div>
                    <button value="Completed" @click="updateStatus(order.o_id, $event)" class="m-2 bg-[#ffca86] rounded-2xl p-1 pr-3 pl-3 text-lg hover:bg-[#fbc073] duration-75 hover:scale-105  border border-black drop-shadow-sm">Complete Order</button>
            </div>
        </div>
    </section>
</template>