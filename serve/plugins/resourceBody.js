module.exports = class ResourceBody {
    static Site(uid, data) {
        return {
            host: uid,
            ...data
        }
    }

    static Article(uid, data) {
        return {
            author: uid,
            ...data
        }
    }

    static Category(uid, data) {
        return {
            creator: uid,
            ...data
        }
    }

    static Tag(uid, data) {
        return {
            creator: uid,
            ...data
        }
    }

    static Comment(uid, data) {
        return {
            reviewer: uid,
            ...data
        }
    }
}
