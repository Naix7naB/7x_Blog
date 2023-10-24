import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 按需引入图标
import {
    faHouse,
    faUser,
    faUserGroup,
    faChartLine,
    faAustralSign,
    faCommentDots,
    faLock,
    faUnlock,
    faFaceSmile,
    faEnvelope,
    faFilePen,
    faPenToSquare,
    faBell,
    faArrowRightFromBracket,
    faPlus,
    faGear
} from '@fortawesome/free-solid-svg-icons'

library.add([
    faHouse,
    faUser,
    faUserGroup,
    faChartLine,
    faAustralSign,
    faCommentDots,
    faLock,
    faUnlock,
    faFaceSmile,
    faEnvelope,
    faFilePen,
    faPenToSquare,
    faBell,
    faArrowRightFromBracket,
    faPlus,
    faGear
])

export default {
    install(Vue) {
        Vue.component('fa-icon', FontAwesomeIcon)
    }
}
