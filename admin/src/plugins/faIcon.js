import Vue from 'vue'

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
    faPoo,
    faEnvelope,
    faLink,
    faFilePen,
    faPenToSquare,
    faBell,
    faArrowRightFromBracket,
    faPlus
} from '@fortawesome/free-solid-svg-icons'

library.add([
    faHouse,
    faUser,
    faUserGroup,
    faChartLine,
    faAustralSign,
    faCommentDots,
    faLock,
    faPoo,
    faEnvelope,
    faLink,
    faFilePen,
    faPenToSquare,
    faBell,
    faArrowRightFromBracket,
    faPlus
])

Vue.component('fa-icon', FontAwesomeIcon)
