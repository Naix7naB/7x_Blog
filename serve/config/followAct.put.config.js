const Tag = require('../models/Tag')

module.exports = {
    Article: [
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                if (!res.tags?.origin) return {}
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
                if (!res.tags?.current) return {}
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
