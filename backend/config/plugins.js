const SENDGRID_API_KEY = require('../secret.js')

module.exports = () => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: 'rollorzdogzczdopiec@gmail.com',
      defaultReplyTo: 'rollorzdogzczdopiec@gmail.com',
    }
  }
})