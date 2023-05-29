export default class MultipleForm {
    static PARAMS = []
    static pushParam(key, val) {
        MultipleForm.PARAMS.push({
            field: key,
            value: val
        })
    }

    static format(data) {
        const keys = Object.keys(data)
        for (const field of keys) {
            const item = data[field]
            if (item instanceof Array) {
                item.forEach(val => {
                    MultipleForm.pushParam(`${field}[]`, val)
                })
            } else {
                MultipleForm.pushParam(field, item)
            }
        }
        return MultipleForm.PARAMS
    }

    static reset() {
        MultipleForm.PARAMS = []
    }
}
