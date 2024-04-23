<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'


import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { onMounted } from 'vue'

const { getCategory } = useCategoryStore()
onMounted(() => getCategory())
</script>
<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
<style scoped lang="scss"></style>