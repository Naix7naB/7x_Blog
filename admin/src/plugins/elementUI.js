import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import {
    Aside,
    Header,
    Main,
    Footer,
    Container,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    Badge,
    Image,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Card,
    Pagination,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Upload,
    Button,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    DatePicker,
    Switch,
    Tag,
    ColorPicker,
    Descriptions,
    DescriptionsItem,
    Dialog,
    Drawer,
    Empty,
    Loading,
    Message,
    MessageBox,
    Notification
} from 'element-ui'

const components = [
    Aside,
    Header,
    Main,
    Footer,
    Container,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    Badge,
    Image,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Card,
    Pagination,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Upload,
    Button,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    DatePicker,
    Switch,
    Tag,
    ColorPicker,
    Descriptions,
    DescriptionsItem,
    Dialog,
    Drawer,
    Empty,
    Loading.directive
]

const others = {
    loading: Vue => {
        Vue.prototype.$loading = Loading.service
    },
    message: Vue => {
        Vue.prototype.$message = Message
    },
    messageBox: Vue => {
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$prompt = MessageBox.prompt
    },
    notification: Vue => {
        Vue.prototype.$notify = Notification
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
