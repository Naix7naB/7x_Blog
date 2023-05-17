const path = require('path')
const ROOT = path.join(__dirname, '../')

module.exports = {
  root: ROOT,
  algorithm: 'RS256',
  expiresIn: 3600 * 24 * 3,
  pubKeyPath: path.join(ROOT, '/keys/public.cer'),
  priKeyPath: path.join(ROOT, '/keys/private.cer'),
  uploadPath: path.join(ROOT, '/uploads')
}
