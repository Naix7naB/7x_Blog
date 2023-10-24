const qs = require('qs')
const mongoPagination = require('mongoose-sex-page')
const Populate = require('../plugins/populate')
const { isEmptyObj } = require('../utils/helpers')

module.exports = class Paginator {
    /**
     * @description: 处理查询条件
     * @param {Object} condition 请求的condition字段
     * @param {Object} query 请求的query字段
     * @return {Object} 处理后的查询条件
     */
    static handleFilter(condition, query) {
        if (isEmptyObj(condition) && isEmptyObj(query)) return {}
        condition = qs.parse(condition)
        query = qs.parse(query)
        if (!isEmptyObj(condition) && condition.q) {
            const regexp = new RegExp(condition.q, 'gi')
            condition = {
                ...condition,
                $or: [
                    { title: { $regex: regexp } },
                    { description: { $regex: regexp } },
                    { content: { $regex: regexp } }
                ]
            }
            delete condition.q
        }
        if (!isEmptyObj(query)) {
            const excludes = ['role', 'category', 'tags', 'published', 'created_at']
            query = Object.entries(query).reduce((prev, [key, val]) => {
                let pattern = val
                if (!excludes.includes(key)) {
                    const regexp = new RegExp(val, 'gi')
                    pattern = { $regex: regexp }
                }
                prev[key] = pattern
                return prev
            }, {})
        }
        return Object.assign(condition, query)
    }

    /**
     * @description: 处理数据库字段自动填充
     * @param {import('mongoose').Model} model mogoose数据模型
     * @param {import('mongoose').PopulateOptions} populate 需要处理的填充字段
     * @return {import('mongoose').PopulateOptions} 返回处理后的填充字段
     */
    static handleFill(model, populate) {
        if (typeof populate === 'string' && !populate) return null
        if (typeof populate === 'undefined' || (typeof populate === 'object' && !populate))
            return Populate[model.modelName]
        return populate
    }

    // 不分页查询
    static infinity({ model, filter, sort, fill, select }) {
        return mongoPagination(model).find(filter).sort(sort).populate(fill).select(select).infinite(true).exec()
    }

    // 分页查询
    static paging({ model, filter, page, size, dis, sort, fill, select }) {
        return mongoPagination(model)
            .find(filter)
            .sort(sort)
            .populate(fill)
            .select(select)
            .page(page)
            .size(size)
            .display(dis)
            .exec()
    }

    static exec({
        model,
        condition = {},
        query = {},
        page = null,
        size = 10,
        dis = null,
        sort = null,
        populate = null,
        select = null
    }) {
        const filter = Paginator.handleFilter(condition, query)
        const fill = Paginator.handleFill(model, populate)
        return typeof page === 'object' && page === null
            ? Paginator.infinity({ model, filter, sort, fill, select })
            : Paginator.paging({ model, filter, page, size, dis, sort, fill, select })
    }
}
