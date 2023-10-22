import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// 按需引入组件
import {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    RadioGroup,
    Radio,
    Button,
    Upload,
    Avatar,
    Image,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Empty,
    Loading,
    Message,
    MessageBox,
    Notification
} from 'element-ui'

const components = [
    Row,
    Col,
    Form,
    FormItem,
    Input,
    RadioGroup,
    Radio,
    Button,
    Upload,
    Avatar,
    Image,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Empty,
    Loading.directive
]

const others = {
    message: Vue => {
        Vue.prototype.$message = Message
    },
    notification: Vue => {
        Vue.prototype.$notify = Notification
    },
    messageBox: Vue => {
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$prompt = MessageBox.prompt
    }
}

export default {
    install(Vue) {
        components.forEach(cmp => {
            Vue.use(cmp)
        })
        Object.keys(others).forEach(key => {
            others[key](Vue)
        })
    }
}
