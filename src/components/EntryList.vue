<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'
import EntryItem from './EntryItem.vue'

const tabs = useTabsStore()
</script>

<template>
  <EntryItem v-for="entry in tabs.entriesToShow" :key="entry.id" :entry="entry">
    <div v-for="tab in entry.tabs" :key="tab.title">
      <slot name="tab" :tab="tab"></slot>
    </div>
  </EntryItem>
  <h2 :style="{ textAlign: 'center' }" v-if="tabs.entriesToShow.length === 0">
    There are no saved tabs yet!
  </h2>
</template>
