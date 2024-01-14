export function isPopup(): boolean {
  return chrome.extension.getViews({ type: 'popup' }).length > 0
}
