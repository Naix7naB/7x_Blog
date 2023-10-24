const web = {
    data: {
        name: '',
        logo: '',
        summary: '',
        bulletin: '',
        background: '',
        record_num: ''
    },
    items: [
        {
            type: 'upload',
            prop: 'logo',
            label: '网站Logo',
            others: {
                name: 'logo',
                multiple: false
            }
        },
        {
            type: 'upload',
            prop: 'background',
            label: '网站背景',
            others: {
                name: 'background',
                multiple: false
            }
        },
        {
            type: 'input',
            prop: 'name',
            label: '网站名称',
            placeholder: '请输入网站名称',
            rules: [{ required: true, message: '网站名称不能为空', trigger: 'blur' }]
        },
        {
            type: 'input',
            prop: 'summary',
            label: '网站摘要',
            placeholder: '请输入网站摘要',
            rules: [{ required: true, message: '网站摘要不能为空', trigger: 'blur' }]
        },
        {
            type: 'input',
            prop: 'bulletin',
            label: '网站公告',
            placeholder: '请输入网站公告'
        },
        {
            type: 'input',
            prop: 'record_num',
            label: '备案号',
            placeholder: '请输入备案号',
            rules: [{ required: true, message: '备案号不能为空', trigger: 'blur' }]
        }
    ]
}

const host = {
    data: {
        avatar: '',
        nickname: '',
        about_me: ''
    },
    items: [
        {
            type: 'upload',
            prop: 'avatar',
            label: '站长头像',
            disabled: true,
            others: {
                name: 'avatar',
                multiple: false
            }
        },
        {
            type: 'input',
            prop: 'nickname',
            label: '站长昵称',
            disabled: true
        },
        {
            type: 'slot',
            slotName: 'editor',
            prop: 'about_me',
            label: '关于我'
        }
    ]
}

export { web, host }
