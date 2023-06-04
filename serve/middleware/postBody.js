const ResourceBody = require('../plugins/resourceBody')

module.exports = () => {
    return (req, res, next) => {
        const modelName = req.Model.modelName
        if (ResourceBody[modelName]) {
            req.body = ResourceBody[modelName](req.auth.uid, req.body)
        }
        next()
    }
}
