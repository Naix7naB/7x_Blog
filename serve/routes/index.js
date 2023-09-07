const resourceRoute = require('./resource')
const siteRoute = require('./site')
const adminRoute = require('./admin')
const articleRoute = require('./article')
const commentRoute = require('./comment')
const uploadRoute = require('./upload')

module.exports = {
    resourceRoute,
    adminRoute,
    siteRoute,
    articleRoute,
    commentRoute,
    uploadRoute
}
