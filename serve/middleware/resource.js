const createError = require('http-errors')
const { classify } = require('inflection')

module.exports = () => {
    return (req, res, next) => {
        const resourceName = classify(req.params.resource)
        try {
            req.Model = require(`../models/${resourceName}`)
            next()
        } catch (err) {
            next(createError(err))
        }
    }
}
