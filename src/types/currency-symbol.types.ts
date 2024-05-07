import { CurrencySymbol } from 'enums/currency-symbol.enum'

export interface CurrencySymbolRecord {
  from: CurrencySymbol,
  to: CurrencySymbol,
  date: string,
}

export type CurrencySymbolLog = CurrencySymbolRecord[]
