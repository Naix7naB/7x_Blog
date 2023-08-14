module.exports = {
    toJSON: { getters: true },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        currentTime: () => Math.floor(Date.now() / 1000)
    },
    versionKey: false
}
