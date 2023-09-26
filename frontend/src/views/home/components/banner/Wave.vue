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
            <use xlink:href="#wave" x="50" y="5"></use>
        </g>
    </svg>
</template>

<style lang="scss" scoped>
.waves {
    width: 100%;
    height: 100%;
}

.parallax > use {
    transition: fill .3s ease-in-out;
    animation: wave cubic-bezier(.55, .5, .45, .5) infinite;

    @for $n from 0 through 2 {
        &:nth-of-type(#{$n + 1}) {
            @include fill-color(bg-theme, calc((60 + 5 * $n) / 100));
            animation-delay: #{-2 - $n}s;
            animation-duration: #{5 * $n + $n + 3}s;
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
