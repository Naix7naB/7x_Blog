const Category = require('../models/Category')
const Tag = require('../models/Tag')

module.exports = {
    Article: [
        {
            _model_: Category,
            action: 'findByIdAndUpdate',
            condition(res) {
                if (!res.category) return null
                return res.category.origin
            },
            opt(aid) {
                return {
                    $pull: {
                        articles: aid
                    }
                }
            }
        },
        {
            _model_: Category,
            action: 'findByIdAndUpdate',
            condition(res) {
                if (!res.category) return null
                return res.category.current
            },
            opt(aid) {
                return {
                    $push: {
                        articles: aid
                    }
                }
            }
        },
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                if (!res.tags) return null
                return {
                    _id: {
                        $in: res.tags.origin
                    }
                }
            },
            opt(aid) {
                return {
                    $pull: {
                        articles: aid
                    }
                }
            }
        },
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                if (!res.tags) return null
                return {
                    _id: {
                        $in: res.tags.current
                    }
                }
            },
            opt(aid) {
                return {
                    $push: {
                        articles: aid
                    }
                }
            }
        }
    ]
}
