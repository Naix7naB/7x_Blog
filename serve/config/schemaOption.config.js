module.exports = {
    toJSON: {
        getters: true,
        transform(doc, ret) {
            delete ret._id
        }
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        currentTime: () => Date.now()
    },
    versionKey: false
}
