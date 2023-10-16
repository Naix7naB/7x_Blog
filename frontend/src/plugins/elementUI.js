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
    Notification
} from 'element-ui'

export default {
    components: [
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
    ],
    others: [Message, Notification]
}
