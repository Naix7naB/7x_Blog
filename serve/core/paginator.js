const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')

const Populate = require('../plugins/populate')

module.exports = class Paginator {
    static handleCondition(condition) {
        if (typeof condition === 'undefined') return null
        if (typeof condition === 'string') {
            condition = qs.parse(condition)
        }
        if (condition && condition.q) {
            const regexp = new RegExp(condition.q, 'gi')
            condition = {
                $or: [
                    { title: { $regex: regexp } },
                    { desciption: { $regex: regexp } },
                    { content: { $regex: regexp } }
                ]
            }
        }
        return condition
    }

    static handlePopulate(populate, model) {
        if (typeof populate === 'string' && !populate) return null
        if (typeof populate === 'undefined' || (typeof populate === 'object' && !populate))
            return Populate[model.modelName]
        return populate
    }

    static unpaging({ model, condition, sort = null, populate = null, select = null }) {
        condition = Paginator.handleCondition(condition)
        populate = Paginator.handlePopulate(populate, model)
        return model.find(condition).sort(sort).populate(populate).select(select).exec()
    }

    static paging({ model, condition, page, size = 10, dis = null, sort = null, populate = null, select = null }) {
        condition = Paginator.handleCondition(condition)
        populate = Paginator.handlePopulate(populate, model)
        return mongoPagination(model)
            .find(condition)
            .sort(sort)
            .populate(populate)
            .select(select)
            .page(page)
            .size(size)
            .display(dis)
            .exec()
    }
}
