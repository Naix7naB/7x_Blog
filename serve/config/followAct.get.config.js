module.exports = {
    Article: {
        action: 'findByIdAndUpdate',
        opt() {
            return {
                $inc: {
                    view_num: 1
                }
            }
        }
    }
}
