<template>
    <svg
        class="waves"
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
        <g class="parallax">
            <use xlink:href="#wave" x="50" y="0"></use>
            <use xlink:href="#wave" x="50" y="3"></use>
            <use xlink:href="#wave" x="50" y="6"></use>
            <use xlink:href="#wave" x="50" y="9"></use>
        </g>
    </svg>
</template>

<style lang="scss" scoped>
.waves {
    width: 100%;
    height: 100%;
}

.parallax > use {
    animation: wave cubic-bezier(.55,.5,.45,.5) infinite;

    @for $n from 0 through 3 {
        $color: $bg-theme;
        $alpha: ($n + 1) / ($n + 2);
        &:nth-of-type(#{$n + 1}) {
            @if $n == 3 {
                $alpha: 1
            }
            fill: rgba($color: $color, $alpha: $alpha);
            animation-delay: #{-2 - $n}s;
            animation-duration: #{6 * $n + $n + 3}s;
        }
    }
}

@keyframes wave {
    0% {
        transform: translateX(-90px);
    }

    100% {
        transform: translateX(85px);
    }
}
</style>
