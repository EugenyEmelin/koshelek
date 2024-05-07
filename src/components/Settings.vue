<template>
  <q-select
    v-model="currencySymbol"
    :options="symbolsList"
    @update:model-value="handleSelect"
    class="symbol-select"
    label="Валютная пара"
    transition-show="scale"
    transition-hide="scale"
    dense
    filled
  />
  <q-table
    v-model:pagination="pagination"
    class="q-mt-lg"
    flat
    title="История изменений валютной пары"
    :rows="rows"
    :columns="columns"
    hide-pagination
    hide-no-data
  >
    <template #body-cell-date="props">
      <q-td :props="props" class="table-date">
        <div class="text-weight-bold text-grey-8 q-mr-sm">{{ getDate(props.row.date, 'DD MMM YYYY') }}</div>
        <div class="text-grey-7">{{ getDate(props.row.date, 'HH:mm:ss') }}</div>
      </q-td>
    </template>
  </q-table>
  <div class="row justify-center q-mt-md">
    <q-pagination
        v-model="pagination.page"
        v-if="pagesNumber > 1"
        color="grey-8"
        :max="pagesNumber"
        size="md"
    />
  </div>
</template>

<script setup lang="ts">

import { useCurrencySymbolStore } from 'stores/currency-symbol.store'
import { date } from 'quasar'
import { computed, ref} from 'vue'
import { symbolsList } from 'constants/symbols.constants'
import { MONTHS_SHORT_RU } from 'constants/months.constants'
import { CurrencySymbol } from 'enums/currency-symbol.enum'
import type { SelectInput } from 'types/components.types'
import type { QTableColumn } from 'quasar'

defineOptions({
  name: 'SettingsComponent',
})
const store = useCurrencySymbolStore()

const rows = computed(() => store.symbolsHistory)

/**
 * Функция форматирования лейбла валютной пары в таблице
 * @param {CurrencySymbol} value
 */
function formatTableLabel(value: CurrencySymbol) {
  switch (value) {
    case CurrencySymbol.BNBBTC:
      return 'BNB/BTC'
    case CurrencySymbol.BTCUSDT:
      return 'BTC/USDT'
    case CurrencySymbol.ETHBTC:
      return 'ETH/BTC'
  }
}

/**
 * Получить дату изменения текущей валютной пары
 * @param {string} tableDate
 * @param {string} format
 */
function getDate(tableDate: string, format: string) {
  return date.formatDate(tableDate, format, {
    monthsShort: MONTHS_SHORT_RU
  })
}

/**
 * Настройки колонок таблицы
 */
const columns: QTableColumn[] = [
  { name: 'from', label: 'Было', field: 'from', align: 'left', format: formatTableLabel },
  { name: 'to', label: 'Стало', field: 'to', align: 'left', format: formatTableLabel },
  { name: 'date', label: 'Дата изменения', field: 'date', align: 'left' },
]

/**
 * Настройки пагинации таблицы
 */
const pagination = ref({
  page: 1,
  rowsPerPage: 9
})

const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))

const storeSymbol = computed(() => store.getCurrencySymbolView)

const currencySymbol = ref(storeSymbol.value)

/**
 * Обработчик выбора валютной пары
 */
function handleSelect(symbol: SelectInput<CurrencySymbol>) {
  store.rest(symbol.value)
}
</script>
<style scoped lang="sass">
.symbol-select
  width: 300px
  max-width: 100%
  @media (max-width: $breakpoint-sm-min)
    width: 100%

.table-date
  display: flex
  @media (max-width: $breakpoint-sm-max)
    display: block
    margin-left: 0
</style>
