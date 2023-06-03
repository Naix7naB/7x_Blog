const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')

const Populate = require('./populate')

module.exports = class Paginator {
    static get PAGE() {
        return 1
    }
    static get SIZE() {
        return 5
    }

    static paging({
        model,
        page = Paginator.PAGE,
        size = Paginator.SIZE,
        dis = undefined,
        condition = null,
        populate = null,
        select = null
    }) {
        if (!populate) {
            populate = Populate[model.modelName]
        }
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
        return mongoPagination(model)
            .find(condition)
            .populate(populate)
            .select(select)
            .page(page)
            .size(size)
            .display(dis)
            .exec()
    }
}
