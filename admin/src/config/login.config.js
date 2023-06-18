const loginData = {
    username: '',
    password: ''
}

const loginItems = [
    {
        type: 'slot',
        slotName: 'title',
        position: 'center'
    },
    {
        type: 'input',
        prop: 'username',
        icon: 'user',
        placeholder: '输入用户名',
        rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    {
        type: 'password',
        prop: 'password',
        icon: 'lock',
        placeholder: '输入密码',
        rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    },
    {
        type: 'opt',
        position: 'center'
    }
]

export { loginData, loginItems }
