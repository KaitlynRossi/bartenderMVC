import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { Order } from '~/models/order.model';

const orders = ref<Order[]>([])

    async function fetchOrders() {
        const res = await axios.get<Order[]>('http://localhost:3000/orders');
            orders.value = res.data;
    }

    async function updateStatus(id:number, event:Event){
        const target = event.target as HTMLSelectElement
        const value = target.value
        try{
            const res = await axios.patch<Order>(`http://localhost:3000/orders/${id}/update`, {
                status: value
            });
            if (res.status === 200) {
                const index = orders.value.findIndex(order => order.o_id === id)
                if (index !== -1) {
                    orders.value[index] = res.data
                }
            }
        }catch(Exception){
            console.error(Exception, 'Error in updateStatus');
        }
    }

    async function updateServer(id:number, event:Event){
        const target = event.target as HTMLSelectElement
        const value = target.value
        try{
            const res = await axios.patch<Order>(`http://localhost:3000/orders/${id}/update`, {
                serverName: value
            });
            if (res.status === 200) {
                const index = orders.value.findIndex(order => order.o_id === id)
                if (index !== -1) {
                    orders.value[index] = res.data
                }
            }
        }catch(Exception){
            console.error(Exception, 'Error in updateStatus');
        }
    }

    export function useOrders() {
        return {
          orders,
          fetchOrders,
          updateStatus,
          updateServer
        }
    }