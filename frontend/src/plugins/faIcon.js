import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 按需引入图标
import {
    faBlog,
    faBars,
    faHome,
    faBook,
    faImage,
    faTags,
    faMagnifyingGlass,
    faComments,
    faPenToSquare,
    faQuoteLeft,
    faQuoteRight,
    faPlaneUp,
    faCaretDown,
    faWindowMinimize,
    faXmark,
    faClock
} from '@fortawesome/free-solid-svg-icons'

library.add([
    faBlog,
    faBars,
    faHome,
    faBook,
    faImage,
    faTags,
    faMagnifyingGlass,
    faComments,
    faPenToSquare,
    faQuoteLeft,
    faQuoteRight,
    faPlaneUp,
    faCaretDown,
    faWindowMinimize,
    faXmark,
    faClock
])

Vue.component('fa-icon', FontAwesomeIcon)
