document.getElementById('start').addEventListener('click', () => {
  const folder = document.getElementById('folder').value;
  if (folder) {
    chrome.storage.local.set({ downloadFolder: folder }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: exportJiraAttachments,
        });
      });
    });
  } else {
    alert('Please specify a folder.');
  }
});

function exportJiraAttachments() {
  chrome.runtime.sendMessage({ action: 'export_attachments' });
}
