const ResourceBody = require('../plugins/resourceBody')

module.exports = modelName => {
    return (req, res, next) => {
        modelName = req.Model?.modelName || modelName
        if (ResourceBody[modelName]) {
            req.body = ResourceBody[modelName](req.auth.uid, req.body)
        }
        next()
    }
}
