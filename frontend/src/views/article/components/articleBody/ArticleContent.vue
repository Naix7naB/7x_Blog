<script>
import MarkButton from '@/components/markButton'

import { changeLikeState } from '@/apis/article'
import { formatDate } from '@/utils/util'
import { cloneDeep } from 'lodash-es'

export default {
    name: 'ArticleContent',
    components: { MarkButton },
    data() {
        return {
            prevIsLike: false,
            viewerOption: {
                fullscreen: false,
                navbar: false,
                title: false,
                tooltip: false,
                toolbar: {
                    prev: true,
                    zoomIn: true,
                    zoomOut: true,
                    reset: true,
                    rotateLeft: true,
                    rotateRight: true,
                    next: true
                }
            }
        }
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        articleInfo() {
            return this.$store.getters.articleInfo
        },
        isLike() {
            return this.articleInfo.like_users.includes(this.uid)
        }
    },
    methods: {
        formatDate,
        /* 点击点赞图标触发事件 */
        onClick() {
            const msg = this.isLike ? '取消点赞' : '点赞成功'
            const info = this.isLike ? this.unlike() : this.like()
            this.$store.dispatch('article/setArticleInfo', info)
            this.$message.success(msg)
        },
        /* 点赞文章 */
        like() {
            const info = cloneDeep(this.articleInfo)
            info.like_users.push(this.uid)
            info.like_count++
            return info
        },
        /* 取消点赞 */
        unlike() {
            const info = cloneDeep(this.articleInfo)
            const idx = info.like_users.findIndex(uid => uid === this.uid)
            info.like_users.splice(idx, 1)
            info.like_count--
            return info
        }
    },
    created() {
        // 记录初始点赞状态
        this.prevIsLike = this.isLike
    },
    beforeDestroy() {
        // 离开页面时, 判断文章的点赞状态是否改变
        // 点赞状态改变则发送请求修改数据库数据, 未改变则无动作
        if (this.prevIsLike === this.isLike) return false
        changeLikeState(this.articleInfo.id).then(() => {}).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="article-content">
        <article class="markdown-body" v-highlight="articleInfo?.content" v-image-preview />
        <p class="article-content--updated">
            <span>文章最后更新于</span>
            <span>{{ formatDate(articleInfo?.updated_at) }}</span>
        </p>
        <div class="article-content--mark">
            <MarkButton type="category" :item="articleInfo.category" />
            <MarkButton type="tag" v-for="tag in articleInfo?.tags" :key="tag.id" :item="tag" />
        </div>
        <div class="article-content--copyright">
            <p>作者：{{ articleInfo?.author.nickname }}</p>
            <p>版权声明：转载请注明文章出处</p>
        </div>
        <div class="article-content--like">
            <fa-icon :icon="[isLike ? 'fas' : 'far', 'thumbs-up']" size="5x" @click="onClick" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-content > * {
    margin-bottom: 32px;
}

.article-content--updated {
    @include text-color(text-muted);
    font-size: $fz-xs;
    border-left: 2px solid $cl-lightgreen;
    transition: color .3s ease-in-out;
}

.article-content--updated > span {
    padding-left: 8px;
}

.article-content--mark {
    text-align: right;
}

.article-content--copyright {
    margin-bottom: 54px;
    padding: 10px 20px;
    line-height: $lh-2x;
    border-radius: 4px;
    border-left: 3px solid $cl-lightblue;
    color: $cl-dark-7;
    background-color: rgb(223, 238, 248);
}

.article-content--like {
    text-align: center;

    & > svg {
        cursor: pointer;
    }
}
</style>
