import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// 按需引入组件
import {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    Button,
    Avatar,
    Image,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Empty,
    Loading,
    Message,
    Notification
} from 'element-ui'

export default {
    components: [
        Row,
        Col,
        Form,
        FormItem,
        Input,
        Button,
        Avatar,
        Image,
        Collapse,
        CollapseItem,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Empty,
        Loading.directive
    ],
    others: [Message, Notification]
}
