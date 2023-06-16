module.exports = {
    PUT: {
        Role: {
            authField: 'creator',
            revisableFields: ['name', 'label']
        },
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
        Role: {
            authField: 'creator'
        },
        Article: {
            authField: 'author'
        },
        Tag: {
            authField: 'creator'
        }
    }
}
