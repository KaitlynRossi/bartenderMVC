import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from '#imports'
import type { Drink } from '~/models/drink.model'
import type { Order } from '~/models/order.model'

const drinks = ref<Drink[]>([])

export function useDrinks() {
  const router = useRouter()  // <--- move here

  async function getDrinks() {
    const res = await axios.get<Drink[]>('http://localhost:3000/drinks')
    drinks.value = res.data
  }

  async function createOrder(id: number) {
    const res = await axios.post<Order[]>(`http://localhost:3000/orders/${id}/create`)

    if (res.data) {
      console.log('hello there')
      router.push(`/${id}/createdOrder`)
    } else {
      alert('An error occurred please try again later...')
    }
  }

  return {
    drinks,
    getDrinks,
    createOrder,
  }
}
