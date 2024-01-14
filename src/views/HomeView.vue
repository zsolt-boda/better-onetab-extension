<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'
import EntryList from '../components/EntryList.vue'
import TabCard from '../components/Tab/TabCard.vue'
import TabList from '../components/Tab/TabList.vue'
import { EntrySortStrategy, TabStyle } from '@/shared/types'
import { ref } from 'vue'

const tabs = useTabsStore()

const styleOptions = ref([
  { icon: 'pi pi-align-left', value: TabStyle.LIST },
  { icon: 'pi pi-image', value: TabStyle.CARD }
])

const sortingOptions = ref([
  { name: EntrySortStrategy.NEWEST, value: EntrySortStrategy.NEWEST },
  { name: EntrySortStrategy.OLDEST, value: EntrySortStrategy.OLDEST }
])
</script>

<template>
  <main>
    <PToolbar>
      <template #start>
        <PDropdown
          v-model="tabs.entrySortingStrategy"
          :options="sortingOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Sort by"
        />
      </template>
      <template #end>
        <PSelectButton
          :allowEmpty="false"
          v-model="tabs.tabStyle"
          :options="styleOptions"
          aria-labelledby="basic"
          optionLabel="value"
          optionValue="value"
          dataKey="value"
        >
          <template #option="slotProps">
            <i :class="slotProps.option.icon"></i>
          </template>
        </PSelectButton>
      </template>
    </PToolbar>
    <entry-list>
      <template #tab="{ tab }">
        <tab-card
          v-if="tabs.tabStyle === TabStyle.CARD"
          :title="tab.title"
          :url="tab.url"
          :meta="tab.meta"
          :key="tab.title"
        />
        <tab-list
          v-if="tabs.tabStyle === TabStyle.LIST"
          :title="tab.title"
          :url="tab.url"
          :meta="tab.meta"
          :key="tab.title"
        />
      </template>
    </entry-list>
  </main>
</template>
