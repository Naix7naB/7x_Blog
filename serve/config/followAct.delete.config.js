const Tag = require('../models/Tag')

module.exports = {
    Article: {
        _model_: Tag,
        filter(res) {
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
        action: 'updateMany',
        opt(aid) {
            return {
                $pull: {
                    articles: aid
                }
            }
        }
    }
}
