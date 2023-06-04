module.exports = class Populate {
    static get Article() {
        return [
            {
                path: 'author',
                select: '-_id nickname avatar'
            },
            {
                path: 'tags',
                select: 'name'
            }
        ]
    }

    static get Tag() {
        return {
            path: 'articles',
            populate: Populate.Article
        }
    }
}
