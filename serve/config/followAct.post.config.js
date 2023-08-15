const Article = require('../models/Article')
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
                    id: {
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
                        article_num: 1
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
                        classify_num: 1
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
                        tag_num: 1
                    }
                }
            }
        }
    ],
    Comment: [
        {
            _model_: Article,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.aid
            },
            opt(cid) {
                return {
                    $inc: {
                        comment_num: 1
                    },
                    $push: {
                        comments: cid
                    }
                }
            }
        }
    ]
}
