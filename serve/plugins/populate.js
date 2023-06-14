module.exports = class Populate {
    static get Article() {
        return [
            {
                path: 'author',
                select: 'nickname avatar'
            },
            {
                path: 'tags',
                select: 'name color'
            }
        ]
    }

    static get Tag() {
        return [
            {
                path: 'creator',
                select: 'nickname avatar'
            },
            {
                path: 'articles',
                populate: Populate.Article
            }
        ]
    }
}
