const assert = require('http-assert')
const createError = require('http-errors')
const { classify } = require('inflection')

module.exports = () => {
    return (req, res, next) => {
        try {
            const resourceName = classify(req.params.resource)
            assert.notEqual(resourceName, 'Site', 404)
            req.Model = require(`../models/${resourceName}`)
            next()
        } catch (err) {
            next(createError(404))
        }
    }
}
