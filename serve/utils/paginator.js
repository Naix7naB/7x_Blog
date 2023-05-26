const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')

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
        condition = {},
        populate = {},
        options = {}
    }) {
        if (typeof condition === 'string') {
            condition = qs.parse(condition)
        }
        if (condition.q) {
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
            .page(page)
            .size(size)
            .display(dis)
            .find(condition)
            .populate(populate)
            .select(options)
            .exec()
    }
}
