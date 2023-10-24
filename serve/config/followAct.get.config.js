module.exports = {
    Article: {
        action: 'findByIdAndUpdate',
        opt() {
            return {
                $inc: {
                    view_count: 1
                }
            }
        }
    }
}
