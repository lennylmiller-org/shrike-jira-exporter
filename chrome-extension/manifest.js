export default {
  manifest_version: 3,
  name: 'Jira Attachment Exporter',
  version: '1.0',
  description: 'Exports Jira issue XML and downloads attachments.',
  permissions: ['activeTab', 'scripting', 'downloads', 'storage'],
  default_locale: 'en', // Add this field
  background: {
    service_worker: 'background.iife.js',
  },
  action: {
    default_popup: 'popup.html',
  },
  content_scripts: [
    {
      matches: ['*://*.jira.com/*'],
      js: ['content/index.iife.js'],
    },
  ],
};
