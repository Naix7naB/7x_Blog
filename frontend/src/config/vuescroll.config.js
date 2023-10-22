export default {
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
        opacity: 0
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
