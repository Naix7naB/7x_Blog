module.exports = {
    PUT: {
        Article: {
            authField: 'author',
            revisableFields: ['title', 'description', 'tags', 'cover_img', 'content', 'state']
        },
        Tag: {
            authField: 'creator',
            revisableFields: ['name', 'color']
        }
    },
    DELETE: {
        Article: {
            authField: 'author'
        },
        Tag: {
            authField: 'creator'
        }
    }
}
