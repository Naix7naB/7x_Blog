const registerData = {
    username: '',
    nickname: '',
    password: '',
    email: '',
    role: 'user'
}

const registerItems = [
    {
        type: 'input',
        prop: 'username',
        placeholder: '输入用户名',
        rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'nickname',
        placeholder: '输入昵称',
        rules: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'email',
        placeholder: '输入邮箱',
        rules: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
    },
    {
        type: 'password',
        prop: 'password',
        placeholder: '输入密码',
        rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    }
]

export { registerData, registerItems }
