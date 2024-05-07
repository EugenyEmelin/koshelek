import { defineStore } from 'pinia'
import { CurrencySymbol } from 'enums/currency-symbol.enum'
import { symbolsList } from 'constants/symbols.constants'
import { LocalStorage } from 'quasar'
import { CHANGE_SYMBOLS_HISTORY, CURRENT_SYMBOL } from 'constants/local-storage-keys.constants'
import type { CurrencySymbolLog, CurrencySymbolRecord } from 'types/currency-symbol.types'
import type { Order, OrdersDepthLimit } from 'types/order-book.types'
import api from 'api/index'
import utils from 'utils/index'
import { LimitedOrdersLists } from 'types/order-book.types'

/**
 * Интерфейс хранилища текущей валютной пары
 */
export interface CurrencySymbolState {
  /**
   * Текущая валютная пара
   */
  currencySymbol: CurrencySymbol,
  /**
   * Журнал изменения текущей валютной пары
   */
  symbolsHistory: CurrencySymbolLog,
  /**
   * Ордеры на продажу
   */
  asksOrders: Order[],

  /**
   * Ордеры на покупку
   */
  bidsOrders: Order[],

  /**
   * Timestamp последнего обновления списка ордеров валютной пары
   */
  lastUpdateId: number,

  /**
   * Количество загружаемых ордеров
   */
  limit: OrdersDepthLimit,

  /**
   * Состояние загрузки
   */
  loading: boolean,
  /**
   * Текущий открытый сокет
   */
  socket: WebSocket | null,
}

export const useCurrencySymbolStore = defineStore('currency-symbol', {
  state: (): CurrencySymbolState => ({
    currencySymbol: CurrencySymbol.BTCUSDT,
    symbolsHistory: [],
    asksOrders: [],
    bidsOrders: [],
    lastUpdateId: 0,
    limit: 1000,
    loading: false,
    socket: null,
  }),

  getters: {
    /**
     * Получить текущую валютную пару в формате готовом для отображения в компонентах
     * @param {CurrencySymbolState} state
     */
    getCurrencySymbolView(state: CurrencySymbolState) {
      return symbolsList.find((symbol) => symbol.value === state.currencySymbol)
    },

    /**
     * Список ордеров ограниченного размера на покупку и продажу
     * @param {CurrencySymbolState} state
     */
    getLimitedOrdersList(state: CurrencySymbolState) {
      return (limit: OrdersDepthLimit): LimitedOrdersLists => {
        let limitedAsksOrders: Order[] = []
        let limitedBidsOrders: Order[] = []

        if (state.asksOrders.length < limit) {
          limitedAsksOrders = state.asksOrders
        } else {
          limitedAsksOrders = state.asksOrders.slice(0, limit)
        }

        if (state.bidsOrders.length < limit)  {
          limitedBidsOrders = state.bidsOrders
        } else {
          limitedBidsOrders = state.bidsOrders.slice(0, limit)
        }

        return {
          asks: limitedAsksOrders,
          bids: limitedBidsOrders,
        }
      }
    }
  },

  actions: {
    /**
     * Метод инициализации хранилища. Заполняет хранилище при запуске значениями из local storage
     */
    async initState() {
      this.symbolsHistory = JSON.parse(<string>LocalStorage.getItem(CHANGE_SYMBOLS_HISTORY)) || []
      this.currencySymbol = <CurrencySymbol>LocalStorage.getItem(CURRENT_SYMBOL) || CurrencySymbol.BTCUSDT
      await this.fetchDepthSnapshot(this.currencySymbol, this.limit)
    },

    /**
     * Добавить запись в журнал изменения текущей валютной пары
     *
     * @param {CurrencySymbol} from
     * @param {CurrencySymbol} to
     */
    addLog(from: CurrencySymbol, to: CurrencySymbol) {
      const record: CurrencySymbolRecord = {
        from,
        to,
        date: new Date().toISOString()
      }
      this.symbolsHistory.unshift(record)
      LocalStorage.setItem(CHANGE_SYMBOLS_HISTORY, JSON.stringify(this.symbolsHistory))
      LocalStorage.setItem(CURRENT_SYMBOL, to)
    },

    /**
     * Обновить текущую валютную пару
     *
     * @param {CurrencySymbol} newCurrencySymbol
     */
    async rest(newCurrencySymbol: CurrencySymbol) {
      this.addLog(this.currencySymbol, newCurrencySymbol)
      this.currencySymbol = newCurrencySymbol
      LocalStorage.setItem(CURRENT_SYMBOL, newCurrencySymbol)
      await this.fetchDepthSnapshot(newCurrencySymbol, this.limit)
    },

    /**
     * Создать стрим данных по валютной паре
     */
    async createOrdersStream(symbol: CurrencySymbol) {
      if (this.socket) {
        this.socket.close()
      }
      this.socket = await api.binance.getOrdersStream(symbol)
      this.socket.onmessage = (msg) => {
        try {
          // this.asksOrders = JSON.parse(msg.data)
          const data = JSON.parse(msg.data)
          const a = utils.dataMapping.ordersFromRaw(data.a)
          const b = utils.dataMapping.ordersFromRaw(data.b)
          const u = Number(data.u)
          const U = Number(data.U)
          const aFiltered = a.filter((order) => order.quantity !== 0)
          const bFiltered = b.filter((order) => order.quantity !== 0)
          // console.log('u: ', u)
          console.log('U: ', U)
          if (u > this.lastUpdateId) {
            this.asksOrders.unshift(...aFiltered)
            this.bidsOrders.unshift(...bFiltered)
            this.asksOrders.splice(this.limit)
            this.bidsOrders.splice(this.limit)
          }
        } catch {
          throw new Error('Не удалось получить данные по websocket')
        }
      }
    },

    /**
     * Загрузить ордеры
     */
    async fetchDepthSnapshot(symbol: CurrencySymbol, limit: number) {
      this.loading = true
      const orders = await api.binance.getDepthSnapshot(symbol, limit)
      const asksOrders = orders.asks
      const bidsOrders = orders.bids
      const mappedAsksOrders: Order[] = utils.dataMapping.ordersFromRaw(asksOrders)
      const mappedBidsOrders: Order[] = utils.dataMapping.ordersFromRaw(bidsOrders)
      this.asksOrders = mappedAsksOrders
      this.bidsOrders = mappedBidsOrders
      this.lastUpdateId = orders.lastUpdateId
      this.loading = false
      await this.createOrdersStream(symbol)
    },

    /**
     * Перезапустить стрим
     */
    async resetStream() {
      this.asksOrders = []
      this.bidsOrders = []
      await this.createOrdersStream(this.currencySymbol)
    },
  },
});
