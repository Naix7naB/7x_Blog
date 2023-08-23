import vuescroll from 'vuescroll'

const config = {
    name: 'v-scroll',
    ops: {
        vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            renderMethod: 'position',
            detectResize: false,
            paging: false,
            zooming: false,
            wheelDirectionReverse: true,
            locking: true
        },
        scrollPanel: {
            scrollingX: false,
            scrollingY: true,
            easing: 'easeInOutCubic'
        },
        rail: {
            opacity: 0
        },
        bar: {
            keepShow: false,
            onlyShowBarOnScroll: true,
            background:
                '#49b1f5 linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent)'
        },
        scrollButton: {
            enable: false
        }
    }
}

export { vuescroll, config }
