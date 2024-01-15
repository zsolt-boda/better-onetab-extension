export type TabObject = {
  favIconUrl: string
  url: string
  title: string
}
export const toTabObject = (tab: chrome.tabs.Tab): TabObject => ({
  favIconUrl: tab.favIconUrl || '',
  url: tab.url || '',
  title: tab.title || ''
})
