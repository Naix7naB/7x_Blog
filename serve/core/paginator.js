const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')

const Populate = require('../plugins/populate')
const { isEmptyObj } = require('../utils/helpers')

module.exports = class Paginator {
    static handleCondition(condition = {}, query = {}) {
        condition = qs.parse(condition)
        query = qs.parse(query)
        if (query && !isEmptyObj(query)) {
            query = {
                $or: Object.entries(query).map(([key, val]) => {
                    const regexp = new RegExp(val, 'gi')
                    return {
                        [key]: { $regex: regexp }
                    }
                })
            }
        }
        return Object.assign(condition, query)
    }

    static handlePopulate(populate, model) {
        if (typeof populate === 'string' && !populate) return null
        if (typeof populate === 'undefined' || (typeof populate === 'object' && !populate))
            return Populate[model.modelName]
        return populate
    }

    static unpaging({ model, condition, query, sort = null, populate = null, select = null }) {
        condition = Paginator.handleCondition(condition, query)
        populate = Paginator.handlePopulate(populate, model)
        return model.find(condition).sort(sort).populate(populate).select(select).exec()
    }

    static paging({
        model,
        condition,
        query,
        page,
        size = 10,
        dis = null,
        sort = null,
        populate = null,
        select = null
    }) {
        condition = Paginator.handleCondition(condition, query)
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
