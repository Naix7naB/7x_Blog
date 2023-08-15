module.exports = {
    POST: {
        User: {
            permission: ['root']
        },
        Role: {
            permission: ['root']
        },
        Article: {
            permission: ['root', 'admin']
        },
        Classify: {
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
        Classify: {
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
        Classify: {
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
