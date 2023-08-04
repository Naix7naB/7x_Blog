import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 按需引入图标
import {
    faBlog as fasBlog,
    faHome as fasHome,
    faBook as fasBook,
    faImage as fasImage,
    faTags as fasTags,
    faMagnifyingGlass as fasMagnifyingGlass,
    faComments as fasComments,
    faPenToSquare as fasPenToSquare,
    faQuoteLeft as fasQuoteLeft,
    faQuoteRight as fasQuoteRight,
    faPlaneUp as fasPlaneUp,
    faCaretDown as fasCaretDown,
    faWindowMinimize as fasWindowMinimize,
    faXmark as fasXmark,
    faClock as fasClock,
    faBookOpen as fasBookOpen,
    faAngleRight as fasAngleRight,
    faCalendarDays as fasCalendarDays,
    faFire as fasFire,
    faHeart as fasHeart,
    faComment as fasComment,
    faTag as fasTag,
    faSliders as fasSliders
} from '@fortawesome/free-solid-svg-icons'

import {
    faStar as farStar,
    faFolderOpen as farFolderOpen
} from '@fortawesome/free-regular-svg-icons'

library.add([
    fasBlog,
    fasHome,
    fasBook,
    fasImage,
    fasTags,
    fasMagnifyingGlass,
    fasComments,
    fasPenToSquare,
    fasQuoteLeft,
    fasQuoteRight,
    fasPlaneUp,
    fasCaretDown,
    fasWindowMinimize,
    fasXmark,
    fasClock,
    fasBookOpen,
    fasAngleRight,
    fasCalendarDays,
    fasFire,
    fasHeart,
    fasComment,
    fasTag,
    fasSliders,
    farStar,
    farFolderOpen
])

Vue.component('fa-icon', FontAwesomeIcon)
