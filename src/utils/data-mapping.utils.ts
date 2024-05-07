import { Order, RawOrder } from 'types/order-book.types'

/**
 * Утилиты преобразования данных из одной структуры в другую
 */
export const dataMappingUtils = {
  /**
   * Преобразование массива ордеров типа
   * [['<price>', '<quantity>'], ['<price>', '<quantity>'], ...] в структуру типа Order[]
   */
  ordersFromRaw(orders: RawOrder[]): Order[] {
    return orders.map((order) => {
      const price = Number(order[0])
      const quantity = Number(order[1])
      const total = Number((price * quantity).toFixed(8))
      return { price, quantity, total }
    })
  }
}
