import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isRunningAsChromeExtension } from '../shared/extension/isRunningAsChromeExtension'

export const usePlatformStore = defineStore('platform', () => {
  const isExtension = ref<boolean>(isRunningAsChromeExtension())
  console.log('Platform', isExtension.value)
  return { isExtension }
})
