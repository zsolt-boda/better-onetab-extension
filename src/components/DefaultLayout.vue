<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'
import { ref } from 'vue'

const menu = ref()
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Import',
        icon: 'pi pi-file-import'
      },
      {
        label: 'Export',
        icon: 'pi pi-upload'
      }
    ]
  }
])

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const tabs = useTabsStore()
</script>

<template>
  <div>
    <PToolbar class="header">
      <template #start>
        <h3>Better OneTab</h3>
      </template>
      <template #center> Saved: {{ tabs.numberOfTabs }} tabs </template>
      <template #end>
        <PButton
          text
          rounded
          type="button"
          icon="pi pi-ellipsis-v"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <PMenu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </template>
    </PToolbar>
    <slot></slot>
    <PScrollTop target="parent" />
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 15px;
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
