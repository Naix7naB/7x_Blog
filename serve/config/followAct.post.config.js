const Tag = require('../models/Tag')

module.exports = {
    Article: {
        _model_: Tag,
        action: 'updateMany',
        condition(res) {
            return res.tags.reduce(
                (f, t) => {
                    f.$or.push({
                        _id: t
                    })
                    return f
                },
                { $or: [] }
            )
        },
        opt(aid) {
            return {
                $push: {
                    articles: aid
                }
            }
        }
    }
}
