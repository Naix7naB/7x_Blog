<script>
export default {
    functional: true,
    name: 'Loading',
    render(h, ctx) {
        const LoadingIcon = h('span', {
            class: 'loading-icon'
        }, [
            h('fa-icon', {
                props: {
                    icon: ['fas', 'spinner'],
                    size: '2x',
                    spin: true
                }
            })
        ])

        return h('div', {
            class: 'loading-overlay'
        }, [LoadingIcon])
    }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
}

.loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}
</style>
