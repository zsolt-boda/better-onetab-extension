export function isRunningAsChromeExtension() {
  return typeof chrome !== 'undefined' && chrome.runtime?.id !== undefined
}
