chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'download_attachments') {
    chrome.storage.local.get('downloadFolder', ({ downloadFolder }) => {
      message.attachments.forEach(attachment => {
        const downloadUrl = `/secure/attachment/${message.ticketId}/${attachment}`;
        const filename = `${downloadFolder}/${attachment}`;
        chrome.downloads.download({
          url: downloadUrl,
          filename,
        });
      });
    });
  }
});
