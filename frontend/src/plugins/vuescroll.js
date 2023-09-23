import vuescroll from 'vuescroll'

const config = {
    name: 'vuescroll',
    ops: {
        vuescroll: {
            mode: 'native',
            detectResize: true,
            paging: false,
            zooming: false,
            wheelDirectionReverse: true,
            wheelScrollDuration: 0,
            locking: true
        },
        scrollPanel: {
            scrollingX: false,
            scrollingY: true,
            speed: 500,
            easing: 'easeInOutCubic'
        },
        rail: {
            keepShow: false,
            opacity: 0,
            background: '#255f86'
        },
        bar: {
            keepShow: false,
            onlyShowBarOnScroll: true,
            background:
                '#2297e5 linear-gradient(45deg, rgba(255,255,255,.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.3) 75%, transparent 75%, transparent)'
        },
        scrollButton: {
            enable: false
        }
    }
}

export { vuescroll, config }
