const Tag = require('../models/Tag')

module.exports = {
    Article: [
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                return {
                    _id: {
                        $in: res.tags
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
