const gravatar = require('gravatar');
module.exports = (url, opt = { s: '200', r: 'pg', d: '404' }) => gravatar.url(url, opt)