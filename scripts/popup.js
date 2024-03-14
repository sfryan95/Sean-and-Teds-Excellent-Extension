document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toggleFocus').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'toggleFocusMode' }, (response) => {
      if (response && response.focusModeOn) {
        if (response.focusModeOn) {
          alert('Focus mode on!');
        } else {
          alert('Focus mode off!');
        }
      } else {
        alert('Failed to toggle focus mode!');
      }
    });
  });

  // document.getElementById('add').addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   const website = document.getElementById('website').value.trim();
  //   if (website) {
  //     chrome.runtime.sendMessage({ action: 'addBlockSite', url: website }, (response) => {
  //       if (response && response.success) {
  //         alert(`${website} added to block list`);
  //       } else {
  //         alert(`Failed to add ${website} to block list`);
  //       }
  //     });
  //   } else {
  //     alert('Please add website to block list');
  //   }
  // });

  document.getElementById('block').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        const website = currentTab.url;
        chrome.runtime.sendMessage({ action: 'addBlockSite', url: website }, (response) => {
          if (response && response.success) {
            alert(`${website} added to block list`);
          } else {
            alert(`Failed to add ${website} to block list`);
          }
        });
      }
    });
  });
});
