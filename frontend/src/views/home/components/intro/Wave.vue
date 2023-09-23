<template>
    <svg
        class="wave-container"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
    >
        <defs>
            <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            ></path>
        </defs>
        <g class="wave-parallax">
            <use xlink:href="#wave" x="50" y="0" fill="rgba(224,233,239,.5)"></use>
            <use xlink:href="#wave" x="50" y="3" fill="rgba(224,233,239,.5)"></use>
            <use xlink:href="#wave" x="50" y="6" fill="rgba(224,233,239,.5)"></use>
        </g>
    </svg>
</template>

<style lang="scss" scoped>
.wave-container {
    opacity: 0.8;
    width: 100%;
    height: 100%;
}

.wave-parallax > use {
    animation: wave-move linear infinite;

    @for $n from 0 through 2 {
        &:nth-of-type(#{$n + 1}) {
            animation-delay: #{-2 - 2 * $n}s;
            animation-duration: #{(12 - $n) - 4 * $n}s;
        }
    }
}

@keyframes wave-move {
    0% {
        transform: translateX(-90px);
    }

    100% {
        transform: translateX(85px);
    }
}
</style>
