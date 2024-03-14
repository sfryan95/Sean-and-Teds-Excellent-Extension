const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uQfgUjNJ2fSWUz-aQVelxmQrFvKLms5KrQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitcWW_bHqtNzRuGLqgwpHhzADLXuDXaT9Yw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRH7xWdXoQN97r5xaBvN-KTTbOYeNgyaSVOA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyeyThcIaPIBx9MoV7SlO-dvtQPQW4oe62lw&usqp=CAU',
  'https://www.personaltrainingnottingham.com/wp-content/uploads/2018/11/how-to-stay-focused.jpg',
  'https://i.etsystatic.com/41698917/r/il/b907a8/4741207597/il_570xN.4741207597_fh55.jpg',
  'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQm8raBq1oqkGT1Ei8RmhewMOs8d1Qs1xwnuCR2LEb5WvkndekJ',
];

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

  document.getElementById('focusimage').addEventListener('click', function () {
    const image = document.getElementById('focusimage');
    image.setAttribute('src', images[Math.floor(Math.random() * images.length)]);
    image.style.height = '175px';
    image.style.width = '175px';
    image.style.margin = 'auto';
  });

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
