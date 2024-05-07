<template>
  <div class="order-book-header flex row no-wrap justify-between items-center">
    <div class="text-h6 flex row no-wrap">
      <div v-if="Screen.gt.xs" class="text-no-wrap">Биржевой стакан &mdash;</div>
      <span class="text-weight-light q-ml-xs"> {{ currentSymbol }}</span>
    </div>
    <q-select
      v-model="ordersDepthLimit"
      :options="ordersDepthLimitOptions"
      @update:model-value="handleDepthSelect"
      label="Глубина стакана"
      class="table-size-select q-ml-xl"
      transition-show="scale"
      transition-hide="scale"
      filled
      dense
    />
  </div>
  <div class="static-screen row">
    <div class="col-6 relative-position">
      <q-table
        title="Ордер на покупку"
        :rows="bidsOrders"
        :columns="columns"
        :visible-columns="visibleColumns"
        :pagination="bidsTablePagination"
        :loading="loading"
        class="order-table order-table--bids sticky-head"
        title-class="table-title table-title--bids"
        dense
        flat
        square
        bordered
        hide-pagination
        hide-no-data
        virtual-scroll
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <div class="col-6 relative-position">
      <q-table
        title="Ордер на продажу"
        :rows="asksOrders"
        :columns="columns"
        :visible-columns="visibleColumns"
        :pagination="asksTablePagination"
        :loading="loading"
        class="order-table order-table--asks sticky-head"
        title-class="table-title table-title--asks"
        dense
        flat
        square
        bordered
        hide-pagination
        hide-no-data
        virtual-scroll
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Screen } from 'quasar'
import { useCurrencySymbolStore } from 'stores/currency-symbol.store'
import { symbolsSchema } from 'constants/symbols.constants'
import type { QTableColumn } from 'quasar'
import { OrdersDepthLimit } from 'types/order-book.types'

const store = useCurrencySymbolStore()

const columns: QTableColumn[] = [
  { name: 'price', label: 'Цена', field: 'price', align: 'left' },
  { name: 'quantity', label: 'Кол-во', field: 'quantity', align: 'left' },
  { name: 'total', label: '', field: 'total', align: 'left' },
]

const loading = computed(() => store.loading)

const currentSymbol = computed(() => symbolsSchema[store.currencySymbol].label)

const visibleColumns = computed(() => {
  const desktopColumns = ['price', 'quantity', 'total']
  const mobileColumns = ['price', 'quantity']
  return Screen.lt.md ? mobileColumns : desktopColumns
})

const asksTablePagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 0
}

const bidsTablePagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 0
}

const ordersDepthLimit = ref<OrdersDepthLimit>(store.limit)
const ordersDepthLimitOptions: OrdersDepthLimit[] = [100, 500, 1000]
const asksOrders = computed(() => store.getLimitedOrdersList(ordersDepthLimit.value).asks)
const bidsOrders = computed(() => store.getLimitedOrdersList(ordersDepthLimit.value).bids)

function handleDepthSelect(limit: OrdersDepthLimit) {
  store.$patch({ limit })
  store.fetchDepthSnapshot(store.currencySymbol, limit)
}

</script>

<style scoped lang="sass">
.order-table
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  thead tr th
    position: sticky
  &--asks
    margin-left: 12px
    @media (max-width: $breakpoint-sm-max)
      margin-left: 8px
    @media (max-width: $breakpoint-xs-max)
      margin-left: 2px
  &--bids
    margin-right: 12px
    @media (max-width: $breakpoint-sm-max)
      margin-right: 8px
    @media (max-width: $breakpoint-xs-max)
      margin-right: 2px

.order-book-header
  height: $order-book-header-height
  margin-bottom: $order-book-header-mb

.table-size-select
  width: 150px
  @media (max-width: $breakpoint-xs-max)
    width: 100%

.table-title
  font-size: 12px
  color: red
</style>