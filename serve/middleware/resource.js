const { classify } = require('inflection')

module.exports = () => {
    return (req, res, next) => {
        try {
            const resourceName = classify(req.params.resource)
            req.Model = require(`../models/${resourceName}`)
            next()
        } catch (err) {
            next(err)
        }
    }
}
