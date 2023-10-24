<script>
import CountTo from 'vue-count-to'

import { getSiteInfo } from '@/apis/site'

export default {
    name: 'PanelGroup',
    components: { CountTo },
    props: {
        gutter: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            panels: [
                {
                    name: 'article',
                    prop: 'article_count',
                    text: '文章数',
                    icon: 'austral-sign',
                    value: 0,
                    path: '/article'
                },
                {
                    name: 'view',
                    prop: 'view_count',
                    text: '总访问量',
                    icon: 'chart-line',
                    value: 0,
                    path: ''
                },
                {
                    name: 'user',
                    prop: 'user_count',
                    text: '用户量',
                    icon: 'user-group',
                    value: 0,
                    path: '/user'
                },
                {
                    name: 'message',
                    prop: 'message_count',
                    text: '留言数',
                    icon: 'comment-dots',
                    value: 0,
                    path: '/news/message'
                }
            ]
        }
    },
    methods: {
        onPanelClick(panel) {
            if (panel.name === 'view') {
                this.$message.warning('功能暂未开放')
            } else {
                this.$router.push(panel.path)
            }
        }
    },
    created() {
        getSiteInfo().then(({ data }) => {
            const pickFields = ['user_count', 'article_count', 'message_count']
            pickFields.forEach(field => {
                const panel = this.panels.find(item => item.prop === field)
                panel.value = data[field]
            })
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <el-row :gutter="gutter">
        <el-col v-for="panel in panels" :key="panel.name" :xs="24" :sm="12" :lg="6">
            <el-card @click.native="onPanelClick(panel)">
                <div :class="['panel-icon', panel.name]">
                    <fa-icon :icon="['fas', panel.icon]" size="4x" />
                </div>
                <div class="panel-description">
                    <div class="panel-description--text">{{ panel.text }}</div>
                    <count-to
                        class="panel-description--num"
                        :start-val="0"
                        :end-val="panel.value"
                        :duration="2600"
                    />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: initial;
    font-size: 12px;
    cursor: pointer;
}

:deep(.el-card__body:hover) {
    .panel-icon {
        color: #ffffff;
    }
    .panel-icon.article {
        background-color: #f4516c;
    }
    .panel-icon.view {
        background-color: #34bfa3
    }
    .panel-icon.user {
        background-color: #40c9c6;
    }
    .panel-icon.message {
        background-color: #36a3f7;
    }
}

.panel-icon {
    padding: 16px;
    border-radius: 6px;
    transition: all 0.38s ease-out;
}

.panel-icon.article {
    color: #f4516c;
}

.panel-icon.view {
    color: #34bfa3;
}

.panel-icon.user {
    color: #40c9c6;
}

.panel-icon.message {
    color: #36a3f7;
}

.panel-description {
    font-weight: bold;
    color: #666666;
}

.panel-description--text {
    line-height: 18px;
    margin-bottom: 12px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
}

.panel-description--num {
    font-size: 20px;
}

@media (max-width:550px) {
    .panel-icon {
        width: 100%;
        height: 100%;
    }

    .panel-description {
        display: none;
    }
}
</style>
