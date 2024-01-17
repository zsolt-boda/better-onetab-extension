import { filter, forEach, get, map, values } from 'lodash'
import { ExtensionCommand } from './shared/extension'
import { JsonStorageSerializer } from './shared/extension/StorageSerializer/JsonStorageSerializer'
import { type TabObject, toTabObject } from './shared/extension/TabObject'
import { createChromeEntriesRepository } from './shared/entries/ChromeEntriesRepository'
import { createSaveEntry } from './shared/entries/createSaveEntry'

const saveEntry = createSaveEntry({
  entriesRepository: createChromeEntriesRepository({
    serializer: JsonStorageSerializer
  })
})

const handleSendAllExpectCurrentCommand = async (currentTab: chrome.tabs.Tab) => {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true })
    const tabsOtherThanCurrent: chrome.tabs.Tab[] = filter(tabs, (tab) => tab.id !== currentTab.id)
    const tabsToSave: TabObject[] = map(tabsOtherThanCurrent, toTabObject)
    await saveEntry(tabsToSave)

    const tabsToClose = map(tabsOtherThanCurrent, 'id')
    await chrome.tabs.remove(tabsToClose as number[])
  } catch (error) {
    console.error('Error while handleSendAllExpectCurrentCommand', error)
  }
}

const handleSendAllCommand = async (currentTab: chrome.tabs.Tab) => {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true })
    const tabsToSave: TabObject[] = map(tabs, toTabObject)
    await saveEntry(tabsToSave)

    const tabsToClose = map(tabs, 'id')
    await chrome.tabs.remove(tabsToClose as number[])
  } catch (error) {
    console.error('Error while handleSendAllExpectCurrentCommand', error)
  }
}

const handleSendThisCommand = async (currentTab: chrome.tabs.Tab) => {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

    const currentTab = tabs[0]

    if (currentTab) {
      await saveEntry([toTabObject(currentTab)])
      await chrome.tabs.remove(currentTab.id!)
    }
  } catch (error) {
    console.error('Error while handleSendThisCommand', error)
  }
}

type CommandHandlerFunc = (tab: chrome.tabs.Tab) => void

const ActionHandlerFuncs: Record<ExtensionCommand, CommandHandlerFunc> = {
  [ExtensionCommand.SEND_ALL_EXPECT_THIS]: handleSendAllExpectCurrentCommand,
  [ExtensionCommand.SEND_THIS_TAB]: handleSendThisCommand,
  [ExtensionCommand.SEND_ALL_TABS]: handleSendAllCommand
}

chrome.runtime.onInstalled.addListener(() => {
  forEach(values(ExtensionCommand), (command: ExtensionCommand) => {
    chrome.contextMenus.create({
      id: command,
      title: command,
      contexts: ['page']
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const handlerFunction: CommandHandlerFunc = get(ActionHandlerFuncs, info.menuItemId)

  try {
    handlerFunction(tab!)
  } catch (error) {
    console.error('Error while executing command')
  }
})
