chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'export_attachments') {
    const ticketId = getSelectedTicketId();
    if (ticketId) {
      const xmlUrl = `/si/jira.issueviews:issue-xml/${ticketId}/${ticketId}.xml`;
      fetch(xmlUrl)
        .then(response => response.text())
        .then(xml => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xml, 'text/xml');
          const attachments = Array.from(xmlDoc.querySelectorAll('attachment')).map(att => att.getAttribute('name'));
          chrome.runtime.sendMessage({
            action: 'download_attachments',
            attachments,
            ticketId,
          });
        });
    }
  }
});

function getSelectedTicketId() {
  const url = window.location.href;
  const match = url.match(/browse\/([A-Z]+-\d+)/);
  return match ? match[1] : null;
}
