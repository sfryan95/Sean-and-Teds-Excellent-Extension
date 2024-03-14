document.getElementById('add').addEventListener('click', function () {
  const website = document.getElementById('website').value.trim();
  if (website) {
    chrome.runtime.sendMessage({ action: 'addBlockSite', url: website }, (response) => {
      if (response && response.success) {
        alert(`${website} added to block list`);
      } else {
        alert(`Failed to add ${website} to block list`);
      }
    });
  } else {
    alert(website + 'added to block list');
  }
});
