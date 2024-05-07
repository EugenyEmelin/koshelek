/**
 * Точки доступа api Binance
 */
export class BinanceEndpoints {
  /**
   * Сформировать URL получения потока данных стакана ордеров валютной пары
   * @param {string} currency
   */
  static stream(currency: string = 'bnbbtc') {
    return `wss://stream.binance.com:9443/ws/${currency}@depth`
  }

  /**
   * Сформировать URL получения стакана цен на текущий период
   * @param  {string} currency
   * @param limit
   */
  static depthSnapshot(currency: string = 'BNBBTC', limit: number = 1000) {
    return `https://api.binance.com/api/v3/depth?symbol=${currency}&limit=${limit}`
  }
}
