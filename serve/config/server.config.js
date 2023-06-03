const SERVER_URL = new URL('http://127.0.0.1:3000')

module.exports = {
    ORIGIN: SERVER_URL.origin,
    PROTOCOL: SERVER_URL.protocol,
    HOST: SERVER_URL.host,
    HOST_NAME: SERVER_URL.hostname,
    PORT: SERVER_URL.port
}
