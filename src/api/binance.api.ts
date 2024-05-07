import { BinanceEndpoints } from 'api/binance.endpoints'
import { CurrencySymbol } from 'enums/currency-symbol.enum'
import type { OrderBookResponse } from 'types/order-book.types'

export const binanceApi = {
  /**
   * Получить стрим ордеров по валютной паре
   * @param {CurrencySymbol} symbol
   * @return socket
   */
  async getOrdersStream(symbol: CurrencySymbol) {
    const preparedSymbol = symbol.toLowerCase()
    const socket = new WebSocket(BinanceEndpoints.stream(preparedSymbol))
    socket.onopen = () => {
      console.log('ws open')
    }
    return socket
  },

  /**
   * Получить список ордеров по валютной паре
   * @param {CurrencySymbol} symbol
   * @param {number} limit
   */
  async getDepthSnapshot(symbol: CurrencySymbol, limit: number = 1000): Promise<OrderBookResponse> {
    const response = await fetch(BinanceEndpoints.depthSnapshot(symbol, limit))
    return  response.json()
  }
}