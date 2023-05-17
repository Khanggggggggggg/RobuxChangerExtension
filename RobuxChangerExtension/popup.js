document.addEventListener('DOMContentLoaded', () => {
  const changeRobuxButton = document.getElementById('change-robux-button');

  changeRobuxButton.addEventListener('click', () => {
    const robuxInput = document.getElementById('robux-input');
    const newRobuxValue = robuxInput.value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { robuxValue: newRobuxValue }, (response) => {
        console.log(response.message);
      });
    });
  });
});
