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
            if (data[field] instanceof Array) {
                data[field].forEach(val => {
                    MultipleForm.pushParam(`${field}[]`, val)
                })
            } else {
                MultipleForm.pushParam(field, data[field])
            }
        }
        return MultipleForm.PARAMS
    }
}
