import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Panel from 'primevue/panel'
import Toolbar from 'primevue/toolbar'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import FileUpload from 'primevue/fileupload'
import Menu from 'primevue/menu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Image from 'primevue/image'
import Skeleton from 'primevue/skeleton'
import ScrollTop from 'primevue/scrolltop'
import Chip from 'primevue/chip'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/arya-green/theme.css'
import { isRunningAsChromeExtension } from './shared/extension/isRunningAsChromeExtension'
import { isPopup } from './shared/extension/getContext'

const app = createApp(App)

app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(router)
app.use(ToastService)

app.component('PButton', Button)
app.component('PSelectButton', SelectButton)
app.component('PDropdown', Dropdown)
app.component('PCard', Card)
app.component('PDivider', Divider)
app.component('PPanel', Panel)
app.component('PToolbar', Toolbar)
app.component('PConfirmDialog', ConfirmDialog)
app.component('PFileUpload', FileUpload)
app.component('PMenu', Menu)
app.component('PToast', Toast)
app.component('PImage', Image)
app.component('PSkeleton', Skeleton)
app.component('PScrollTop', ScrollTop)
app.component('PChip', Chip)

app.mount('#app')

if (isRunningAsChromeExtension() && isPopup()) {
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.classList.add('extension-mode')
  }
}
