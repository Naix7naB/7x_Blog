const Classify = require('../models/Classify')
const Tag = require('../models/Tag')

module.exports = {
    Article: [
        {
            _model_: Classify,
            action: 'findByIdAndUpdate',
            condition(res) {
                if (!res.classify) return null
                return res.classify.origin
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
            _model_: Classify,
            action: 'findByIdAndUpdate',
            condition(res) {
                if (!res.classify) return null
                return res.classify.current
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
