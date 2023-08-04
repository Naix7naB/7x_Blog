const loginData = {
    username: '',
    password: ''
}

const loginItems = [
    {
        type: 'text',
        prop: 'username',
        icon: 'user',
        placeholder: '输入用户名',
        clearable: true,
        rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    {
        type: 'password',
        prop: 'password',
        icon: 'lock',
        placeholder: '输入密码',
        showPassword: true,
        rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    }
]

export { loginData, loginItems }
