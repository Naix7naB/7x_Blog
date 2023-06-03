const path = require('path')
const ROOT = path.join(__dirname, '../')

module.exports = {
    ROOT: ROOT,
    SIGN_ALGO: 'RS256',
    EXP_IN: 3600 * 24 * 30,
    PUB_KEY_PATH: path.join(ROOT, '/keys/public.cer'),
    PRI_KEY_PATH: path.join(ROOT, '/keys/private.cer'),
    UPLOAD_PATH: path.join(ROOT, '/upload')
}
