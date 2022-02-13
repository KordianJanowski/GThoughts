const SENDGRID_API_KEY = require('../secret.js')

module.exports = () => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: 'no-reply-golden-arts@op.pl',
      defaultReplyTo: 'no-reply-golden-arts@op.pl',
    }
  }
})