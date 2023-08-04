import store from '@/store'

const registerData = {
    username: '',
    nickname: '',
    password: '',
    email: '',
    role: store.getters['user/getRole']
}

const registerItems = [
    {
        type: 'input',
        prop: 'username',
        icon: 'user',
        placeholder: '输入用户名',
        rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'nickname',
        icon: 'poo',
        placeholder: '输入昵称',
        rules: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'email',
        icon: 'envelope',
        placeholder: '输入邮箱',
        rules: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
    },
    {
        type: 'password',
        prop: 'password',
        icon: 'lock',
        placeholder: '输入密码',
        rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    }
]

export { registerData, registerItems }
