module.exports = class Populate {
    static get Website() {
        return [
            {
                path: 'host',
                select: '-role'
            }
        ]
    }

    static get User() {
        return [
            {
                path: 'role',
                select: 'name label'
            }
        ]
    }

    static get Role() {
        return [
            {
                path: 'creator',
                select: 'username nickname'
            },
            {
                path: 'includes',
                select: 'username nickname'
            }
        ]
    }

    static get Article() {
        return [
            {
                path: 'author',
                select: 'nickname avatar'
            },
            {
                path: 'classify',
                select: 'name'
            },
            {
                path: 'tags',
                select: 'name color'
            }
        ]
    }

    static get Classify() {
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

    static get Comment() {
        return [
            {
                path: 'reviewer',
                select: 'nickname avatar'
            },
            {
                path: 'replies',
                populate: [
                    {
                        path: 'reviewer',
                        select: 'nickname avatar'
                    },
                    {
                        path: 'mention',
                        select: 'nickname avatar'
                    }
                ]
            }
        ]
    }
}
