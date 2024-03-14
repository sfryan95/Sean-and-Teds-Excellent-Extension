document.getElementById('toggleFocus').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'toggleFocusMode' }, (response) => {
    if (response.focusModeOn) {
      alert('Focus mode on!');
    } else {
      alert('Focus mode off!');
    }
  });
});
