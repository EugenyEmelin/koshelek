import { CurrencySymbol } from 'enums/currency-symbol.enum'
import type { SelectInput } from 'types/components.types'

/**
 * Интерфейс схемы набора информации по каждой валютной паре
 */
export type SymbolsSchema = {
  /**
   * Ключи - только значения из CurrencySymbol
   */
  [key in CurrencySymbol]: {
    /**
     * Значение валютной пары, например 'BNBBTC'
     */
    value: CurrencySymbol,
    /**
     * Название валютной пары, например 'BNB/BTC'
     */
    label: string,
    /**
     * Значения в валютной паре
     */
    currencies: {
      /**
       * Значение базовой валюты, например 'BNB' в паре 'BNBBTC'
       */
      base: string,
      /**
       * Значение котируемой валюты, например 'BTC' в паре 'BNBBTC'
       */
      quoted: string,
    }
  }
}

/**
 * Схема полного набора информации по каждой валютной паре
 */
export const symbolsSchema: SymbolsSchema = {
  [CurrencySymbol.BNBBTC]: {
    value: CurrencySymbol.BNBBTC,
    label: 'BNB/BTC',
    currencies: {
      base: 'BNB',
      quoted: 'BTC',
    }
  },
  [CurrencySymbol.BTCUSDT]: {
    value: CurrencySymbol.BTCUSDT,
    label: 'BTC/USDT',
    currencies: {
      base: 'BTC',
      quoted: 'USDT',
    }
  },
  [CurrencySymbol.ETHBTC]: {
    value: CurrencySymbol.ETHBTC,
    label: 'ETH/BTC',
    currencies: {
      base: 'ETH',
      quoted: 'BTC',
    }
  },
}

/**
 * Список валютных пар в формате готовом для отображения в компонентах
 */
export const symbolsList: SelectInput<CurrencySymbol>[] = [
  { label: symbolsSchema[CurrencySymbol.BNBBTC].label, value: CurrencySymbol.BNBBTC },
  { label: symbolsSchema[CurrencySymbol.BTCUSDT].label, value: CurrencySymbol.BTCUSDT },
  { label: symbolsSchema[CurrencySymbol.ETHBTC].label, value: CurrencySymbol.ETHBTC },
]
