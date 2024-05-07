<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted} from 'vue'
import { useCurrencySymbolStore } from 'stores/currency-symbol.store'

defineOptions({
  name: 'App'
})
const currencySymbolStore = useCurrencySymbolStore()
onMounted(() => {
  currencySymbolStore.initState()
})
</script>
