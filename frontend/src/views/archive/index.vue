<script>
import { getArticlesAndSortedByDate, getArticleInfoById } from '@/apis/article'
import { formatDate, goToPath } from '@/utils/util'
import { isEmpty } from 'lodash-es'

export default {
    name: 'ArchivePage',
    data() {
        return {
            archives: [],
            activeNames: []
        }
    },
    computed: {
        condition() {
            return isEmpty(this.$route.query) ? null : {
                created_at: {
                    $gte: this.$route.query.start,
                    $lt: this.$route.query.end
                }
            }
        },
        archiveTitle() {
            return archive => {
                return archive.label + ' - 共' + archive.articles.length + '篇'
            }
        }
    },
    methods: {
        formatDate,
        async toArticleDetail(aid) {
            try {
                const { data } = await getArticleInfoById(aid)
                this.$store.dispatch('article/setArticleInfo', data)
                goToPath({ target: 'Article', params: { aid } })
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        }
    },
    created() {
        getArticlesAndSortedByDate(this.condition).then(({ data }) => {
            data.list.forEach(item => {
                const label = formatDate(item.created_at, 'YYYY年MM月')
                const idx = this.archives.findIndex(archive => archive.label === label)
                if (idx === -1) {
                    this.activeNames.push(label)
                    this.archives.push({
                        label,
                        articles: [item]
                    })
                } else {
                    this.archives[idx]['articles'].push(item)
                }
            })
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="archive-main">
        <el-collapse v-model="activeNames">
            <el-collapse-item
                v-for="archive in archives"
                :key="archive.label"
                :name="archive.label"
                :title="archiveTitle(archive)"
            >
                <div class="archive-article" v-for="article in archive.articles" :key="article.id">
                    <div class="archive-article--label">
                        <fa-icon icon="fas fa-calendar-days" />
                        <span style="margin-left: 6px;">
                            {{ formatDate(article.created_at, 'YYYY/MM/DD') }}
                        </span>
                    </div>
                    <div class="archive-article--content" @click="toArticleDetail(article.id)">
                        <el-image fit="cover" :src="article.cover_img" lazy />
                        <div class="archive-article--info">
                            <p>{{ article.title }}</p>
                            <p>{{ article.description }}</p>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
.archive-article--content > :deep(.el-image) {
    width: 20%;
    min-width: 120px;
}

.archive-article--content > :deep(.el-image .el-image__inner) {
    border-radius: 4px;
    aspect-ratio: 16 / 9;
}

/* 归档页面样式 */
.archive-main {
    width: 75%;
    margin: auto;
}

.archive-article:not(:first-of-type) {
    padding-top: 20px;
}

.archive-article:hover .archive-article--content {
    color: $cl-lightblue;
}

.archive-article--label {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
}

.archive-article--content {
    display: flex;
    padding-left: 20px;
    transition: color .3s ease;
    cursor: pointer;
}

.archive-article--info {
    overflow: hidden;
    width: 80%;
    padding: 0 10px;
}

.archive-article--info p {
    @include nowrap();
}

/* 媒体查询样式 */
@media screen and (max-width: 1000px) {
    .archive-main {
        width: 100%;
    }
}
</style>
