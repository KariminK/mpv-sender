function sendToMPV() {
  const url = document.URL;
  if (!url.includes("youtube.com/watch")) return;
  const query = url.substring(url.indexOf("?") + 3, url.length);
  fetch("http://localhost:3000/" + query)
    .then((res) => {
      console.log("sent successfully");
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  history.back();
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendToMPV,
    });
  }
});

chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    title: "Send to mpv",
    contexts: ["selection"],
    id: "sendToMPV",
  })
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendToMPV,
    });
  }
});
