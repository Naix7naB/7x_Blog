const DB_URL = new URL('mongodb://127.0.0.1:27017/blog')

module.exports = {
    ORIGIN: DB_URL.href.replace(DB_URL.pathname, ''),
    PROTOCOL: DB_URL.protocol,
    HOST: DB_URL.host,
    HOST_NAME: DB_URL.hostname,
    PORT: DB_URL.port,
    DB_NAME: DB_URL.pathname.replace('/', '')
}
