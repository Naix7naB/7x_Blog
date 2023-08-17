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
    <div class="article-recommend">
        <div class="article-recommend--label"><fa-icon icon="fas fa-book-open" /> 推荐文章</div>
        <ul>
            <li class="article-recommend--item">
                <el-image class="article-recommend--inset" :src="inset" fit="cover" />
                <div class="article-recommend--info">
                    <p class="article-info--title">推荐文章标题1;推荐文章标题1</p>
                    <p class="article-info--date"><fa-icon icon="fas fa-clock" /> 2023-07-22</p>
                </div>
            </li>
            <li class="article-recommend--item">
                <el-image class="article-recommend--inset" :src="inset" fit="cover" />
                <div class="article-recommend--info">
                    <p class="article-info--title">推荐文章标题2;推荐文章标题2</p>
                    <p class="article-info--date"><fa-icon icon="fas fa-clock" /> 2023-07-24</p>
                </div>
            </li>
            <li class="article-recommend--item">
                <el-image class="article-recommend--inset" :src="inset" fit="cover" />
                <div class="article-recommend--info">
                    <p class="article-info--title">推荐文章标题3;推荐文章标题3</p>
                    <p class="article-info--date"><fa-icon icon="fas fa-clock" /> 2023-07-18</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 推荐文章卡片样式 */
.article-recommend--item {
    display: flex;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 20px;
    }
}

.article-recommend--label {
    margin-bottom: 20px;
    font-size: $fz-medium-x;
}

.article-recommend--inset {
    flex-shrink: 0;
    width: calc(40% - 10px);
    margin-right: 10px;
    border-radius: 4px;
}

.article-recommend--info {
    width: 60%;
    font-size: $fz-medium;
}

.article-info--title,
.article-info--date {
    @include nowrap();
}

.article-info--date {
    margin-top: 12px;
    font-size: $fz-small-s;
}
</style>
