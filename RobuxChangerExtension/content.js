// Function to change the Robux value
function changeRobuxValue(newRobuxValue) {
  const robuxElement = document.getElementById('nav-robux-amount');

  // Check if the Robux element exists
  if (robuxElement) {
    // Change the Robux value
    robuxElement.textContent = newRobuxValue;
  }
}

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const newRobuxValue = request.robuxValue;
  changeRobuxValue(newRobuxValue);

  // Store the custom Robux value in local storage
  localStorage.setItem('customRobuxValue', newRobuxValue);

  // Send a response back to the popup script
  sendResponse({ message: 'Robux value updated successfully.' });
});

// Retrieve the custom Robux value from local storage
const customRobuxValue = localStorage.getItem('customRobuxValue');

if (customRobuxValue) {
  // Call the function to change the Robux value with the retrieved custom value
  changeRobuxValue(customRobuxValue);
} else {
  // Call the function to change the Robux value with the initial default value
  changeRobuxValue('1000'); // Replace '1000' with your desired initial Robux value
  // Store the default value in local storage
  localStorage.setItem('customRobuxValue', '1000');
}

// Listen for DOM changes and call the function when needed
const observer = new MutationObserver(() => {
  const currentRobuxValue = document.getElementById('nav-robux-amount').textContent;
  changeRobuxValue(currentRobuxValue);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
