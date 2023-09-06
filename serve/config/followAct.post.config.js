const Classify = require('../models/Classify')
const Tag = require('../models/Tag')
const Website = require('../models/Website')

module.exports = {
    Article: [
        {
            _model_: Classify,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.classify
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
        },
        {
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        article_count: 1
                    }
                }
            }
        }
    ],
    Classify: [
        {
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        classify_count: 1
                    }
                }
            }
        }
    ],
    Tag: [
        {
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        tag_count: 1
                    }
                }
            }
        }
    ]
}
