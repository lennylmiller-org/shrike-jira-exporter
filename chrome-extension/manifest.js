export default {
  manifest_version: 3,
  name: 'Jira Attachment Exporter',
  version: '1.0',
  description: 'Exports Jira issue XML and downloads attachments.',
  permissions: ['activeTab', 'scripting', 'downloads', 'storage'],
  background: {
    service_worker: 'background.js',
  },
  action: {
    default_popup: 'popup.html',
  },
  content_scripts: [
    {
      matches: ['*://*.jira.com/*'],
      js: ['content.js'],
    },
  ],
};
