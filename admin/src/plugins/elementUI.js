import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import Vue from 'vue'
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

Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Badge)
Vue.use(Image)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(ColorPicker)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(Empty)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
