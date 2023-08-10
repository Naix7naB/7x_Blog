module.exports = class ResourceBody {
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
}
