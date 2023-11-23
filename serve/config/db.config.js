// 默认为开发环境的DB配置
const DB_CONFIG = {
    DB_URI: 'mongodb://127.0.0.1:27017/<db-name>',
    DB_PATH: 'mongodb://<db-user>:<db-pass>@127.0.0.1:27017/<db-name>',
    DB_NAME: encodeURIComponent('blog'),
    DB_USER: encodeURIComponent('blog_db_owner'),
    DB_PASS: encodeURIComponent('Xie073015@blog')
}

const fieldMap = {
    user: 'DB_USER',
    pass: 'DB_PASS',
    name: 'DB_NAME'
}

function toRealPath(path, options) {
    let realPath = path
    options.forEach(item => {
        realPath = pathConversion(realPath, item)
    })
    return realPath
}

function pathConversion(path, field) {
    const regexp = new RegExp(`<db-${field}>`, 'gi')
    return path.replace(regexp, DB_CONFIG[fieldMap[field]])
}

// 生产环境的DB配置
if (process.env.NODE_ENV == 'production') {
    Object.assign(DB_CONFIG, {
        DB_URI: 'mongodb://clouddb.8y3lb4z.mongodb.net/<db-name>',
        DB_PATH: 'mongodb+srv://<db-user>:<db-pass>@clouddb.8y3lb4z.mongodb.net/<db-name>',
        DB_NAME: encodeURIComponent('7x-blog'),
        DB_USER: encodeURIComponent('naixxx'),
        DB_PASS: encodeURIComponent('Xie073015@mongo')
    })
}

DB_CONFIG.DB_URI = toRealPath(DB_CONFIG.DB_URI, ['name'])
DB_CONFIG.DB_PATH = toRealPath(DB_CONFIG.DB_PATH, ['user', 'pass', 'name'])

module.exports = DB_CONFIG
