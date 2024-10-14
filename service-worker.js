function sendToMPV() {
  const url = document.URL;
  const query = url.substring(url.indexOf("?") + 3, url.length);
  fetch("http://localhost:3000/" + query)
    .then((res) => {
      console.log("sent successfully");
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendToMPV,
    });
  }
});
