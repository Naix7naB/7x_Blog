<script>
import inset from '@/assets/images/inset.png'

export default {
    data() {
        return {
            inset
        }
    }
}
</script>

<template>
    <ul class="recent-article--wrapper">
        <li class="recent-article--item shadow-box" v-for="item in 6" :key="item">
            <div
                class="article-item--wrapper recent-article--image"
                :class="{ left: item % 2 === 1, right: item % 2 === 0 }"
            >
                <el-image :src="inset" fit="cover" />
            </div>
            <div
                class="article-item--wrapper recent-article--info"
                :class="{ left: item % 2 === 0, right: item % 2 === 1 }"
            >
                <div class="article-info--meta date">
                    <fa-icon icon="fas fa-calendar-days" /> 发布于 2023-07-22 20:16:27
                </div>
                <h3 class="article-info--title">文章标题;文章标题;文章标题</h3>
                <div class="article-info--meta data">
                    <span><fa-icon icon="fas fa-fire" /> 1021</span>
                    <span><fa-icon icon="fas fa-comment" /> 18</span>
                    <span><fa-icon icon="fas fa-heart" /> 32</span>
                </div>
                <p class="article-info--desc">
                    《百年孤独》，是哥伦比亚作家加西亚·马尔克斯创作的长篇小说，是其代表作，也是拉丁美洲魔幻现实主义文学的代表作，被誉为“再现拉丁美洲历史社会图景的鸿篇巨著”。
                </p>
                <div class="article-info--label">
                    <span class="article-label--item"><fa-icon icon="fas fa-tag" /> 新闻</span>
                    <span class="article-label--item"><fa-icon icon="fas fa-tag" /> 笔记</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image) {
    width: 100%;
    height: 100%;
}

:deep(.el-image__inner) {
    transform: scale(1);
    transition: transform .7s ease;
}

/* 最近文章样式 */
.recent-article--wrapper {
    width: 70%;
    max-width: 980PX;
}

.recent-article--item {
    overflow: hidden;
    position: relative;
    display: flex;
    height: 300PX;
    margin-bottom: 40PX;
    border-radius: 10PX;
    background-color: #24272d;
    cursor: pointer;

    &:hover :deep(.el-image__inner) {
        transform: scale(1.2);
    }
}

.article-item--wrapper {
    position: absolute;
    top: 0;
    height: 100%;

    &.left {
        left: 0;
    }

    &.right {
        right: 0;
        text-align: right;
    }

    &.right .article-info--label {
        right: 36PX;
    }
}

.recent-article--image {
    width: 40%;
}

.recent-article--info {
    width: 60%;
    padding: 24PX 36PX;
}

.article-info--meta {
    @include nowrap();
    font-size: $fz-small;

    &.data {
        margin-bottom: 14PX;
    }

    &.data>span:not(:first-of-type) {
        margin-left: 12PX;
    }
}

.article-info--title {
    @include nowrap();
    margin: 22PX 0;
    font-size: $fz-large;
}

.article-info--desc {
    @include nowrap-multiple(4);
    line-height: 1.5;
}

.article-info--label {
    position: absolute;
    bottom: 24PX;
}

.article-label--item {
    line-height: 20PX;
    padding: 2PX 12PX;
    border-radius: 3PX;
    font-size: $fz-small;
    color: #797979;
    background-color: #eeeeee;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-left: 12PX;
    }

    &:hover {
        background-color: orange;
        color: #ffffff;
    }
}

/* 媒体查询样式 */
@media screen and (max-width: 1100PX) {
    .recent-article--wrapper {
        width: 100%;
        max-width: 100%;
    }
}

@media screen and (max-width: 700px) {
    .recent-article--item {
        flex-direction: column;
        height: 500PX;
    }

    .article-item--wrapper {
        position: initial;
        width: 100%;

        &.right {
            text-align: initial;
        }
    }

    .recent-article--image {
        height: 200PX;
    }

    .recent-article--info {
        position: relative;
        height: 300PX;
    }

    .article-info--label {
        right: 36PX;
    }
}
</style>
