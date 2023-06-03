const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')

const Populate = require('../plugins/populate')

module.exports = class Paginator {
    static paging({
        model = null,
        page = 1,
        size = 5,
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
