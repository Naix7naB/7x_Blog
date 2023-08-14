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
        currentTime: () => Math.floor(Date.now() / 1000)
    },
    versionKey: false
}
