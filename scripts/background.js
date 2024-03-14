chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addBlockSite') {
    addUserBlockedUrl(message.url);
    console.log(`${message.url} added to block list.`);
    sendResponse({ success: true });
  } else if (message.action === 'toggleFocusMode') {
    console.log('Toggling focus mode is not a feature');
    sendResponse({ focusModeOn: false });
  }
  return true;
});
function addUserBlockedUrl(url) {
  let ruleId = 1;
  const rule = {
    id: ruleId++,
    priority: 1,
    action: { type: 'block' },
    condition: {
      urlFilter: url,
      resourceTypes: ['main_frame'],
    },
  };

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [],
  });
}

console.log('Service worker started.');
