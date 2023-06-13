const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: [true, '用户名不能为空'],
            validate: {
                validator(val) {
                    return /^(?!\d+)[\u4e00-\u9fa5a-zA-Z0-9_-]{4,16}$/.test(val)
                },
                message: '用户名4-16位(包括汉字、字母、数字、_-, 不能为纯数字)'
            }
        },
        password: {
            type: String,
            require: [true, '密码不能为空'],
            select: false,
            validate: {
                validator(val) {
                    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s\S]{6,}$/.test(val)
                },
                message: '密码最少6位(包括至少1个大写字母、1个小写字母、1个数字)'
            }
        },
        email: {
            type: String,
            unique: true,
            default: `email${new Date().getTime()}@email.com`,
            validate: {
                validator(val) {
                    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
                },
                message: '请输入合法邮箱地址'
            }
        },
        avatar: {
            type: String,
            default: ''
        },
        nickname: {
            type: String,
            require: [true, '昵称不能为空'],
            validate: {
                validator(val) {
                    return /^[\w\W\u4e00-\u9fa5]{2,12}$/.test(val)
                },
                message: '昵称2-12位(不能包含非法符号)'
            }
        },
        role: {
            ref: 'Role',
            type: mongoose.SchemaTypes.ObjectId
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('User', schema)
