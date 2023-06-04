module.exports = class FollowAction {
    static get ARTICLE() {
        return {
            GET: {
                action: 'findByIdAndUpdate',
                opt: {
                    $inc: {
                        view_num: 1
                    }
                }
            },
            POST: {},
            PUT: {},
            DELETE: {}
        }
    }

    static hasFollowAct(modelName, method) {
        modelName = modelName.toUpperCase()
        const resource = FollowAction[modelName] || null
        if (!resource) return false
        if (JSON.stringify(resource[method]) === '{}') return false
        return true
    }

    static getAction(modelName, method) {
        modelName = modelName.toUpperCase()
        return FollowAction[modelName][method]
    }
}
