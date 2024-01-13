<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'
import { format } from 'date-fns'

const { entries } = useTabsStore()
</script>

<template>
  <h1>EntryList</h1>
  <div v-for="entry in entries" :key="entry.id">
    <div>Created: {{ format(entry.createdAt, 'yyyy-MM-dd') }}</div>
    <div v-for="tab in entry.tabs" :key="tab.title">
      <slot name="tab" :tab="tab"></slot>
    </div>
  </div>
</template>

<style scoped></style>
