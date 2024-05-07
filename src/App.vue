<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onDeactivated } from 'vue'
import { useCurrencySymbolStore } from 'stores/currency-symbol.store'

defineOptions({
  name: 'App'
})
const store = useCurrencySymbolStore()
const currencySymbolStore = useCurrencySymbolStore()
onMounted(() => {
  currencySymbolStore.initState()
})
onDeactivated(() => {
  if (store.socket) {
    store.socket.close()
  }
})
</script>
