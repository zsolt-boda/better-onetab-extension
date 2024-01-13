<script setup lang="ts">
import { type TabInformation } from '../../shared/types/'

const props = defineProps<TabInformation>()
</script>

<template>
  <h1>This is a card</h1>
  <div>{{ props.title }}</div>
</template>
