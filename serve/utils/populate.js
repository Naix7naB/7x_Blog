module.exports = class Populate {
    static get Article() {
        return {
            path: 'author',
            select: 'nickname avatar'
        }
    }
}
