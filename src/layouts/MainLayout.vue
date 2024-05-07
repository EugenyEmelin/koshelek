<template>
  <q-layout view="lHh Lpr lFf">
    <!--  Хедер  -->
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-icon
            name="savings"
            size="2em"
            color="pink"
            class="cursor-pointer"
            @click="$router.push('/')"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!--  Меню  -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header />
        <q-item to="/settings" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section class="menu-item">Настройки</q-item-section>
        </q-item>
        <q-item to="/order-book" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="chrome_reader_mode" />
          </q-item-section>
          <q-item-section class="menu-item">Order Book</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!--  Блок контента  -->
    <q-page-container>
      <q-page class="page-container full-width full-height">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})
const leftDrawerOpen = ref(false)

/**
 * Обработчик открытия/закрытия меню
 */
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style scoped lang="sass">
.header
  height: $header-height

.page-container
  padding: 24px
  @media (max-width: $breakpoint-sm-max)
    padding: 15px 10px

.menu-item
  font-size: 16px
</style>
