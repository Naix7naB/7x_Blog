module.exports = {
    POST: {
        Site: {
            permission: ['root']
        },
        User: {
            permission: ['root']
        },
        Role: {
            permission: ['root']
        },
        Article: {
            permission: ['root', 'admin']
        },
        Category: {
            permission: ['root', 'admin']
        },
        Tag: {
            permission: ['root', 'admin']
        },
        Comment: {
            permission: ['*']
        }
    },
    PUT: {
        Site: {
            authField: 'host',
            revisableFields: ['name', 'logo', 'background', 'summary', 'bulletin', 'about_me', 'record_num']
        },
        User: {
            authField: 'id',
            revisableFields: ['*']
        },
        Role: {
            authField: 'creator',
            revisableFields: ['name', 'label']
        },
        Article: {
            authField: 'author',
            revisableFields: ['*']
        },
        Category: {
            authField: 'creator',
            revisableFields: ['name']
        },
        Tag: {
            authField: 'creator',
            revisableFields: ['name', 'description', 'color']
        }
    },
    DELETE: {
        User: {
            authField: 'id'
        },
        Role: {
            authField: 'creator'
        },
        Article: {
            authField: 'author'
        },
        Category: {
            authField: 'creator'
        },
        Tag: {
            authField: 'creator'
        },
        Comment: {
            authField: 'reviewer'
        }
    }
}
