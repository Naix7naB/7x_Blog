module.exports = class ResourceBody {
    static Website(uid, data) {
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

    static Classify(uid, data) {
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
