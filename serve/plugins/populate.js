module.exports = class Populate {
    static get Site() {
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
                path: 'category',
                select: 'name'
            },
            {
                path: 'tags',
                select: 'name color'
            }
        ]
    }

    static get Category() {
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
                path: 'mention',
                select: 'nickname avatar'
            }
        ]
    }
}
