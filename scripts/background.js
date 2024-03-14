function addUserBlockedUrl(url) {
  chrome.storage.local.get(['ruleId'], function (result) {
    let ruleId = result.ruleId || 10;

    const rule = {
      id: ++ruleId,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: url,
        resourceTypes: ['main_frame'],
      },
    };

    chrome.storage.local.set({ ruleId: ruleId }, function () {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          addRules: [rule],
          removeRuleIds: [],
        },
        function () {
          console.log(`${url} added to block list with rule ID: ${ruleId}`);
        }
      );
    });
  });
}

function isfocusModeOn() {}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addBlockSite') {
    addUserBlockedUrl(message.url);
    console.log(`${message.url} added to block list.`);
    sendResponse({ success: true });
  } else if (message.action === 'toggleFocusMode') {
    let focusModeOn = !isFocusModeOn();
    console.log('Toggling focus mode is not a feature');
    sendResponse({ success: true, focusModeOn: focusModeOn });
  }
  return true;
});

console.log('Service worker started.');
