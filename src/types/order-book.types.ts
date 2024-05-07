/**
 * Интерфейс ордера
 */
export interface Order {
  /**
   * Цена
   */
  price: number,

  /**
   * Количество
   */
  quantity: number,

  /**
   * Всего (price * quantity)
   */
  total?: number,
}

export type RawOrder = [string, string]

/**
 * Интерфейс структуры данных списка ордеров (depth snapshot)
 */
export interface OrderBookResponse {
  /**
   * Список ордеров на покупку
   */
  asks: RawOrder[],
  /**
   * Список ордеров на продажу
   */
  bids: RawOrder[],
  /**
   * Timestamp последнего обновления списка ордеров
   */
  lastUpdateId: number,
}

/**
 * Размер стакана ордеров
 */
export type OrdersDepthLimit = 10 | 100 | 500 | 1000

/**
 * Интерфейс списков ордеров на покупку и продажу ограниченного размера
 */
export interface LimitedOrdersLists {
  asks: Order[],
  bids: Order[],
}
